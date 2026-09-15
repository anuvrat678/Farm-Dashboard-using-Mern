import styled from "styled-components";

const ProductCard = styled.article`
  background: ${(props) => {
    if (props.$type === "vegetable") return "#d8f3dc";
    if (props.$type === "fruit") return "#ffe0e0";
    if (props.$type === "grain") return "#fff3b0";

    return "#f3f4f6";
  }};

  border-left: 6px solid ${(props) => {
    if (props.$type === "vegetable") return "#2d6a4f";
    if (props.$type === "fruit") return "#d00000";
    if (props.$type === "grain") return "#d4a017";

    return "#6b7280";
  }};

  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

const ProductName = styled.h3`
  color: #1b4332;
  margin: 0 0 12px;
  font-size: 22px;
`;

const ProductInfo = styled.p`
  color: #374151;
  margin: 7px 0;
`;

function FarmProduct({ name, type, quantity, price }) {
  return (
    <ProductCard $type={type}>
      <ProductName>{name}</ProductName>

      <ProductInfo>
        <strong>Type:</strong> {type}
      </ProductInfo>

      <ProductInfo>
        <strong>Quantity:</strong> {quantity}
      </ProductInfo>

      <ProductInfo>
        <strong>Price:</strong> ₹{price}
      </ProductInfo>
    </ProductCard>
  );
}

export default FarmProduct;