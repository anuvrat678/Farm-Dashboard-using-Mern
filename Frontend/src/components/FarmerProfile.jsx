import { useState } from "react";
import { useFarmer } from "../context/FarmerContext.jsx";
import { z } from "zod";

const farmerSchema = z.object({
  name: z.string().nonempty("Name is required"),
  age: z.number(),
  location: z.string().optional(),
});

export default function FarmerProfile() {
  const { farmers, updateFarmer } = useFarmer();

  return (
    <div>
      <h2>Farmer Profiles</h2>

      {farmers.map((item, index) => (
        <FarmerCard
          key={index}
          farmer={item}
          index={index}
          updateFarmer={updateFarmer}
        />
      ))}
    </div>
  );
}

function FarmerCard({ farmer, index, updateFarmer }) {
  const [name, setName] = useState(farmer.name ?? "");
  const [age, setAge] = useState(farmer.age ?? "");
  const [location, setLocation] = useState(farmer.location ?? "");
  const [errors, setErrors] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();

    const result = farmerSchema.safeParse({
      name,
      age: age === "" ? undefined : Number(age),
      location,
    });

    if (!result.success) {
      setErrors(result.error.issues.map((issue) => issue.message));
      return;
    }

    setErrors([]);

    updateFarmer(index, {
      name: result.data.name,
      age: result.data.age,
      location: result.data.location,
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>{farmer.name || "Farmer name is empty"}</h3>

        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <br />

        <label>Age:</label>
        <input
          type="number"
          value={age}
          onChange={(event) => setAge(event.target.value)}
        />

        <br />

        <label>Location:</label>
        <input
          type="text"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        />

        <br />

        <button type="submit">Update Farmer</button>

        {errors.map((error, i) => (
          <p key={i}>{error}</p>
        ))}
      </form>

      <hr />
    </div>
  );
}