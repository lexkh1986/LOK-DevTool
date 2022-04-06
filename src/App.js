import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/main/Main';
import Login from './views/Login';
import Lands from './views/Lands';
import Members from './views/Members';
import Report from './views/Report';

const App = () => {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route exact path="/LOK-DevTool/login" element={<Login />}></Route>
          <Route path='/LOK-DevTool' element={<Main />}>
            <Route path='/LOK-DevTool/lands' element={<Lands/>} />
            <Route path='/LOK-DevTool/members' element={<Members />} />
            <Route path='/LOK-DevTool/report' element={<Report />} />
          </Route>
        </Routes>
      </Router>
    </div >
  );
}

export default App;