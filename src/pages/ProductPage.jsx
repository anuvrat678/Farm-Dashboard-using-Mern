import { products } from "../data.js";
import FarmProduct from "../components/FarmProduct.jsx";

import PageLayout from "../components/styled/PageLayout.jsx";
import PageHeader from "../components/styled/PageHeader.jsx";
import { SectionTitle } from "../components/styled/SectionTitle.jsx";
import EmptyMessage from "../components/styled/EmptyMessage.jsx";

import {
  DataTable,
  TableWrapper,
} from "../components/styled/DataTable.jsx";

const ProductPage = () => {
  return (
    <PageLayout>

      <PageHeader>
        <h1>Farm Products</h1>
        <p>View agricultural products and their details.</p>
      </PageHeader>

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