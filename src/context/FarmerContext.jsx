import { createContext, useContext, useState } from "react";

import {
  farmer as initialFarmers,
  products as initialProducts,
} from "../data.js";

const FarmerContext = createContext(null);

export function FarmerProvider({ children }) {
  const [farmers, setFarmers] = useState(() =>
    initialFarmers.map((item) => ({ ...item }))
  );

  const [products, setProducts] = useState(() =>
    initialProducts.map((item) => ({ ...item }))
  );

  function updateFarmer(index, updatedFarmer) {
    setFarmers((previousFarmers) =>
      previousFarmers.map((item, i) =>
        i === index ? { ...item, ...updatedFarmer } : item
      )
    );
  }

  function addProduct(product) {
    setProducts((previousProducts) => [
      ...previousProducts,
      product,
    ]);
  }

  function removeProduct(index) {
    setProducts((previousProducts) =>
      previousProducts.filter((_, i) => i !== index)
    );
  }

  return (
    <FarmerContext.Provider
      value={{
        farmers,
        products,
        updateFarmer,
        addProduct,
        removeProduct,
      }}
    >
      {children}
    </FarmerContext.Provider>
  );
}

export function useFarmer() {
  const context = useContext(FarmerContext);

  if (!context) {
    throw new Error(
      "useFarmer must be used inside FarmerProvider"
    );
  }

  return context;
}