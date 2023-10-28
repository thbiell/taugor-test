import React from 'react';
import { BrowserRouter, Route, Routes, Outlet, Navigate } from "react-router-dom";
// import Root from '@/pages/root';
import Login from '@/pages/auth/login';
import Register from '@/pages/auth/register';
import ErrorPage from '@/pages/errorPage';
import ForgotPassword from '@/pages/auth/forgotPassword';
import Employees from '@/pages/employee/listEmployees';

import { isAuthenticated } from '@/config/auth';
import CreateEmployee from '@/pages/employee/create';
import UpdateEmployee from '@/pages/employee/update';
import ListInactives from '@/pages/employee/listEmployessInactivated';
import Historic from '@/pages/employee/historicEmployee';

const PrivateRoute = () => (
  isAuthenticated() ? <Outlet /> : <Navigate to="/login" />
);

const Routes1 = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path='/' element={<PrivateRoute />}>
        <Route exact path='/' element={<Employees />} />
      </Route>
      <Route path='/employees' element={<PrivateRoute />}>
        <Route exact path='/employees' element={<Employees />} />
      </Route>
      <Route path='/employees-inactivated' element={<PrivateRoute />}>
        <Route exact path='/employees-inactivated' element={<ListInactives />} />
      </Route>
      <Route path='/employees/create' element={<PrivateRoute />}>
        <Route exact path='/employees/create' element={<CreateEmployee />} />
      </Route>
      <Route path='/employees/edit/:id' element={<PrivateRoute />}>
        <Route exact path='/employees/edit/:id' element={<UpdateEmployee />} />
      </Route>
      <Route path='/employees-inactivated/historic/:id' element={<PrivateRoute />}>
        <Route exact path='/employees-inactivated/historic/:id' element={<Historic />} />
      </Route>

<Route path='/employees/historic/:id' element={<PrivateRoute />}>
        <Route exact path='/employees/historic/:id' element={<Historic />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  </BrowserRouter>
);

export default Routes1;