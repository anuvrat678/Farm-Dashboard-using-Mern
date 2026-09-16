import styled from "styled-components";

export const StatCard = styled.div`
  padding: 24px;

  border: 1px solid #cbd3cd;
  border-radius: 15px;

  background: rgba(245, 247, 245, 0.68);

  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  box-shadow:
    0 7px 22px rgba(37, 52, 44, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.7);

  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);

    border-color: #aabbb0;

    box-shadow:
      0 12px 28px rgba(37, 52, 44, 0.08),
      inset 0 1px 0 rgba(255, 255, 255, 0.8);
  }
`;

export const StatTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StatIcon = styled.div`
  width: 40px;
  height: 40px;

  border-radius: 10px;

  background: #dce5df;
  color: #50685b;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 11px;
  font-weight: 800;
`;

export const StatLabel = styled.p`
  margin: 18px 0 5px;

  color: #727d77;

  font-size: 13px;
  font-weight: 550;
`;

export const StatValue = styled.h3`
  margin: 0;

  color: #293a31;

  font-size: 34px;
  font-weight: 750;

  letter-spacing: -1px;
`;