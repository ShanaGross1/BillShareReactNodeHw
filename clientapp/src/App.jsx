import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListBills from './pages/ListBills';
import ListParticipants from './pages/ListParticipants';
import AddBill from './pages/AddBill';
import AddParticipants from './pages/AddParticipants';
import Home from './pages/Home';
import Layout from './components/Layout';
import BillDetails from './pages/BillDetails';

const App = () => {

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/addbill' element={<AddBill />} />
          <Route path='/listparticipants' element={<ListParticipants />} />
          <Route path='/addparticipant' element={<AddParticipants />} />
          <Route path='/listbills' element={<ListBills />} />
          <Route path='/billdetails/:id' element={<BillDetails/>}/>
        </Routes>
      </Layout>
    </Router>
  );


};

export default App;