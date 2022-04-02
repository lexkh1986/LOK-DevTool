import React from 'react';
import { Container } from "reactstrap";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';

import Dashboard from './views/Dashboard';
import Lands from './views/Lands';
import Members from './views/Members';

const App = () => {
  return (
    <div className='App'>
      <Header />
      <Container>
        <Router>
          <Routes>
            <Route path='/' element={<Sidebar />}>
              <Route path='/' element={<Dashboard />} />
              <Route path='/lands' element={<Lands />} />
              <Route path='/members' element={<Members />} />
            </Route>
          </Routes>
        </Router>
      </Container>
    </div>
  );
}

export default App;