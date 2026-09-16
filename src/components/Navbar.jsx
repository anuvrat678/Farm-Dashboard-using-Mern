import { NavLink, Link } from "react-router";
import styled from "styled-components";

const NavbarContainer = styled.nav`
  width: 100%;
  height: 68px;

  padding: 0 5%;

  position: sticky;
  top: 0;
  z-index: 100;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background: rgba(232, 236, 233, 0.78);

  border-bottom: 1px solid rgba(150, 164, 155, 0.35);

  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);

  box-shadow: 0 4px 18px rgba(37, 52, 44, 0.04);

  box-sizing: border-box;

  @media (max-width: 650px) {
    padding: 0 4%;
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;

  color: #293a31;

  text-decoration: none;

  font-size: 17px;
  font-weight: 750;

  letter-spacing: -0.4px;

  white-space: nowrap;
`;

const LogoMark = styled.span`
  width: 32px;
  height: 32px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid #aebbb2;
  border-radius: 8px;

  background: rgba(255, 255, 255, 0.5);

  color: #52685b;

  font-size: 10px;
  font-weight: 800;

  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.8);
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  @media (max-width: 500px) {
    gap: 2px;
  }
`;

const NavLinkItem = styled(NavLink)`
  padding: 8px 13px;

  border-radius: 8px;

  color: #69766f;

  text-decoration: none;

  font-size: 13px;
  font-weight: 650;

  transition:
    color 0.2s ease,
    background 0.2s ease;

  &:hover {
    color: #35473d;
    background: rgba(255, 255, 255, 0.38);
  }

  &.active {
    color: #293a31;

    background: rgba(255, 255, 255, 0.68);

    box-shadow:
      0 2px 8px rgba(37, 52, 44, 0.06);
  }

  @media (max-width: 500px) {
    padding: 8px 8px;
    font-size: 12px;
  }
`;

const Enrollment = styled.span`
  color: #78847e;

  font-size: 11px;
  font-weight: 600;

  white-space: nowrap;

  @media (max-width: 900px) {
    display: none;
  }
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <Logo to="/">
        <LogoMark>FD</LogoMark>
        Farm Dashboard
      </Logo>

      <NavLinks>
        <NavLinkItem to="/">
          Home
        </NavLinkItem>

        <NavLinkItem to="/farmer">
          Farmers
        </NavLinkItem>

        <NavLinkItem to="/product">
          Products
        </NavLinkItem>
      </NavLinks>

      <Enrollment>
        Enrollment No. 202604104610024
      </Enrollment>
    </NavbarContainer>
  );
};

export default Navbar;