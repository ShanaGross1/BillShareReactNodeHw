import { useState, useEffect } from "react";
import axios from "axios";

const ListParticipants = () => {

    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        const loadParticipants = async () => {
            const { data } = await axios.get('/api/participants/getall')
            setParticipants(data);
        }

        loadParticipants();
    }, [])

    return (
        <div className="container" style={{ marginTop: 80 }}>
            <div className="container mt-5">
                <h2>Participants List</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {participants.map(p => (
                            <tr key={p.id}>
                                <td>{p.id}</td>
                                <td>{p.name}</td>
                                <td>{p.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListParticipants;
