import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const AddBill = () => {

    const [participants, setParticipants] = useState([]);
    const [total, setTotal] = useState(0);
    const [selectedParticipants, setSelectedParticipants] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const loadParticipants = async () => {
            const { data } = await axios.get('/api/participants/getall')
            setParticipants(data);
        }
        loadParticipants();
    }, [])

    const onCheckBoxClick = participantId => {
        if (selectedParticipants.includes(participantId)) {
            setSelectedParticipants([...selectedParticipants.filter(p => p !== participantId)])
        } else {
            setSelectedParticipants([...selectedParticipants, participantId])
        }
    }

    const onSubmitClick = async () => {
        await axios.post('/api/bills/add', { amount: total, participants: selectedParticipants })
        navigate('/listbills')
    }

    return (
        <div className="card shadow p-4" style={{ width: 400 }}>
            <h2 className="card-title text-center mb-4">Add Bill</h2>
            <div className="mb-3">
                <label className="form-label" >Total Amount</label>
                <input type="number" className="form-control" placeholder="Enter total bill amount" value={total} onChange={e => setTotal(e.target.value)} />
            </div>
            <div className="mb-3">
                <label className="form-label">Select Participants</label>
                <div className="form-check">

                    {participants.map(p => (
                        <div key={p.id}>
                            <input className="form-check-input" type="checkbox" value={p.id} onChange={() => onCheckBoxClick(p.id)} />
                            <label className="form-check-label">{p.name}</label>
                        </div>))}
                </div>

                {!!selectedParticipants.length && <h3 className="text-center ">Split Amounts</h3>}

                {selectedParticipants.map((id, idx) => (
                    <div key={idx} >
                        <ul className="list-group">
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <span>{participants.find(p => p.id === id).name} </span>
                                <span>${(total / selectedParticipants.length)}</span>
                            </li>
                        </ul>
                    </div>))}
            </div>
            <button className="btn btn-primary w-100 mt-4" onClick={onSubmitClick}>Submit</button>
        </div>
    )
}

export default AddBill;


