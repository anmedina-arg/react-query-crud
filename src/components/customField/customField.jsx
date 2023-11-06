import { Field, ErrorMessage } from "formik";

export const CustomFieldInput = ({valueForInput, type, errors}) => {

  const disabledOnBlur = () => { }
  
  return (
    <>
      <div>
        <label htmlFor={valueForInput}>{valueForInput}</label>
        <Field
          type={type}
          name={valueForInput}
          id={valueForInput}
          autoComplete="off"
          onBlur={disabledOnBlur}
          // innerRef={nameInputRef}
        />
      </div>
      <ErrorMessage name={valueForInput} component={() => (<span style={{color:"red"}}>{errors[valueForInput]}</span>)}/>
    </>
  )
}
