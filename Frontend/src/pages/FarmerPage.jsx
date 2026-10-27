import { useState } from "react";
import styled from "styled-components";
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
  TypeBadge,
  Quantity,
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
  email: z
    .string()
    .trim()
    .email("Enter a valid email address."),
  farmLocation: z
    .string()
    .trim()
    .min(1, "Farm location is required."),
});

const initialForm = {
  name: "",
  phone: "",
  email: "",
  farmLocation: "",
};

const categoryType = {
  Grains: "grain",
  Vegetables: "vegetable",
  Fruits: "fruit",
};

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
`;

const ActionButton = styled.button`
  padding: 7px 10px;

  color: ${({ $danger }) =>
    $danger ? "#8a3935" : "#2f4939"};

  background: ${({ $danger }) =>
    $danger ? "#f8e8e5" : "#e2ece5"};

  border: 1px solid
    ${({ $danger }) =>
      $danger ? "#e4c2bd" : "#c5d5c9"};

  border-radius: 8px;
  font: inherit;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    filter: brightness(0.97);
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;

const DetailsPanel = styled.section`
  margin: 18px 0 26px;
  padding: 20px;

  background: rgba(255, 255, 255, 0.58);
  border: 1px solid rgba(95, 117, 102, 0.2);
  border-radius: 16px;
  overflow-wrap: anywhere;
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
  margin: 12px 0 20px;
  color: #35483d;

  p {
    margin: 0;
    line-height: 1.6;
  }
`;

const SecondaryHeading = styled.h3`
  margin: 18px 0 12px;
  color: #2e4336;
`;

export default function FarmerPage() {
  const {
    farmers,
    loading,
    loadError,
    addFarmer,
    getFarmerById,
    updateFarmer,
    deleteFarmer,
  } = useFarmer();

  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [selectedFarmer, setSelectedFarmer] = useState(null);

  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState("");

  const [saving, setSaving] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function clearForm() {
    setFormData(initialForm);
    setEditingId(null);
    setErrors([]);
  }

  // Fill the form when editing a farmer
  function startEditing(farmer) {
    setEditingId(farmer.farmerId);

    setFormData({
      name: farmer.name || "",
      phone: farmer.contact?.phone || "",
      email: farmer.contact?.email || "",
      farmLocation: farmer.farmLocation || "",
    });

    setErrors([]);
    setMessage(`Editing ${farmer.name}.`);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // Add or update a farmer
  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    const result = farmerSchema.safeParse(formData);

    if (!result.success) {
      setErrors(
        result.error.issues.map((issue) => issue.message)
      );
      return;
    }

    setErrors([]);
    setSaving(true);

    try {
      const {
        name,
        phone,
        email,
        farmLocation,
      } = result.data;

      const payload = {
        name,
        contact: {
          phone,
          email,
        },
        farmLocation,
      };

      if (editingId !== null) {
        const response = await updateFarmer(
          editingId,
          payload
        );

        if (
          String(selectedFarmer?.farmerId) ===
          String(editingId)
        ) {
          setSelectedFarmer(response.farmer);
        }

        setMessage("Farmer updated successfully.");
      } else {
        await addFarmer(payload);

        setMessage("Farmer added successfully.");
      }

      clearForm();
    } catch (error) {
      setMessage(
        error.message || "Unable to save farmer."
      );
    } finally {
      setSaving(false);
    }
  }

  // Retrieve an individual farmer and their crops
  async function handleViewFarmer(farmerId) {
    setDetailLoading(true);
    setMessage("");

    try {
      const farmer = await getFarmerById(farmerId);

      setSelectedFarmer(farmer);
    } catch (error) {
      setMessage(
        error.message || "Unable to retrieve farmer details."
      );
    } finally {
      setDetailLoading(false);
    }
  }

  // Delete a farmer
  async function handleDeleteFarmer(farmer) {
    const confirmed = window.confirm(
      `Delete ${farmer.name} and all crops attached to this farmer?`
    );

    if (!confirmed) return;

    setMessage("");

    try {
      await deleteFarmer(farmer.farmerId);

      if (
        String(selectedFarmer?.farmerId) ===
        String(farmer.farmerId)
      ) {
        setSelectedFarmer(null);
      }

      if (
        String(editingId) ===
        String(farmer.farmerId)
      ) {
        clearForm();
      }

      setMessage("Farmer deleted successfully.");
    } catch (error) {
      setMessage(
        error.message || "Unable to delete farmer."
      );
    }
  }

  const selectedTypeLabel = (category) =>
    category === "Vegetables" ? "Vegetable" : category;

  return (
    <PageLayout>
      <PageHeader>
        <h1>Farmers Details</h1>

        <p>
          Add farmers, update their information, and select
          a farmer to view their crops.
        </p>
      </PageHeader>

      <SectionTitle>
        {editingId !== null
          ? "Update Farmer"
          : "Farmer Entry"}
      </SectionTitle>

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

          <SubmitButton
            type="submit"
            disabled={saving}
          >
            {saving
              ? "Saving..."
              : editingId !== null
                ? "Update Farmer"
                : "Add Farmer"}
          </SubmitButton>

          {editingId !== null && (
            <ActionButton
              type="button"
              onClick={clearForm}
            >
              Cancel Edit
            </ActionButton>
          )}
        </FormGrid>

        {errors.map((error, index) => (
          <FormMessage key={`${error}-${index}`}>
            {error}
          </FormMessage>
        ))}

        {message && (
          <FormMessage $tone="success">
            {message}
          </FormMessage>
        )}
      </FormPanel>

      <SectionTitle>Registered Farmers</SectionTitle>

      {loadError && (
        <FormMessage>{loadError}</FormMessage>
      )}

      {loading ? (
        <EmptyMessage>
          Loading farmers...
        </EmptyMessage>
      ) : farmers.length === 0 ? (
        <EmptyMessage>
          No farmers available.
        </EmptyMessage>
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
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {farmers.map((farmer) => (
                <TableRow key={farmer.farmerId}>
                  <TableCell>
                    {farmer.farmerId}
                  </TableCell>

                  <TableCell>{farmer.name}</TableCell>

                  <TableCell>
                    {farmer.contact?.phone || "N/A"}
                  </TableCell>

                  <TableCell>
                    {farmer.contact?.email || "N/A"}
                  </TableCell>

                  <TableCell>
                    {farmer.farmLocation || "N/A"}
                  </TableCell>

                  <TableCell>
                    {farmer.producedCrops?.length ?? 0}
                  </TableCell>

                  <TableCell>
                    <Actions>
                      <ActionButton
                        type="button"
                        onClick={() =>
                          handleViewFarmer(farmer.farmerId)
                        }
                        disabled={detailLoading}
                      >
                        View
                      </ActionButton>

                      <ActionButton
                        type="button"
                        onClick={() => startEditing(farmer)}
                      >
                        Edit
                      </ActionButton>

                      <ActionButton
                        type="button"
                        $danger
                        onClick={() =>
                          handleDeleteFarmer(farmer)
                        }
                      >
                        Delete
                      </ActionButton>
                    </Actions>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </DataTable>
        </TableWrapper>
      )}

      {detailLoading && (
        <EmptyMessage>
          Loading farmer details...
        </EmptyMessage>
      )}

      {selectedFarmer && !detailLoading && (
        <DetailsPanel>
          <SectionTitle>
            Selected Farmer Details
          </SectionTitle>

          <DetailGrid>
            <p>
              <strong>ID:</strong>{" "}
              {selectedFarmer.farmerId}
            </p>

            <p>
              <strong>Name:</strong>{" "}
              {selectedFarmer.name}
            </p>

            <p>
              <strong>Phone:</strong>{" "}
              {selectedFarmer.contact?.phone || "N/A"}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {selectedFarmer.contact?.email || "N/A"}
            </p>

            <p>
              <strong>Location:</strong>{" "}
              {selectedFarmer.farmLocation || "N/A"}
            </p>
          </DetailGrid>

          <SecondaryHeading>
            {selectedFarmer.name}'s Crops
          </SecondaryHeading>

          {!selectedFarmer.producedCrops?.length ? (
            <EmptyMessage>
              This farmer has not added any crops yet.
            </EmptyMessage>
          ) : (
            <TableWrapper>
              <DataTable>
                <thead>
                  <tr>
                    <th>Crop ID</th>
                    <th>Crop Name</th>
                    <th>Category</th>
                    <th>Quantity</th>
                    <th>Price / Unit</th>
                    <th>Harvest Season</th>
                  </tr>
                </thead>

                <tbody>
                  {selectedFarmer.producedCrops.map(
                    (crop) => (
                      <TableRow key={crop.cropId}>
                        <TableCell>
                          {crop.cropId}
                        </TableCell>

                        <TableCell>
                          {crop.cropName}
                        </TableCell>

                        <TableCell>
                          <TypeBadge
                            $type={categoryType[crop.category]}
                          >
                            {selectedTypeLabel(crop.category)}
                          </TypeBadge>
                        </TableCell>

                        <TableCell>
                          <Quantity>
                            {crop.quantity} {crop.unit}
                          </Quantity>
                        </TableCell>

                        <TableCell>
                          ₹{crop.pricePerUnit}
                        </TableCell>

                        <TableCell>
                          {crop.harvestSeason || "N/A"}
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </tbody>
              </DataTable>
            </TableWrapper>
          )}
        </DetailsPanel>
      )}
    </PageLayout>
  );
}