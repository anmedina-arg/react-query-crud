// Asi quedaria el mismo componente anterior pero con implementando los componentes de Formik, notese que resulta en menos lineas de codigo!

import style from "./product_form.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../../api/productsAPI";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRef } from "react";

const initialValues = {
  name: '',
  description: '',
  price: ''
}

function ProductForm() {

  const nameInputRef = useRef(null)

  const query = useQueryClient();

  const addProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      query.invalidateQueries("products");
      nameInputRef.current.focus()
    },
  });

  const disabledOnBlur = () => { }
  
  const handleValidate = (input) => {
    const errors = {}
      if (!input.name) {
        errors.name = 'Required'
      }
      if (!input.description) {
        errors.description = 'Description required'
      }
      if (!input.price) {
        errors.price = 'Price required'
      }
      return errors
  }

  const handleSubmit = (values, resetForm) => {
    const productToAdd = values;
    addProductMutation.mutate({
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
      {({errors, isSubmitting }) => (
        <>
          <Form className={style.form_container}>
            <div className={style.label_container}>
              <div>
                <label htmlFor="name">Name:</label>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="off"
                  onBlur={disabledOnBlur}
                  innerRef={nameInputRef}
                />
              </div>
              <ErrorMessage name="name" component={() => (<span style={{color:"red"}}>{errors.name}</span>)}/>
            </div>
            <div className={style.label_container}>
              <div>
                <label htmlFor="description">Description:</label>
                <Field
                  className={style.description}
                  type="text"
                  name="description"
                  id="description"
                  autoComplete="off"
                  onBlur={disabledOnBlur}
                />
              </div>
              <ErrorMessage name="description" component={() => (<span style={{color:"red"}}>{errors.description}</span>)}/>
            </div>
            <div className={style.label_container}>
              <div>
                <label htmlFor="price">Price:</label>
                <Field
                  type="text"
                  name="price"
                  id="price"
                  autoComplete="off"
                  onBlur={disabledOnBlur}
                />
              </div>
              <ErrorMessage name="price" component={() => (<span style={{color:"red"}}>{errors.price}</span>)}/>
            </div>
            <button type="submit" disabled={isSubmitting}>Add product</button>
          </Form>
        </>)
      }
    </Formik>
  );
}

export default ProductForm;
