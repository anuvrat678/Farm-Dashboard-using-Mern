import { useState } from "react";

import { useFarmer } from "../context/FarmerContext.jsx";

import FarmProduct from "../components/FarmProduct.jsx";

import PageLayout from "../components/styled/PageLayout.jsx";
import PageHeader from "../components/styled/PageHeader.jsx";
import { SectionTitle } from "../components/styled/SectionTitle.jsx";
import EmptyMessage from "../components/styled/EmptyMessage.jsx";

import {
  DataTable,
  TableWrapper,
} from "../components/styled/DataTable.jsx";

import {
  ActionButton,
  FieldLabel,
  FormGrid,
  FormInput,
  FormPanel,
  FormSelect,
} from "../components/styled/ContextControls.jsx";

const ProductPage = () => {
  const { products, addProduct } = useFarmer();

  const [name, setName] = useState("");
  const [type, setType] = useState("vegetable");
  const [quantity, setQuantity] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    addProduct({
      name,
      type,
      quantity: quantity === "" ? "" : Number(quantity),
    });

    setName("");
    setType("vegetable");
    setQuantity("");
  }

  return (
    <PageLayout>
      <PageHeader>
        <h1>Farm Products</h1>
        <p>View agricultural products and their details.</p>
      </PageHeader>

      <SectionTitle>
        Add Product
      </SectionTitle>

      <FormPanel onSubmit={handleSubmit}>
        <FormGrid>
          <FieldLabel>
            Product Name
            <FormInput
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              placeholder="Enter product name"
            />
          </FieldLabel>

          <FieldLabel>
            Type
            <FormSelect
              value={type}
              onChange={(event) =>
                setType(event.target.value)
              }
            >
              <option value="grain">Grain</option>
              <option value="vegetable">Vegetable</option>
              <option value="fruit">Fruit</option>
            </FormSelect>
          </FieldLabel>

          <FieldLabel>
            Quantity
            <FormInput
              type="number"
              step="any"
              value={quantity}
              onChange={(event) =>
                setQuantity(event.target.value)
              }
              placeholder="Enter quantity"
            />
          </FieldLabel>

          <ActionButton type="submit">
            Add Product
          </ActionButton>
        </FormGrid>
      </FormPanel>

      <SectionTitle>
        Available Products
      </SectionTitle>

      {products.length === 0 ? (
        <EmptyMessage>
          No products available.
        </EmptyMessage>
      ) : (
        <TableWrapper>
          <DataTable>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Type</th>
                <th>Quantity</th>
              </tr>
            </thead>

            <tbody>
              {products.map((item, index) => (
                <FarmProduct
                  key={index}
                  {...item}
                />
              ))}
            </tbody>
          </DataTable>
        </TableWrapper>
      )}
    </PageLayout>
  );
};

export default ProductPage;