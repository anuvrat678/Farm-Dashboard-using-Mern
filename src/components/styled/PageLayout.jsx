import styled from "styled-components";

const PageLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding: 30px;

  @media (max-width: 700px) {
    padding: 20px;
  }
`;

export default PageLayout;