import { useState } from "react";
import { z } from "zod";

import { useFarmer } from "../context/FarmerContext.jsx";
import PageLayout from "../components/styled/PageLayout.jsx";
import PageHeader from "../components/styled/PageHeader.jsx";
import { SectionTitle } from "../components/styled/SectionTitle.jsx";
import EmptyMessage from "../components/styled/EmptyMessage.jsx";
import {
  DataTable,
  TableWrapper,
  TableRow,
  TableCell,
} from "../components/styled/DataTable.jsx";
import {
  FieldLabel,
  FormGrid,
  FormInput,
  FormPanel,
  SubmitButton,
  FormMessage,
} from "../components/styled/ApiForms.jsx";

const farmerSchema = z.object({
  name: z.string().trim().min(1, "Farmer name is required."),
  phone: z
    .string()
    .trim()
    .regex(/^\+?\d{7,15}$/, "Enter a valid phone number."),
  email: z.string().trim().email("Enter a valid email address."),
  farmLocation: z.string().trim().min(1, "Farm location is required."),
});

const initialForm = {
  name: "",
  phone: "",
  email: "",
  farmLocation: "",
};

export default function FarmerPage() {
  const { farmers, loading, loadError, addFarmer } = useFarmer();
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    const result = farmerSchema.safeParse(formData);
    if (!result.success) {
      setErrors(result.error.issues.map((issue) => issue.message));
      return;
    }

    setErrors([]);
    setSaving(true);

    try {
      const { name, phone, email, farmLocation } = result.data;
      await addFarmer({
        name,
        contact: { phone, email },
        farmLocation,
      });
      setFormData(initialForm);
      setMessage("Farmer added successfully.");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <PageLayout>
      <PageHeader>
        <h1>Farmers Details</h1>
        <p>Register farmers and view their information from the API.</p>
      </PageHeader>

      <SectionTitle>Farmer Entry</SectionTitle>

      <FormPanel onSubmit={handleSubmit}>
        <FormGrid>
          <FieldLabel>
            Farmer Name
            <FormInput
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter farmer name"
            />
          </FieldLabel>

          <FieldLabel>
            Phone Number
            <FormInput
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="9876543210"
            />
          </FieldLabel>

          <FieldLabel>
            Email
            <FormInput
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="farmer@example.com"
            />
          </FieldLabel>

          <FieldLabel>
            Farm Location
            <FormInput
              name="farmLocation"
              value={formData.farmLocation}
              onChange={handleChange}
              placeholder="City, State"
            />
          </FieldLabel>

          <SubmitButton type="submit" disabled={saving}>
            {saving ? "Saving..." : "Add Farmer"}
          </SubmitButton>
        </FormGrid>

        {errors.map((error, index) => (
          <FormMessage key={index}>{error}</FormMessage>
        ))}
        {message && <FormMessage $tone="success">{message}</FormMessage>}
      </FormPanel>

      <SectionTitle>Registered Farmers</SectionTitle>

      {loadError && <FormMessage>{loadError}</FormMessage>}
      {loading ? (
        <EmptyMessage>Loading farmers...</EmptyMessage>
      ) : farmers.length === 0 ? (
        <EmptyMessage>No farmers available.</EmptyMessage>
      ) : (
        <TableWrapper>
          <DataTable>
            <thead>
              <tr>
                <th>Farmer ID</th>
                <th>Farmer Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Farm Location</th>
                <th>Crop Count</th>
              </tr>
            </thead>
            <tbody>
              {farmers.map((farmer) => (
                <TableRow key={farmer.farmerId}>
                  <TableCell>{farmer.farmerId}</TableCell>
                  <TableCell>{farmer.name}</TableCell>
                  <TableCell>{farmer.contact?.phone || "N/A"}</TableCell>
                  <TableCell>{farmer.contact?.email || "N/A"}</TableCell>
                  <TableCell>{farmer.farmLocation || "N/A"}</TableCell>
                  <TableCell>{farmer.producedCrops?.length ?? 0}</TableCell>
                </TableRow>
              ))}
            </tbody>
          </DataTable>
        </TableWrapper>
      )}
    </PageLayout>
  );
}
