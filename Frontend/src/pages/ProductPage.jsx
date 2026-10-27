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
  FormSelect,
  SubmitButton,
  FormMessage,
} from "../components/styled/ApiForms.jsx";

const cropSchema = z
  .object({
    farmerId: z.string().min(1, "Select a farmer."),
    cropName: z
      .string()
      .trim()
      .min(1, "Crop name is required."),
    category: z.enum([
      "Grains",
      "Vegetables",
      "Fruits",
    ]),
    quantity: z.number().positive(
      "Quantity must be greater than zero."
    ),
    unit: z.string().trim().min(1, "Unit is required."),
    pricePerUnit: z.number().min(
      0,
      "Price cannot be negative."
    ),
    harvestSeason: z.string().optional(),
  })
  .superRefine((data, context) => {
    if (
      data.category === "Grains" &&
      !data.harvestSeason?.trim()
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["harvestSeason"],
        message: "Harvest season is required for grains.",
      });
    }
  });

const initialForm = {
  farmerId: "",
  cropName: "",
  category: "Grains",
  quantity: "",
  unit: "kg",
  pricePerUnit: "",
  harvestSeason: "",
};

const categoryType = {
  Grains: "grain",
  Vegetables: "vegetable",
  Fruits: "fruit",
};

const ActionButton = styled.button`
  padding: 7px 10px;
  color: #8a3935;
  background: #f8e8e5;
  border: 1px solid #e4c2bd;
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

export default function ProductPage() {
  const {
    farmers,
    loading,
    loadError,
    addCrop,
    deleteCrop,
  } = useFarmer();

  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState("");

  const [saving, setSaving] = useState(false);
  const [deletingCropId, setDeletingCropId] = useState(null);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,

      ...(name === "category" && value !== "Grains"
        ? { harvestSeason: "" }
        : {}),
    }));
  }

  // Add a crop to the selected farmer
  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    const result = cropSchema.safeParse({
      ...formData,

      quantity:
        formData.quantity.trim() === ""
          ? NaN
          : Number(formData.quantity),

      pricePerUnit:
        formData.pricePerUnit.trim() === ""
          ? NaN
          : Number(formData.pricePerUnit),
    });

    if (!result.success) {
      setErrors(
        result.error.issues.map((issue) => issue.message)
      );
      return;
    }

    setErrors([]);
    setSaving(true);

    try {
      const crop = {
        cropName: result.data.cropName,
        category: result.data.category,
        quantity: result.data.quantity,
        unit: result.data.unit,
        pricePerUnit: result.data.pricePerUnit,

        ...(result.data.category === "Grains"
          ? {
              harvestSeason:
                result.data.harvestSeason.trim(),
            }
          : {}),
      };

      await addCrop(
        Number(result.data.farmerId),
        crop
      );

      setFormData({
        ...initialForm,
        farmerId: result.data.farmerId,
      });

      setMessage("Crop added successfully.");
    } catch (error) {
      setMessage(
        error.message || "Unable to add crop."
      );
    } finally {
      setSaving(false);
    }
  }

  // Remove a crop
  async function handleDeleteCrop(farmer, crop) {
    const confirmed = window.confirm(
      `Remove ${crop.cropName} from ${farmer.name}?`
    );

    if (!confirmed) return;

    const rowId = `${farmer.farmerId}-${crop.cropId}`;

    setDeletingCropId(rowId);
    setMessage("");

    try {
      await deleteCrop(
        farmer.farmerId,
        crop.cropId
      );

      setMessage(
        `${crop.cropName} removed successfully.`
      );
    } catch (error) {
      setMessage(
        error.message || "Unable to remove crop."
      );
    } finally {
      setDeletingCropId(null);
    }
  }

  // Flatten all farmers' crops into one list
  const cropRows = farmers.flatMap((farmer) =>
    (farmer.producedCrops || []).map((crop) => ({
      farmer,
      crop,
    }))
  );

  return (
    <PageLayout>
      <PageHeader>
        <h1>Farm Products</h1>

        <p>
          Add crops to a selected farmer and view or remove
          farmer-wise crop details.
        </p>
      </PageHeader>

      <SectionTitle>
        Farmer-wise Crop Entry
      </SectionTitle>

      <FormPanel onSubmit={handleSubmit}>
        <FormGrid>
          <FieldLabel>
            Select Farmer

            <FormSelect
              name="farmerId"
              value={formData.farmerId}
              onChange={handleChange}
            >
              <option value="">Select farmer</option>

              {farmers.map((farmer) => (
                <option
                  key={farmer.farmerId}
                  value={farmer.farmerId}
                >
                  {farmer.name} (ID: {farmer.farmerId})
                </option>
              ))}
            </FormSelect>
          </FieldLabel>

          <FieldLabel>
            Crop Name

            <FormInput
              name="cropName"
              value={formData.cropName}
              onChange={handleChange}
              placeholder="Enter crop name"
            />
          </FieldLabel>

          <FieldLabel>
            Crop Category

            <FormSelect
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="Grains">Grains</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Fruits">Fruits</option>
            </FormSelect>
          </FieldLabel>

          {formData.category === "Grains" && (
            <FieldLabel>
              Harvest Season

              <FormInput
                name="harvestSeason"
                value={formData.harvestSeason}
                onChange={handleChange}
                placeholder="e.g. Winter or Monsoon"
              />
            </FieldLabel>
          )}

          <FieldLabel>
            Quantity

            <FormInput
              name="quantity"
              type="number"
              min="0"
              step="any"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Enter quantity"
            />
          </FieldLabel>

          <FieldLabel>
            Unit

            <FormInput
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              placeholder="kg, dozen, etc."
            />
          </FieldLabel>

          <FieldLabel>
            Price Per Unit

            <FormInput
              name="pricePerUnit"
              type="number"
              min="0"
              step="any"
              value={formData.pricePerUnit}
              onChange={handleChange}
              placeholder="Enter price"
            />
          </FieldLabel>

          <SubmitButton
            type="submit"
            disabled={
              saving || loading || farmers.length === 0
            }
          >
            {saving ? "Saving..." : "Add Crop"}
          </SubmitButton>
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

      <SectionTitle>Farmer-wise Crops</SectionTitle>

      {loadError && (
        <FormMessage>{loadError}</FormMessage>
      )}

      {loading ? (
        <EmptyMessage>Loading crops...</EmptyMessage>
      ) : cropRows.length === 0 ? (
        <EmptyMessage>No crops available.</EmptyMessage>
      ) : (
        <TableWrapper>
          <DataTable>
            <thead>
              <tr>
                <th>Farmer</th>
                <th>Crop Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Price / Unit</th>
                <th>Harvest Season</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {cropRows.map(({ farmer, crop }) => {
                const rowId =
                  `${farmer.farmerId}-${crop.cropId}`;

                return (
                  <TableRow key={rowId}>
                    <TableCell>
                      {farmer.name}
                    </TableCell>

                    <TableCell>
                      {crop.cropName}
                    </TableCell>

                    <TableCell>
                      <TypeBadge
                        $type={categoryType[crop.category]}
                      >
                        {crop.category === "Vegetables"
                          ? "Vegetable"
                          : crop.category}
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

                    <TableCell>
                      <ActionButton
                        type="button"
                        disabled={deletingCropId === rowId}
                        onClick={() =>
                          handleDeleteCrop(farmer, crop)
                        }
                      >
                        {deletingCropId === rowId
                          ? "Removing..."
                          : "Remove"}
                      </ActionButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </tbody>
          </DataTable>
        </TableWrapper>
      )}
    </PageLayout>
  );
}