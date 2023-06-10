/* eslint-disable react/prop-types */
function ItemProduct({ product }) {
  const { id, name, price, description, inStock } = product;
  return (
    <li>
      <div>
        <h3>{name}</h3>
        <span>{price}</span>
      </div>
      <p>{description}</p>
      <div>
        <input
          id={`in-stock${id}`}
          type="checkbox"
          value={inStock}
          onChange={() => console.log(id)}
        />
        <label htmlFor={`in-stock${id}`}>in stock</label>
      </div>
    </li>
  );
}

export default ItemProduct;
