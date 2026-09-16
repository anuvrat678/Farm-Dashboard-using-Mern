import { farmer } from "../data.js";
import Farmer from "../components/Farmer.jsx";

import PageLayout from "../components/styled/PageLayout.jsx";
import PageHeader from "../components/styled/PageHeader.jsx";
import { SectionTitle } from "../components/styled/SectionTitle.jsx";
import EmptyMessage from "../components/styled/EmptyMessage.jsx";

import {
  DataTable,
  TableWrapper,
} from "../components/styled/DataTable.jsx";

const FarmerPage = () => {
  return (
    <PageLayout>

      <PageHeader>
        <h1>Farmers Details</h1>
        <p>View all registered farmers and their information.</p>
      </PageHeader>

      <SectionTitle>
        Registered Farmers
      </SectionTitle>

      {farmer.length === 0 ? (
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
              </tr>
            </thead>

            <tbody>
              {farmer.map((item, index) => (
                <Farmer
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

export default FarmerPage;