import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Main from './components/main/Main';
import Login from './views/Login';
import Lands from './views/Lands';
import Members from './views/Members';
import Report from './views/Report';
  
const App = () => {
  return (
    <div className='App'>
      <HashRouter>
        <Routes>
          <Route exact path="/LOK-DevTool" element={<Login />} />
          <Route path='/LOK-DevTool/dashboard' element={<Main />}>
            <Route path='/LOK-DevTool/dashboard/lands' element={<Lands />} />
            <Route path='/LOK-DevTool/dashboard/members' element={<Members />} />
            <Route path='/LOK-DevTool/dashboard/report' element={<Report />} />
          </Route>
          <Route
            path="*"
            element={<Navigate to="/LOK-DevTool" replace />}
          />
        </Routes>
      </HashRouter>
    </div >
  );
}

export default App;