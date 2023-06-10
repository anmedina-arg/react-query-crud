/* eslint-disable react/prop-types */
import style from "./item_product.module.css";

function ItemProduct({
  product,
  deleteProductMutation,
  updateProductMutation,
}) {
  const { id, name, price, description, inStock } = product;

  const handleDelete = (id) => {
    deleteProductMutation.mutate(id);
  };

  const handleChecked = (e) => {
    updateProductMutation.mutate({
      ...product,
      inStock: e.target.checked,
    });
  };

  return (
    <li className={style.card_container}>
      <div className={style.card_header}>
        <h3>{name}</h3>
        <h3>${price}</h3>
      </div>
      <p className={style.description}>{description}</p>
      <div className={style.card_footer}>
        <div className={style.checked_container}>
          <input
            id={`in-stock${id}`}
            type="checkbox"
            checked={inStock}
            onChange={handleChecked}
          />
          <label htmlFor={`in-stock${id}`}>in stock</label>
        </div>
        <button className={style.button} onClick={() => handleDelete(id)}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default ItemProduct;
