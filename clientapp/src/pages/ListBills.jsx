import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import dayjs from 'dayjs';

const ListBills = () => {

    const [bills, setbills] = useState([]);

    useEffect(() => {
        const getBills = async () => {
            const { data } = await axios.get('/api/bills/getall')
            setbills(data);
        }
        getBills();
    }, [])

    return (
        <div className="container" style={{ marginTop: 80 }}>
            <div className="container mt-5">
                <h2>Bills List</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Date</th>
                            <th scope="col">Total Amount</th>
                            <th scope="col">Participants</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bills.map(bill => (
                            <tr key={bill.id}>
                                <th scope="row">{bill.id}</th>
                                <td> {dayjs(bill.date).format('MM/DD/YYYY')}</td>
                                <td>${bill.amount}</td>
                                <td>{bill.participantCount}</td>
                                <td> <Link className="btn btn-primary btn-sm" to={`/billdetails/${bill.id}`}>View Details</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListBills;

