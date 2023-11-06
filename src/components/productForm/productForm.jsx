// Asi quedaria el mismo componente anterior pero con implementando los componentes de Formik, notese que resulta en menos lineas de codigo!

import React from "react";
import style from "./product_form.module.css";
import { Formik, Form } from 'formik';
import { useRef } from "react";
import {CustomFieldInput} from "../customField/customField";
import { handleValidate } from "./handleValidate";
import { useAddProduct } from "../../customHooks/useAndres";

const initialValues = {
  name: '',
  description: '',
  price: ''
}

function ProductForm({ camposDelFormulario }) {

  const addProduct = useAddProduct()

  const handleSubmit = (values, resetForm) => {
    const productToAdd = values;
    addProduct.mutate({
      ...productToAdd,
      inStock: true,
    })
    resetForm()
  }

  return (
    <Formik
      initialValues={initialValues}
      validate={values => handleValidate(values)}
      onSubmit={(values, {resetForm}) => handleSubmit(values, resetForm)}
    >
      {({ errors }) => (
        <>
          <Form className={style.form_container}>
            {camposDelFormulario.map((campo) => {
              const {name, type} = campo
              return (
                <div key={name} className={style.label_container}>
                  <CustomFieldInput valueForInput={name} type={type} errors={errors} />
                </div>
              )})}
            <button type="submit">Add product</button>
          </Form>
        </>)
      }
    </Formik>
  );
}

export default ProductForm;
