import styled from "styled-components";

const PageHeader = styled.header`
  padding: 26px 30px;

  border: 1px solid rgba(255, 255, 255, 0.65);
  border-radius: 16px;

  background: rgba(245, 248, 245, 0.58);

  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);

  box-shadow:
    0 8px 25px rgba(37, 52, 44, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.65);

  h1 {
    margin: 0;

    color: #26352d;

    font-size: 30px;
    font-weight: 750;
    letter-spacing: -0.8px;
  }

  p {
    margin: 8px 0 0;

    color: #69776f;

    font-size: 14px;
    line-height: 1.5;
  }

  @media (max-width: 600px) {
    padding: 22px;
  }
`;

export default PageHeader;