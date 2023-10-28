import { isAuthenticated } from '@/config/auth';
import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

export default function Root() {
  return (
    isAuthenticated 
    ? (<><span>Hello</span> <Link to={"employees"}>Página inical</Link></>)
    :(
    <div>
      <Link to={"login"}>Faça login</Link>
      {'     '}
      <Link to={ "register" }>Cadastre-se</Link>
    </div>
    )
  );
}
