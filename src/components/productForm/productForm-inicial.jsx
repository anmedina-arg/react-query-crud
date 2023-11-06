// LA IMPLEMENTACION DE FORMIK EN ESTE FOMULARIO ES MUY VERBOSA, PERO SE TRATA DE ENTENDER QUE HACE EXACTAMENTE CADA PROP DE FORMIK, PARA EVITAR...
// ...SER TAN "VERBOSO" FORMIK PROVEE OTROS COMPONENTES COMO "FORM" Y "FIELDS" LO QUE PERMITE QUITAR PROPIEDADES Y LOGRAR UN CODIGO MAS LIMPIO, CON MENOS LINEAS

import style from "./product_form.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../../api/productsAPI";
import { Formik } from 'formik';
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

  return (
    <Formik
      initialValues={initialValues}
      validate={values => {
        const errors = {}
        if (!values.name) {
          errors.name = 'Required'
        }
        if (!values.description) {
          errors.description = 'Description required'
        }
        if (!values.price) {
          errors.price = 'Price required'
        }
        return errors
      }}
      onSubmit={(values, {resetForm}) => {
        const productToAdd = values;
        addProductMutation.mutate({
          ...productToAdd,
          inStock: true,
        })
        resetForm()
      }}
    >
      {({ values, touched, errors, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <>
          <form onSubmit={handleSubmit} className={style.form_container}>
            <div className={style.label_container}>
              <div style={{display: "flex"}}>
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="off"
                  value={values.name}
                  onChange={handleChange}
                  // onBlur={handleBlur}
                  ref={nameInputRef}
                />
              </div>
              {errors.name && touched.name && <span style={{color:"red"}}>{errors.name}</span>}
            </div>
            <div className={style.label_container}>
              <div>
                <label htmlFor="description">Description:</label>
                <input
                  className={style.description}
                  type="text"
                  name="description"
                  id="description"
                  autoComplete="off"
                  value={values.description}
                  onChange={handleChange}
                  // onBlur={handleBlur}
                />
              </div>
              {errors.description && touched.description && <span>{errors.description}</span>}
            </div>
            <div className={style.label_container}>
              <div>
                <label htmlFor="price">Price:</label>
                <input
                  type="text"
                  name="price"
                  id="price"
                  autoComplete="off"
                  value={values.price}
                  onChange={handleChange}
                  // onBlur={handleBlur}
                />
              </div>
              {errors.price && touched.price && <span>{errors.price}</span>}
            </div>
            <button type="submit" disabled={isSubmitting}>Add product</button>
          </form>
        </>)
      }
    </Formik>
  );
}

export default ProductForm;
