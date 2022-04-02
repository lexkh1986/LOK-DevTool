import React from 'react';
import { Container } from "reactstrap";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/header/Header';
import Main from './components/main/Main';

import Dashboard from './views/Dashboard';
import Lands from './views/Lands';
import Members from './views/Members';

const App = () => {
  return (
    <div className='App'>
      <Header />
      <div className='main'>
        <Container fluid={true}>
          <Router>
            <Routes>
              <Route path='/LOK-DevTool' element={<Main />}>
                <Route path='/LOK-DevTool' element={<Dashboard />} />
                <Route path='/LOK-DevTool/lands' element={<Lands />} />
                <Route path='/LOK-DevTool/members' element={<Members />} />
              </Route>
            </Routes>
          </Router>
        </Container>
      </div>
    </div>
  );
}

export default App;