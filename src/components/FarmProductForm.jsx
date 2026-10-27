import { useState } from "react";
import { z } from "zod";
import { useFarmer } from "../context/FarmerContext.jsx";

const productSchema = z.object({
  name: z.string().trim().min(1, "Product name is required"),
  type: z.enum(["grain", "vegetable", "fruit"]),
  quantity: z.number().positive("Quantity must be greater than zero"),
});

export default function FarmProductForm() {
  const { addProduct } = useFarmer();

  const [name, setName] = useState("");
  const [type, setType] = useState("vegetable");
  const [quantity, setQuantity] = useState("");
  const [errors, setErrors] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();

    const result = productSchema.safeParse({
      name,
      type,
      quantity: Number(quantity),
    });

    if (!result.success) {
      setErrors(result.error.issues.map((issue) => issue.message));
      return;
    }

    addProduct(result.data);

    setName("");
    setType("vegetable");
    setQuantity("");
    setErrors([]);
  }

  return (
    <div>
      <h2>Add Product</h2>

      <form onSubmit={handleSubmit}>
        <label>Product Name:</label>
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <br />

        <label>Type:</label>
        <select
          value={type}
          onChange={(event) => setType(event.target.value)}
        >
          <option value="grain">Grain</option>
          <option value="vegetable">Vegetable</option>
          <option value="fruit">Fruit</option>
        </select>

        <br />

        <label>Quantity:</label>
        <input
          type="number"
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
        />

        <br />

        <button type="submit">Add Product</button>
      </form>

      {errors.map((error, index) => (
        <p key={index}>{error}</p>
      ))}
    </div>
  );
}