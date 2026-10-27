import { z } from "zod";

import {
  TableRow,
  TableCell,
  TypeBadge,
  Quantity,
} from "./styled/DataTable.jsx";

const schema = z.object({
  name: z.string().nonempty(),
  type: z.enum(["vegetable", "fruit", "grain"]),
  quantity: z.number().min(1).max(10),
});

const FarmProduct = ({ name, type, quantity }) => {

  const data = {
    name,
    type,
    quantity,
  };

  const result = schema.safeParse(data);

  if (!result.success) {
    console.error("Product validation failed:", data);
    console.error("Validation errors:", result.error.issues);

    return null;
  }

  return (
    <TableRow $type={type}>

      <TableCell>
        {name}
      </TableCell>

      <TableCell>
        <TypeBadge $type={type}>
          {type}
        </TypeBadge>
      </TableCell>

      <TableCell>
        <Quantity>
          {quantity}
          <span>kg</span>
        </Quantity>
      </TableCell>

    </TableRow>
  );
};

export default FarmProduct;