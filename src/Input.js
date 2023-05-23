import { forwardRef } from "react";

const Input = forwardRef((props, ref) => {
  return(
    <div className='mb-3'>
    <label className='form-label' htmlFor={props.name}>{props.title}</label>
    <input
      type={props.type}
      name={props.className}
      id={props.name}
      ref={ref}
      className='form-control'
      autoComplete={props.autoComplete}
      onChange={props.onChange}
      >
    </input>
  </div>
  )
});

export default Input;