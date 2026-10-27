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
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  align-items: end;
  gap: 16px;
`;

export const FieldLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 7px;
  color: #35483d;
  font-size: 0.9rem;
  font-weight: 600;
`;

const sharedFieldStyles = `
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

export const FormInput = styled.input`${sharedFieldStyles}`;
export const FormSelect = styled.select`${sharedFieldStyles}`;

export const SubmitButton = styled.button`
  padding: 10px 15px;
  color: #263d30;
  background: #dce8df;
  border: 1px solid #bdcfc2;
  border-radius: 9px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;

  &:hover {
    background: #cbdccf;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

export const FormMessage = styled.p`
  margin: 14px 0 0;
  color: ${({ $tone }) => ($tone === "success" ? "#356447" : "#8a4942")};
  font-size: 0.9rem;
  line-height: 1.5;
  overflow-wrap: anywhere;
`;
