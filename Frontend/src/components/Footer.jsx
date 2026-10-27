import styled from "styled-components";

const Foot = styled.footer`
  width: 100%;

  padding: 28px 5%;

  background:
    linear-gradient(
      135deg,
      #394a41,
      #46584e
    );

  color: #e3e9e5;

  border-top: 1px solid rgba(255, 255, 255, 0.08);

  box-shadow:
    0 -8px 25px rgba(37, 52, 44, 0.06);

  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 25px;

  box-sizing: border-box;

  @media (max-width: 600px) {
    flex-direction: column;
    text-align: center;

    padding: 25px 4%;
  }
`;

const FooterBrand = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Brand = styled.div`
  color: #f0f4f1;

  font-size: 14px;
  font-weight: 700;

  letter-spacing: -0.2px;
`;

const Copyright = styled.p`
  margin: 0;

  color: #b9c6be;

  font-size: 12px;
`;

const Enrollment = styled.div`
  padding: 9px 14px;

  border: 1px solid rgba(214, 226, 218, 0.2);
  border-radius: 8px;

  background: rgba(255, 255, 255, 0.07);

  color: #d5e0d9;

  font-size: 11px;
  font-weight: 600;

  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
`;

const Footer = () => {
  return (
    <Foot>

      <FooterBrand>

        <Brand>
          Farm Management System
        </Brand>

        <Copyright>
          Agricultural records management dashboard
        </Copyright>

      </FooterBrand>

      <Enrollment>
        Enrollment No. 202604104610024
      </Enrollment>

    </Foot>
  );
};

export default Footer;