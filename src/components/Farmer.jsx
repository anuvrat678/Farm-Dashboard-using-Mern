import styled from "styled-components";

const FarmerCard = styled.article`
  background: #e8f5e9;
  border-left: 6px solid #2e7d32;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

const FarmerName = styled.h3`
  color: #1b5e20;
  margin: 0 0 12px;
  font-size: 22px;
`;

const FarmerInfo = styled.p`
  color: #374151;
  margin: 7px 0;
`;

function Farmer({ name, location, crop, land }) {
  return (
    <FarmerCard>
      <FarmerName>{name}</FarmerName>

      <FarmerInfo>
        <strong>Location:</strong> {location}
      </FarmerInfo>

      <FarmerInfo>
        <strong>Crop:</strong> {crop}
      </FarmerInfo>

      <FarmerInfo>
        <strong>Land:</strong> {land}
      </FarmerInfo>
    </FarmerCard>
  );
}

export default Farmer;