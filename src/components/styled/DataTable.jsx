import styled from "styled-components";

export const TableWrapper = styled.div`
  width: 100%;

  overflow-x: auto;

  border: 1px solid #cbd3cd;
  border-radius: 15px;

  background: rgba(246, 248, 246, 0.78);

  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  box-shadow:
    0 8px 25px rgba(37, 52, 44, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.7);
`;

export const DataTable = styled.table`
  width: 100%;
  min-width: 600px;

  border-collapse: separate;
  border-spacing: 0;

  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;

  th {
    padding: 15px 20px;

    background: #34483d;
    color: #f3f6f3;

    text-align: left;

    font-size: 12px;
    font-weight: 750;

    letter-spacing: 0.7px;
    text-transform: uppercase;

    border-bottom: 1px solid #27382f;
  }

  th:first-child {
    border-top-left-radius: 14px;
  }

  th:last-child {
    border-top-right-radius: 14px;
  }

  td {
    border-bottom: 1px solid #d9dfda;
  }

  tbody tr:last-child td {
    border-bottom: none;
  }
`;

export const TableRow = styled.tr`
  background: ${(props) => {
    if (props.$type === "vegetable") {
      return "#e4f0e7";
    }

    if (props.$type === "fruit") {
      return "#f3e5e5";
    }

    if (props.$type === "grain") {
      return "#f1ead5";
    }

    return "#f7f8f7";
  }};

  transition:
    background 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    background: ${(props) => {
      if (props.$type === "vegetable") {
        return "#d7e9dc";
      }

      if (props.$type === "fruit") {
        return "#eed9db";
      }

      if (props.$type === "grain") {
        return "#e9dfc2";
      }

      return "#edf1ee";
    }};
  }
`;

export const TableCell = styled.td`
  padding: 17px 20px;

  color: #39463f;

  font-size: 14px;
  font-weight: 500;

  &:first-child {
    color: #263b30;
    font-weight: 700;
  }
`;

export const TypeBadge = styled.span`
  display: inline-flex;

  align-items: center;
  justify-content: center;

  min-width: 82px;

  padding: 6px 12px;

  border-radius: 999px;

  font-size: 11px;
  font-weight: 800;

  text-transform: capitalize;

  background: ${(props) => {
    if (props.$type === "vegetable") {
      return "#b9d8c2";
    }

    if (props.$type === "fruit") {
      return "#e6c2c5";
    }

    if (props.$type === "grain") {
      return "#dfcf99";
    }

    return "#d9dedb";
  }};

  color: ${(props) => {
    if (props.$type === "vegetable") {
      return "#28583b";
    }

    if (props.$type === "fruit") {
      return "#79383e";
    }

    if (props.$type === "grain") {
      return "#66501c";
    }

    return "#46524c";
  }};

  border: 1px solid ${(props) => {
    if (props.$type === "vegetable") {
      return "#9fc6aa";
    }

    if (props.$type === "fruit") {
      return "#d6aeb2";
    }

    if (props.$type === "grain") {
      return "#ccb978";
    }

    return "#c5ccc7";
  }};
`;

export const Quantity = styled.span`
  color: #263b30;

  font-size: 15px;
  font-weight: 750;

  span {
    margin-left: 5px;

    color: #78827d;

    font-size: 12px;
    font-weight: 600;
  }
`;