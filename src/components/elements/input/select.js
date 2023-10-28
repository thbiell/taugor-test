import React from "react";
import PropTypes from 'prop-types';

import "./style.css";

export default function SelectGeneral({id, title, items, classess, ...rest}) {
  return (
    <div className="container-general">
      <label htmlFor={id}>{title}</label>
      <select id={id} className={classess} {...rest}>
        {
          items.map(item => <option value={item.value} key={item.value}>{item.name}</option>)
        }
      
      
      </select>
    </div>
  );
}

SelectGeneral.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    classess: PropTypes.string.isRequired,
};