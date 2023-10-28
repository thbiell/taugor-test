import Button from '@/components/elements/button';
import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  // const error = useRouteError();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/')
  }

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Desculpe, ocorreu algum erro.</p>
      <p>
        <i> URL não encontrada...</i>
        <Button title="Ir para Home" typeButton={'input-button'} onClick={handleClick} />
        {/* <i>{error.statusText || error.message}</i> */}
      </p>
    </div>
  );
}