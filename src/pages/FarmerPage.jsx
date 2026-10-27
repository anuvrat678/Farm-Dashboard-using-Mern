import Farmer from "../components/Farmer.jsx";

import { useFarmer } from "../context/FarmerContext.jsx";

import PageLayout from "../components/styled/PageLayout.jsx";
import PageHeader from "../components/styled/PageHeader.jsx";
import { SectionTitle } from "../components/styled/SectionTitle.jsx";
import EmptyMessage from "../components/styled/EmptyMessage.jsx";

import {
  DataTable,
  TableWrapper,
} from "../components/styled/DataTable.jsx";

const FarmerPage = () => {
  const { farmers, updateFarmer } = useFarmer();

  return (
    <PageLayout>
      <PageHeader>
        <h1>Farmers Details</h1>
        <p>View all registered farmers and their information.</p>
      </PageHeader>

      <SectionTitle>
        Registered Farmers
      </SectionTitle>

      {farmers.length === 0 ? (
        <EmptyMessage>
          No farmers available.
        </EmptyMessage>
      ) : (
        <TableWrapper>
          <DataTable>
            <thead>
              <tr>
                <th>Farmer Name</th>
                <th>Age</th>
                <th>Farm Location</th>
                <th>Validation</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {farmers.map((item, index) => (
                <Farmer
                  key={index}
                  {...item}
                  onUpdate={(updatedFarmer) =>
                    updateFarmer(index, updatedFarmer)
                  }
                />
              ))}
            </tbody>
          </DataTable>
        </TableWrapper>
      )}
    </PageLayout>
  );
};

export default FarmerPage;