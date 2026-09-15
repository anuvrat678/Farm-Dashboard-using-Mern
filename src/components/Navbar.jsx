
import { Link } from "react-router";
import styled from "styled-components";

const NavbarContainer = styled.nav`
  width: 100%;
  padding: 18px 40px;
  background: #1b4332;
  color: white;

  display: flex;
  justify-content: space-between;
  align-items: center;

  box-sizing: border-box;
`;

const Logo = styled(Link)`
  font-size: 24px;
  font-weight: bold;
  color: white;
  text-decoration: none;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 25px;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;

  &:hover {
    color: #b7e4c7;
  }
`;

const Enrollment = styled.span`
  font-size: 12px;
  color: #d8f3dc;
`;

function Navbar() {
  return (
    <NavbarContainer>
      <Logo to="/">
        🌾 Farm Dashboard
      </Logo>

      <NavLinks>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/farmer">Farmers</NavLink>
        <NavLink to="/product">Products</NavLink>
      </NavLinks>

      <Enrollment>
        Enrollment No: 202604104610024
      </Enrollment>
    </NavbarContainer>
  );
}

export default Navbar;