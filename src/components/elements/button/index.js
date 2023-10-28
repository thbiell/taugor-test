import React from "react";
import PropTypes from 'prop-types';
import "./style.css";

export default function Button({ title, typeButton, ...rest }) {
  return (
    <button className={typeButton} {...rest}>
      {title}
    </button>
  );
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  typeButton: PropTypes.string.isRequired,
};