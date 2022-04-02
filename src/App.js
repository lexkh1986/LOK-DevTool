import React from 'react';
import { Container } from "reactstrap";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/header/Header';
import Main from './components/main/Main';

import Dashboard from './views/Dashboard';
import Lands from './views/Lands';
import Members from './views/Members';
import Report from './views/Report';

const App = () => {
  return (
    <div className='App'>
      <Header />
      <Container fluid={true} role='main'>
        <Router>
          <Routes>
            <Route path='/LOK-DevTool' element={<Main />}>
              <Route path='/LOK-DevTool/dashboard' element={<Dashboard />} />
              <Route path='/LOK-DevTool/lands' element={<Lands />} />
              <Route path='/LOK-DevTool/members' element={<Members />} />
              <Route path='/LOK-DevTool/report' element={<Report />} />
            </Route>
          </Routes>
        </Router>
      </Container>
    </div>
  );
}

export default App;