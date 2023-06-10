import style from "./product_form.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../../api/productsAPI";
function ProductForm() {
  const query = useQueryClient();

  const addProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      query.invalidateQueries("products");
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const productToAdd = Object.fromEntries(new FormData(e.target));
    addProductMutation.mutate({
      ...productToAdd,
      inStock: true,
    });
    e.target.reset();
  };
  return (
    <form onSubmit={handleSubmit} className={style.form_container}>
      <div className={style.label_container}>
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" id="name" autoComplete="off" />
      </div>
      <div className={style.label_container}>
        <label htmlFor="description">Description:</label>
        <input
          className={style.description}
          type="text"
          name="description"
          id="description"
          autoComplete="off"
        />
      </div>
      <div className={style.label_container}>
        <label htmlFor="price">Price:</label>
        <input type="text" name="price" id="price" autoComplete="off" />
      </div>
      <button type="submit">Add product</button>
    </form>
  );
}

export default ProductForm;
