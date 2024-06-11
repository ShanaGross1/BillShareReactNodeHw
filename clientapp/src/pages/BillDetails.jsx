import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import dayjs from "dayjs";

const BillDetails = () => {

    const { id } = useParams();

    const [bill, setBill] = useState({});
    const [participants, setParticipants] = useState([]);

    useEffect(() => {

        const loadBill = async () => {
            const { data } = await axios.get(`/api/bills/getBillWithParticipants/${id}`);
            setBill({ total: data[0].total, date: data[0].date })
            setParticipants(data.map(d => ({ name: d.name, amount: d.amount })).filter(b => b.name))
        }

        loadBill();
    }, [])


    return (
        <div className="container" style={{ marginTop: 80 }}>
            <div className="container mt-5 d-flex justify-content-center">
                <div className="card shadow-lg" style={{ width: 500, maxWidth: 600 }}>
                    <div className="card-header bg-dark text-white">
                        <h2 className="card-title text-center mb-0">Bill Details</h2>
                    </div>
                    <div className="card-body">
                        <p><strong>Date:</strong> {dayjs(bill.date).format('MM/DD/YYYY')}</p>
                        <p><strong>Total Amount:</strong> ${bill.total}</p>

                        {!!participants.length && <>
                            <h3 className="mt-4">Participants</h3>
                            <ul className="list-group">
                                {participants.map((p, idx) => (
                                    <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                                        <span> {p.name}</span>
                                        <span className="badge bg-success rounded-pill">${p.amount.toFixed(2)}</span>
                                    </li>
                                ))}
                            </ul>
                        </>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BillDetails;
