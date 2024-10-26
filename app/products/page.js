import ProductsTable from "@/components/ProductsTable";
import * as React from "react";

const Products = async () => {
  const response = await fetch("http://localhost:5000/api/items", {
    cache: "no-store",
  });
  const data = await response.json();

  return (
    <>
      <ProductsTable data={data} />
    </>
  );
};

export default Products;
