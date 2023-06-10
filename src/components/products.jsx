import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/productsAPI";
import ItemProduct from "./itemProduct";
import ProductForm from "./productForm";

function Products() {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["productos"],
    queryFn: getProducts,
  });

  if (isLoading) {
    return <div>Is loading...</div>;
  } else if (isError) {
    return <div>{error.message}</div>;
  }
  return (
    <>
      <ProductForm />
      <ul>
        {data.map((product) => (
          <ItemProduct key={product.id} product={product} />
        ))}
      </ul>
    </>
  );
}

export default Products;
