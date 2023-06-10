import style from "./products.module.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getProducts,
  deleteProduct,
  updateProduct,
} from "../../api/productsAPI";
import ItemProduct from "../itemProduct/itemProduct";
import ProductForm from "../productForm/productForm";

function Products() {
  const queryClient = useQueryClient();

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["productos"],
    queryFn: getProducts,
    select: (products) => products.reverse(),
  });

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries("products");
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries("products");
    },
  });

  if (isLoading) {
    return <div>Is loading...</div>;
  } else if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <main>
      <ProductForm />
      <ul className={style.container}>
        {data.map((product) => (
          <ItemProduct
            key={product.id}
            product={product}
            deleteProductMutation={deleteProductMutation}
            updateProductMutation={updateProductMutation}
          />
        ))}
      </ul>
    </main>
  );
}

export default Products;
