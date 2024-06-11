
const Home = () => {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-10">
                    <div className="jumbotron bg-light p-5 shadow-lg rounded">
                        <h1 className="display-4 text-center">Welcome to BillShare!</h1>
                        <p className="lead text-center mt-3">Easily split bills with friends and keep track of expenses. Get started by
                            adding participants, creating bills, and viewing the details.</p>
                        <hr className="my-4" />
                        <div className="d-flex justify-content-center mt-4">
                            <a className="btn btn-primary mx-2" href="/addparticipant">Add Participant</a>
                            <a className="btn btn-secondary mx-2" href="/listparticipants">List Participants</a>
                            <a className="btn btn-success mx-2" href="/addbill">Add Bill</a>
                            <a className="btn btn-info mx-2" href="/listbills">List Bills</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;

