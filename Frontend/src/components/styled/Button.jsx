import styled from "styled-components";
import { Link } from "react-router";

export const PrimaryButton = styled(Link)`
  display: inline-flex;

  align-items: center;
  justify-content: center;

  padding: 12px 19px;

  border: 1px solid #61796c;
  border-radius: 9px;

  background: #61796c;
  color: #ffffff;

  text-decoration: none;

  font-size: 13px;
  font-weight: 700;

  transition: 0.2s ease;

  &:hover {
    background: #52685d;
    border-color: #52685d;

    transform: translateY(-1px);
  }
`;

export const SecondaryButton = styled(Link)`
  display: inline-flex;

  align-items: center;
  justify-content: center;

  padding: 12px 19px;

  border: 1px solid #b9c4bd;
  border-radius: 9px;

  background: rgba(255, 255, 255, 0.45);
  color: #46564e;

  text-decoration: none;

  font-size: 13px;
  font-weight: 650;

  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);

  transition: 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.75);

    border-color: #94a89c;
  }
`;