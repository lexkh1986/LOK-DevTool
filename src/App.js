import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Main from './layout/Main';
import Login from './views/Login';
import Lands from './views/Lands';
import Members from './views/Members';
import Report from './views/Report';

const App = () => {
  return (
    <div className='App'>
      <HashRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path='/dashboard' element={<Main />}>
            <Route path='/dashboard/lands' element={<Lands />} />
            <Route path='/dashboard/members' element={<Members />} />
            <Route path='/dashboard/report' element={<Report />} />
          </Route>
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
      </HashRouter>
    </div >
  ); 
}

export default App;