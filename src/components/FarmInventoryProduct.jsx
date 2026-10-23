import styled from "styled-components";

const Card = styled.article`
  min-width: 0;
  padding: 19px;
  border: 1px solid #dce5dd;
  border-radius: 15px;
  background: rgba(248, 250, 247, 0.92);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 22px rgba(35, 55, 42, 0.07);
  }
`;

const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 16px;
`;

const ProductName = styled.h3`
  margin: 0;
  color: #263b2d;
  font-size: 1.05rem;
  overflow-wrap: anywhere;
`;

const ProductId = styled.span`
  flex-shrink: 0;
  padding: 4px 8px;
  border-radius: 7px;
  background: #edf3ed;
  color: #45664b;
  font-size: 0.76rem;
`;

const Category = styled.p`
  margin: 5px 0 0;
  color: #718074;
  font-size: 0.82rem;
  text-transform: capitalize;
`;

const Details = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px 12px;
`;

const Detail = styled.div`
  min-width: 0;
`;

const DetailLabel = styled.p`
  margin: 0 0 4px;
  color: #7a887d;
  font-size: 0.75rem;
`;

const DetailValue = styled.p`
  margin: 0;
  color: #35493a;
  font-size: 0.88rem;
  font-weight: 600;
  overflow-wrap: anywhere;
  white-space: pre-wrap;
`;

const Certification = styled.span`
  display: inline-block;
  padding: 5px 8px;
  border-radius: 7px;
  background: ${({ $certified }) =>
    $certified ? "#e6f2e6" : "#f1efea"};
  color: ${({ $certified }) =>
    $certified ? "#3d7046" : "#786e5d"};
  font-size: 0.78rem;
  font-weight: 600;
`;

function formatLabel(key) {
  const labels = {
    farmerId: "Farmer ID",
    productName: "Product",
    pricePerUnit: "Price per unit",
    harvestDate: "Harvest date",
    storageConditions: "Storage",
    organicCertification: "Organic",
    pesticideUse: "Pesticide use",
  };

  return (
    labels[key] ||
    key.replace(/([A-Z])/g, " $1").replace(/^./, (letter) =>
      letter.toUpperCase()
    )
  );
}

function formatValue(value) {
  if (value === null || value === undefined || value === "") {
    return "—";
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  if (Array.isArray(value)) {
    return value.join(", ");
  }

  if (typeof value === "object") {
    return JSON.stringify(value);
  }

  return String(value);
}

function FarmInventoryProduct({ product, index }) {
  const {
    id,
    productName,
    category,
    quantity,
    unit,
    pricePerUnit,
    organicCertification,
    photos,
    ...otherDetails
  } = product;

  const details = [
    ["Farmer ID", otherDetails.farmerId],
    ["Quantity", `${formatValue(quantity)} ${unit || ""}`.trim()],
    ["Price per unit", `₹${formatValue(pricePerUnit)}`],
    ["Harvest date", otherDetails.harvestDate],
    ["Storage", otherDetails.storageConditions],
    ["Pesticide use", otherDetails.pesticideUse],
    ["Notes", otherDetails.notes],
  ];

  return (
    <Card>
      <CardTop>
        <div>
          <ProductName>{productName || "Unnamed product"}</ProductName>
          <Category>{category || "Uncategorized"}</Category>
        </div>

        <ProductId>#{id ?? index + 1}</ProductId>
      </CardTop>

      <Details>
        {details.map(([label, value]) => (
          <Detail key={label}>
            <DetailLabel>{label}</DetailLabel>
            <DetailValue>{formatValue(value)}</DetailValue>
          </Detail>
        ))}

        <Detail>
          <DetailLabel>{formatLabel("organicCertification")}</DetailLabel>
          <Certification $certified={Boolean(organicCertification)}>
            {organicCertification ? "Certified" : "Not certified"}
          </Certification>
        </Detail>
      </Details>
    </Card>
  );
}

export default FarmInventoryProduct;