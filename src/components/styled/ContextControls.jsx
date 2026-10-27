import styled from "styled-components";

export const FormPanel = styled.form`
  margin-bottom: 24px;
  padding: 20px;

  background: rgba(255, 255, 255, 0.58);
  border: 1px solid rgba(95, 117, 102, 0.2);
  border-radius: 16px;

  box-shadow: 0 8px 24px rgba(38, 53, 45, 0.05);
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: 16px;
  align-items: end;
`;

export const FieldLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 7px;

  color: #35483d;
  font-size: 0.9rem;
  font-weight: 600;
`;

export const FormInput = styled.input`
  width: 100%;
  min-width: 0;
  padding: 10px 12px;

  color: #26352d;
  background: rgba(255, 255, 255, 0.85);

  border: 1px solid #c5d0c8;
  border-radius: 9px;
  outline: none;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:focus {
    border-color: #799786;
    box-shadow: 0 0 0 3px rgba(121, 151, 134, 0.16);
  }
`;

export const FormSelect = styled.select`
  width: 100%;
  min-width: 0;
  padding: 10px 12px;

  color: #26352d;
  background: rgba(255, 255, 255, 0.85);

  border: 1px solid #c5d0c8;
  border-radius: 9px;
  outline: none;

  &:focus {
    border-color: #799786;
    box-shadow: 0 0 0 3px rgba(121, 151, 134, 0.16);
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
`;

export const ActionButton = styled.button`
  padding: 8px 13px;

  color: #263d30;
  background: #dce8df;

  border: 1px solid #bdcfc2;
  border-radius: 8px;

  font-size: 0.88rem;
  font-weight: 600;

  cursor: pointer;

  transition:
    background 0.2s ease,
    transform 0.2s ease;

  &:hover {
    background: #cbdccf;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

export const SecondaryButton = styled(ActionButton)`
  color: #35483d;
  background: #eef1ed;
  border-color: #d3dbd4;

  &:hover {
    background: #e2e8e2;
  }
`;

export const DangerButton = styled(ActionButton)`
  color: #80463f;
  background: #f5e7e4;
  border-color: #e6cbc6;

  &:hover {
    background: #eed9d5;
  }
`;

export const StatusText = styled.span`
  display: inline-block;
  max-width: 240px;
  padding: 5px 8px;

  color: ${({ $tone }) =>
    $tone === "success" ? "#356447" : "#8a4942"};

  background: ${({ $tone }) =>
    $tone === "success" ? "#e2eee5" : "#f7e8e5"};

  border-radius: 7px;

  font-size: 0.8rem;
  line-height: 1.5;

  white-space: normal;
  overflow-wrap: anywhere;
`;