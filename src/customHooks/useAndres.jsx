import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../api/productsAPI";

export const useAddProduct = () => {

  const query = useQueryClient();
  
  const addProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      query.invalidateQueries("products");
    },
  });

  return addProductMutation
}