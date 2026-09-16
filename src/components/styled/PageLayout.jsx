import styled from "styled-components";

const PageLayout = styled.div`
  width: 100%;
  max-width: 1200px;

  margin: 0 auto;

  padding: 38px 5% 60px;

  display: flex;
  flex-direction: column;

  gap: 38px;

  box-sizing: border-box;

  @media (max-width: 600px) {
    padding: 25px 4% 45px;
    gap: 30px;
  }
`;

export default PageLayout;