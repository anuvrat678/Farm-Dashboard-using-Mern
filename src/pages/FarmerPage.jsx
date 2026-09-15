import { farmer } from "../data.js";
import Farmer from "../components/Farmer.jsx";

import PageLayout from "../components/styled/PageLayout.jsx";
import PageHeader from "../components/styled/PageHeader.jsx";
import SectionTitle from "../components/styled/SectionTitle.jsx";
import EmptyMessage from "../components/styled/EmptyMessage.jsx";

function FarmerPage() {
  return (
    <PageLayout>
      <PageHeader>
        <h1>Farmers Details</h1>
        <p>View all registered farmers and their information.</p>
      </PageHeader>

      <SectionTitle>Registered Farmers</SectionTitle>

      {farmer.length === 0 ? (
        <EmptyMessage>No farmers available.</EmptyMessage>
      ) : (
        farmer.map((item, index) => (
          <Farmer key={item.id || index} {...item} />
        ))
      )}
    </PageLayout>
  );
}

export default FarmerPage;