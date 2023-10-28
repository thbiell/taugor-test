import React from "react";
import PropTypes from 'prop-types';

import "./style.css";

export default function InputGeneral({id, title, classess, ...rest}) {
  return (
    <div className="container-general">
      <label htmlFor={id}>{title}</label>
      <input id={id} className={classess} {...rest} />
    </div>
  );
}

InputGeneral.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    classess: PropTypes.string.isRequired,
};