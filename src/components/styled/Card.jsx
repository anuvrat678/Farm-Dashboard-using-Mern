import styled from "styled-components";

export const Card = styled.div`
  background: white;
  border: 1px solid #dce9e1;
  border-radius: 16px;
  padding: 24px;
  transition: 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    border-color: #95d5b2;
    box-shadow: 0 10px 25px rgba(27, 67, 50, 0.08);
  }
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;