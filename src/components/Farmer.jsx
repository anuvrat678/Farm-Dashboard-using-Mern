import { z } from "zod";

import {
  TableRow,
  TableCell,
} from "./styled/DataTable.jsx";

const schema = z.object({
  name: z.string().nonempty(),
  age: z.number(),
  location: z.string().optional(),
});

const Farmer = ({ name, age, location }) => {

  const data = {
    name,
    age,
    location,
  };

  const result = schema.safeParse(data);

  if (!result.success) {
    console.error("Farmer validation failed:", data);
    console.error("Validation errors:", result.error.issues);

    return null;
  }

  return (
    <TableRow>

      <TableCell>
        {name}
      </TableCell>

      <TableCell>
        {age}
      </TableCell>

      <TableCell>
        {location || "N/A"}
      </TableCell>

    </TableRow>
  );
};

export default Farmer;