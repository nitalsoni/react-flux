import React from "react";
import PropTypes from "prop-types";

const TextInput = (props) => {
  let wrapperClass = "form-group";
  if (props.error && props.error.lengh > 0) {
    wrapperClass += " has-error";
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={props.id}>{props.label}</label>
      <div className="field">
        <input
          type="text"
          id={props.id}
          name={props.name}
          onChange={props.onChange}
          className="form-control"
          value={props.value}
        ></input>
      </div>
      {props.error && <div className="alert alert-danger">{props.error}</div>}
    </div>
  );
};

export default TextInput;
