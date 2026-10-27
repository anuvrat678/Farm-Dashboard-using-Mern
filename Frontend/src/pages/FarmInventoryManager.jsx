import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { z } from "zod";

import PageLayout from "../components/styled/PageLayout.jsx";
import PageHeader from "../components/styled/PageHeader.jsx";

const API_URL =
  "https://api.jsonbin.io/v3/b/6adaf4faac6210605a4af6f2";

// Initial form values
const initialForm = {
  farmerId: "",
  productName: "",
  category: "grain",
  quantity: "",
  unit: "kg",
  pricePerUnit: "",
  harvestDate: "",
  storageConditions: "",
  organicCertification: false,
  pesticideUse: "None",
  notes: "",
};

// Zod validation
const productSchema = z.object({
  farmerId: z.string().trim().min(1, "Farmer ID is required"),
  productName: z.string().trim().min(1, "Product name is required"),
  category: z.enum(["grain", "vegetable", "fruit"]),
  quantity: z.coerce.number().positive("Quantity must be greater than zero"),
  unit: z.enum(["kg", "gram", "tonne"]),
  pricePerUnit: z.coerce.number().nonnegative("Price cannot be negative"),
  harvestDate: z.string().min(1, "Harvest date is required"),
  storageConditions: z.string().trim().min(1, "Storage is required"),
  organicCertification: z.boolean(),
  pesticideUse: z.string().trim().min(1, "Select pesticide use"),
  notes: z.string().trim(),
});

// ---------------- STYLED COMPONENTS ----------------

const Page = styled.div`
  width: 100%;
  min-width: 0;
`;

const Metrics = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin: 24px 0;

  @media (max-width: 600px) {
    gap: 9px;
  }
`;

const MetricCard = styled.div`
  min-width: 0;
  padding: 19px;
  border: 1px solid #dce5dd;
  border-radius: 14px;
  background: rgba(248, 250, 247, 0.88);

  @media (max-width: 500px) {
    padding: 12px 9px;
  }
`;

const MetricLabel = styled.p`
  margin: 0 0 9px;
  color: #718074;
  font-size: 0.84rem;

  @media (max-width: 500px) {
    font-size: 0.72rem;
  }
`;

const MetricValue = styled.p`
  margin: 0;
  color: #263b2d;
  font-size: clamp(1.25rem, 2.5vw, 1.85rem);
  font-weight: 700;
  overflow-wrap: anywhere;
`;

const MetricNote = styled.p`
  margin: 6px 0 0;
  color: #829084;
  font-size: 0.75rem;

  @media (max-width: 500px) {
    font-size: 0.66rem;
  }
`;

const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 18px;
`;

const ToolbarTitle = styled.div`
  h2 {
    margin: 0 0 5px;
    color: #263b2d;
    font-size: 1.25rem;
  }

  p {
    margin: 0;
    color: #718074;
    font-size: 0.88rem;
    line-height: 1.5;
  }
`;

const ToolbarActions = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 9px;
  min-width: 0;

  @media (max-width: 650px) {
    justify-content: flex-start;
  }
`;

const controlStyles = `
  box-sizing: border-box;
  min-height: 42px;
  padding: 10px 12px;
  border: 1px solid #d4ded5;
  border-radius: 9px;
  background: #fff;
  color: #35493a;
  font: inherit;
  font-size: 0.88rem;
  outline: none;

  &:focus {
    border-color: #66876e;
    box-shadow: 0 0 0 3px rgba(102, 135, 110, 0.12);
  }
`;

const SearchInput = styled.input`
  ${controlStyles}
  width: min(270px, 100%);
  flex: 1;
`;

const FilterSelect = styled.select`
  ${controlStyles}
  min-width: 140px;
`;

const Button = styled.button`
  min-height: 42px;
  padding: 10px 15px;
  border: 1px solid ${({ $secondary }) =>
    $secondary ? "#d4ded5" : "#496c51"};
  border-radius: 9px;
  background: ${({ $secondary }) => ($secondary ? "#fff" : "#496c51")};
  color: ${({ $secondary }) => ($secondary ? "#405347" : "#fff")};
  font: inherit;
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: ${({ $secondary }) =>
      $secondary ? "#edf3ed" : "#36573e"};
  }
`;

const FormPanel = styled.section`
  margin-bottom: 24px;
  padding: 24px;
  border: 1px solid #dce5dd;
  border-radius: 15px;
  background: rgba(248, 250, 247, 0.96);
`;

const FormHeading = styled.div`
  margin-bottom: 20px;

  h3 {
    margin: 0 0 5px;
    color: #263b2d;
    font-size: 1.15rem;
  }

  p {
    margin: 0;
    color: #718074;
    font-size: 0.88rem;
  }
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 17px;

  @media (max-width: 800px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.div`
  display: grid;
  align-content: start;
  gap: 7px;
  min-width: 0;
`;

const Label = styled.label`
  color: #405347;
  font-size: 0.85rem;
  font-weight: 600;
`;

const Input = styled.input`
  ${controlStyles}
  width: 100%;
`;

const Select = styled.select`
  ${controlStyles}
  width: 100%;
`;

const TextArea = styled.textarea`
  ${controlStyles}
  width: 100%;
  min-height: 75px;
  resize: vertical;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  align-self: center;
  gap: 10px;
  color: #405347;
  font-size: 0.88rem;
  cursor: pointer;

  input {
    width: 17px;
    height: 17px;
    accent-color: #52775b;
  }
`;

const FormActions = styled.div`
  display: flex;
  grid-column: 1 / -1;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 10px;
  padding-top: 15px;
  border-top: 1px solid #e0e7e0;
`;

const Message = styled.p`
  margin: 0;
  color: ${({ $error }) => ($error ? "#a33d35" : "#41694a")};
  font-size: 0.85rem;
  line-height: 1.5;
`;

const InventoryHeading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 16px;

  h2 {
    margin: 0 0 5px;
    color: #263b2d;
    font-size: 1.25rem;
  }

  p {
    margin: 0;
    color: #718074;
    font-size: 0.88rem;
    line-height: 1.5;
  }
`;

const Count = styled.span`
  padding: 7px 12px;
  border: 1px solid #d7e2d8;
  border-radius: 20px;
  background: #edf3ed;
  color: #45664b;
  font-size: 0.82rem;
  font-weight: 600;
  white-space: nowrap;
`;

const InventoryLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.55fr) minmax(275px, 0.85fr);
  align-items: start;
  gap: 18px;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`;

const ProductList = styled.section`
  min-width: 0;
  overflow: hidden;
  border: 1px solid #dce5dd;
  border-radius: 13px;
  background: rgba(248, 250, 247, 0.94);
`;

const ListHeader = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto;
  align-items: center;
  gap: 12px;
  padding: 13px 16px;
  border-bottom: 1px solid #e0e7e0;
  color: #829084;
  font-size: 0.74rem;
  font-weight: 600;
  letter-spacing: 0.035em;
  text-transform: uppercase;

  @media (max-width: 550px) {
    grid-template-columns: minmax(0, 1fr) auto;

    > :nth-child(3) {
      display: none;
    }
  }
`;

const ProductItem = styled.div`
  border-bottom: 1px solid #e5ebe5;

  &:last-child {
    border-bottom: none;
  }
`;

const ProductRow = styled.button`
  display: grid;
  width: 100%;
  grid-template-columns: minmax(0, 1fr) auto auto 18px;
  align-items: center;
  gap: 12px;
  padding: 15px 16px;
  border: none;
  background: ${({ $active }) => ($active ? "#edf3ed" : "transparent")};
  box-shadow: ${({ $active }) =>
    $active ? "inset 3px 0 #52775b" : "none"};
  text-align: left;
  cursor: pointer;
  font: inherit;

  &:hover {
    background: #f0f5ef;
  }

  &:focus-visible {
    outline: 2px solid #66876e;
    outline-offset: -2px;
  }

  @media (max-width: 1000px) {
    background: ${({ $expanded }) =>
      $expanded ? "#edf3ed" : "transparent"};
    box-shadow: ${({ $expanded }) =>
      $expanded ? "inset 3px 0 #52775b" : "none"};
  }

  @media (max-width: 550px) {
    grid-template-columns: minmax(0, 1fr) auto 18px;

    > :nth-child(3) {
      display: none;
    }
  }
`;

const ProductInfo = styled.div`
  min-width: 0;

  strong {
    display: block;
    color: #263b2d;
    font-size: 0.92rem;
    overflow-wrap: anywhere;
  }

  > span {
    display: block;
    margin-top: 5px;
    color: #7a887d;
    font-size: 0.78rem;
  }
`;

const CategoryBadge = styled.span`
  display: inline-block;
  margin-top: 6px;
  padding: 4px 7px;
  border-radius: 6px;
  background: #edf3ed;
  color: #45664b;
  font-size: 0.74rem;
  text-transform: capitalize;
`;

const RowValue = styled.div`
  min-width: 75px;
  text-align: right;

  strong {
    display: block;
    color: #35493a;
    font-size: 0.86rem;
    font-weight: 600;
    white-space: nowrap;
  }

  span {
    display: block;
    margin-top: 4px;
    color: #829084;
    font-size: 0.75rem;
  }
`;

const Arrow = styled.span`
  color: #7a887d;
  font-size: 1.1rem;
  text-align: center;
`;

const DetailsPanel = styled.aside`
  min-width: 0;
  padding: 22px;
  border: 1px solid #dce5dd;
  border-radius: 14px;
  background: rgba(248, 250, 247, 0.95);

  @media (min-width: 1001px) {
    position: sticky;
    top: 90px;
  }

  @media (max-width: 1000px) {
    display: none;
  }
`;

const MobileDetails = styled.div`
  display: none;

  @media (max-width: 1000px) {
    display: block;
    padding: 20px;
    border-top: 1px solid #dce5dd;
    background: #f5f8f4;
  }

  @media (max-width: 500px) {
    padding: 16px;
  }
`;

const DetailHeading = styled.div`
  padding-bottom: 17px;
  border-bottom: 1px solid #e0e7e0;

  > span {
    color: #718074;
    font-size: 0.77rem;
  }

  h3 {
    margin: 7px 0;
    color: #263b2d;
    font-size: 1.3rem;
    overflow-wrap: anywhere;
  }

  p {
    margin: 0;
    color: #718074;
    font-size: 0.87rem;
  }
`;

const DetailStats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin: 17px 0;
`;

const DetailStat = styled.div`
  min-width: 0;
  padding: 12px;
  border: 1px solid #e0e7e0;
  border-radius: 10px;
  background: #fff;

  span {
    display: block;
    margin-bottom: 6px;
    color: #829084;
    font-size: 0.75rem;
  }

  strong {
    color: #35493a;
    font-size: 0.94rem;
    overflow-wrap: anywhere;
  }
`;

const DetailSection = styled.div`
  padding: 13px 0;
  border-bottom: 1px solid #e0e7e0;

  &:last-child {
    padding-bottom: 0;
    border-bottom: none;
  }

  h4 {
    margin: 0 0 7px;
    color: #718074;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  p {
    margin: 0;
    color: #35493a;
    font-size: 0.87rem;
    line-height: 1.65;
    overflow-wrap: anywhere;
    white-space: pre-wrap;
  }
`;

const OrganicBadge = styled.span`
  display: inline-block;
  padding: 6px 9px;
  border-radius: 7px;
  background: ${({ $certified }) =>
    $certified ? "#e6f2e6" : "#f1efea"};
  color: ${({ $certified }) =>
    $certified ? "#3d7046" : "#786e5d"};
  font-size: 0.79rem;
  font-weight: 600;
`;

const Status = styled.div`
  padding: 28px 18px;
  border: 1px dashed #d4ded5;
  border-radius: 12px;
  color: #718074;
  background: rgba(248, 250, 247, 0.7);
  text-align: center;
  line-height: 1.6;
`;

const RetryButton = styled(Button)`
  margin-top: 12px;
`;

// ---------------- COMPONENT ----------------

function FarmInventoryManager() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [success, setSuccess] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedId, setSelectedId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  // Fetch inventory data with a short delay.
  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    setFetchError("");

    const timer = setTimeout(async () => {
      try {
        const response = await fetch(API_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`API request failed: ${response.status}`);
        }

        const data = await response.json();
        const record = data.record ?? data;

        const fetchedProducts = Array.isArray(record)
          ? record
          : record.farmProducts;

        if (!Array.isArray(fetchedProducts)) {
          console.error("Unexpected JSONBin response:", data);
          throw new Error(
            "No farmProducts array found. Check the JSONBin record."
          );
        }

        setProducts(fetchedProducts);

        setSelectedId((previous) =>
          fetchedProducts.some(
            (product) => String(product.id) === String(previous)
          )
            ? previous
            : fetchedProducts[0]?.id ?? null
        );
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Unable to load farm products:", error);
          setFetchError(error.message || "Unable to load products.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, 500);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [retryCount]);

  // Search and category filtering.
  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch = [
        product.productName,
        product.farmerId,
        product.category,
      ].some((value) =>
        String(value ?? "").toLowerCase().includes(query)
      );

      const matchesCategory =
        categoryFilter === "all" || product.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, categoryFilter]);

  const selectedProduct =
    filteredProducts.find(
      (product) => String(product.id) === String(selectedId)
    ) ?? filteredProducts[0] ?? null;

  // Only kilograms are summed into the stock metric.
  const totalStockKg = products
    .filter((product) => product.unit === "kg")
    .reduce(
      (total, product) => total + (Number(product.quantity) || 0),
      0
    );

  const certifiedCount = products.filter(
    (product) => product.organicCertification
  ).length;

  const categoryCount = new Set(
    products.map((product) => product.category).filter(Boolean)
  ).size;

  // Controlled inputs.
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    setSuccess("");
  };

  // Validate and add a product to local state.
  const handleSubmit = (event) => {
    event.preventDefault();
    setSuccess("");

    const result = productSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = {};

      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0];

        if (fieldName && !fieldErrors[fieldName]) {
          fieldErrors[fieldName] = issue.message;
        }
      });

      setErrors(fieldErrors);
      return;
    }

    const nextId =
      Math.max(
        0,
        ...products.map((product) => Number(product.id) || 0)
      ) + 1;

    const newProduct = {
      id: nextId,
      ...result.data,
      photos: [],
    };

    setProducts((previous) => [...previous, newProduct]);
    setSelectedId(nextId);
    setExpandedId(nextId);
    setFormData(initialForm);
    setErrors({});
    setSearch("");
    setCategoryFilter("all");
    setShowForm(false);
    setSuccess("Product added to the current inventory.");
  };

  // Toggle a mobile row. Only one row can be open at a time.
  const toggleProduct = (product) => {
    setSelectedId(product.id);

    setExpandedId((previous) =>
      String(previous) === String(product.id) ? null : product.id
    );
  };

  const closeForm = () => {
    setShowForm(false);
    setFormData(initialForm);
    setErrors({});
  };

  // Render product information in both the desktop panel and mobile row.
  const renderProductDetails = (product) => (
    <>
      <DetailHeading>
        <span>PRODUCT DETAILS · #{product.id}</span>
        <h3>{product.productName || "Unnamed product"}</h3>
        <p>
          {product.farmerId || "No farmer ID"} ·{" "}
          {product.category || "Uncategorized"}
        </p>
      </DetailHeading>

      <DetailStats>
        <DetailStat>
          <span>Available quantity</span>
          <strong>
            {Number(product.quantity ?? 0).toLocaleString("en-IN")}{" "}
            {product.unit || ""}
          </strong>
        </DetailStat>

        <DetailStat>
          <span>Price per unit</span>
          <strong>₹{product.pricePerUnit ?? "—"}</strong>
        </DetailStat>
      </DetailStats>

      <DetailSection>
        <h4>Harvest date</h4>
        <p>{product.harvestDate || "Not provided"}</p>
      </DetailSection>

      <DetailSection>
        <h4>Storage conditions</h4>
        <p>{product.storageConditions || "Not provided"}</p>
      </DetailSection>

      <DetailSection>
        <h4>Pesticide use</h4>
        <p>{product.pesticideUse || "Not provided"}</p>
      </DetailSection>

      <DetailSection>
        <h4>Organic certification</h4>
        <OrganicBadge
          $certified={Boolean(product.organicCertification)}
        >
          {product.organicCertification ? "Certified" : "Not certified"}
        </OrganicBadge>
      </DetailSection>

      <DetailSection>
        <h4>Notes</h4>
        <p>{product.notes || "No notes provided."}</p>
      </DetailSection>
    </>
  );

  return (
    <PageLayout>
      <Page>
        <PageHeader>
          <h1>Farm Inventory</h1>
          <p>
            Manage harvested products, quantities, prices, and storage details.
          </p>
        </PageHeader>

        {/* SUMMARY METRICS */}
        <Metrics>
          <MetricCard>
            <MetricLabel>Total products</MetricLabel>
            <MetricValue>{products.length}</MetricValue>
            <MetricNote>Inventory records</MetricNote>
          </MetricCard>

          <MetricCard>
            <MetricLabel>Stock in kg</MetricLabel>
            <MetricValue>
              {totalStockKg.toLocaleString("en-IN")}
            </MetricValue>
            <MetricNote>Kilogram records only</MetricNote>
          </MetricCard>

          <MetricCard>
            <MetricLabel>Organic certified</MetricLabel>
            <MetricValue>{certifiedCount}</MetricValue>
            <MetricNote>{categoryCount} categories</MetricNote>
          </MetricCard>
        </Metrics>

        {/* SEARCH AND FILTERS */}
        <Toolbar>
          <ToolbarTitle>
            <h2>Inventory</h2>
            <p>Choose a product to view its details.</p>
          </ToolbarTitle>

          <ToolbarActions>
            <SearchInput
              type="search"
              aria-label="Search inventory"
              placeholder="Search products or farmers..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            <FilterSelect
              aria-label="Filter category"
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
            >
              <option value="all">All categories</option>
              <option value="grain">Grain</option>
              <option value="vegetable">Vegetable</option>
              <option value="fruit">Fruit</option>
            </FilterSelect>

            <Button
              type="button"
              onClick={() => {
                setShowForm((previous) => !previous);
                setSuccess("");
              }}
            >
              {showForm ? "Close form" : "+ Add product"}
            </Button>
          </ToolbarActions>
        </Toolbar>

        {success && (
          <Message style={{ marginBottom: 14 }}>{success}</Message>
        )}

        {/* ADD PRODUCT FORM */}
        {showForm && (
          <FormPanel>
            <FormHeading>
              <h3>Add new product</h3>
              <p>Enter the details for the new inventory record.</p>
            </FormHeading>

            <Form onSubmit={handleSubmit} noValidate>
              <Field>
                <Label htmlFor="farmerId">Farmer ID</Label>
                <Input
                  id="farmerId"
                  name="farmerId"
                  value={formData.farmerId}
                  onChange={handleChange}
                  placeholder="e.g. F026"
                />
                {errors.farmerId && (
                  <Message $error>{errors.farmerId}</Message>
                )}
              </Field>

              <Field>
                <Label htmlFor="productName">Product name</Label>
                <Input
                  id="productName"
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  placeholder="e.g. Wheat"
                />
                {errors.productName && (
                  <Message $error>{errors.productName}</Message>
                )}
              </Field>

              <Field>
                <Label htmlFor="category">Category</Label>
                <Select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="grain">Grain</option>
                  <option value="vegetable">Vegetable</option>
                  <option value="fruit">Fruit</option>
                </Select>
              </Field>

              <Field>
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  min="0.01"
                  step="any"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="Enter quantity"
                />
                {errors.quantity && (
                  <Message $error>{errors.quantity}</Message>
                )}
              </Field>

              <Field>
                <Label htmlFor="unit">Unit</Label>
                <Select
                  id="unit"
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                >
                  <option value="kg">Kilogram (kg)</option>
                  <option value="gram">Gram</option>
                  <option value="tonne">Tonne</option>
                </Select>
              </Field>

              <Field>
                <Label htmlFor="pricePerUnit">Price per unit (₹)</Label>
                <Input
                  id="pricePerUnit"
                  name="pricePerUnit"
                  type="number"
                  min="0"
                  step="any"
                  value={formData.pricePerUnit}
                  onChange={handleChange}
                  placeholder="Enter price"
                />
                {errors.pricePerUnit && (
                  <Message $error>{errors.pricePerUnit}</Message>
                )}
              </Field>

              <Field>
                <Label htmlFor="harvestDate">Harvest date</Label>
                <Input
                  id="harvestDate"
                  name="harvestDate"
                  type="date"
                  value={formData.harvestDate}
                  onChange={handleChange}
                />
                {errors.harvestDate && (
                  <Message $error>{errors.harvestDate}</Message>
                )}
              </Field>

              <Field>
                <Label htmlFor="storageConditions">
                  Storage conditions
                </Label>
                <Select
                  id="storageConditions"
                  name="storageConditions"
                  value={formData.storageConditions}
                  onChange={handleChange}
                >
                  <option value="">Select storage</option>
                  <option value="Cool and dry">Cool and dry</option>
                  <option value="Cool and dark">Cool and dark</option>
                  <option value="Refrigerated">Refrigerated</option>
                  <option value="Room temperature">Room temperature</option>
                </Select>
                {errors.storageConditions && (
                  <Message $error>{errors.storageConditions}</Message>
                )}
              </Field>

              <Field>
                <Label htmlFor="pesticideUse">Pesticide use</Label>
                <Select
                  id="pesticideUse"
                  name="pesticideUse"
                  value={formData.pesticideUse}
                  onChange={handleChange}
                >
                  <option value="None">None</option>
                  <option value="Used pesticides during growth">
                    Used pesticides during growth
                  </option>
                </Select>
              </Field>

              <CheckboxLabel>
                <input
                  type="checkbox"
                  name="organicCertification"
                  checked={formData.organicCertification}
                  onChange={handleChange}
                />
                Organic certification
              </CheckboxLabel>

              <Field>
                <Label htmlFor="notes">Notes</Label>
                <TextArea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Additional product information"
                />
              </Field>

              {Object.keys(errors).length > 0 && (
                <div style={{ gridColumn: "1 / -1" }}>
                  <Message $error>
                    Correct the errors shown above before saving.
                  </Message>
                </div>
              )}

              <FormActions>
                <Button
                  type="button"
                  $secondary
                  onClick={closeForm}
                >
                  Cancel
                </Button>
                <Button type="submit">Save product</Button>
              </FormActions>
            </Form>
          </FormPanel>
        )}

        {/* INVENTORY LIST */}
        <InventoryHeading>
          <div>
            <h2>Product records</h2>
            <p>Tap a product to inspect its complete record.</p>
          </div>

          <Count>
            {filteredProducts.length} of {products.length} products
          </Count>
        </InventoryHeading>

        {loading ? (
          <Status>Loading farm inventory...</Status>
        ) : fetchError ? (
          <Status>
            <Message $error>{fetchError}</Message>
            <RetryButton
              type="button"
              $secondary
              onClick={() => setRetryCount((previous) => previous + 1)}
            >
              Retry
            </RetryButton>
          </Status>
        ) : products.length === 0 ? (
          <Status>No products found. Add your first inventory record.</Status>
        ) : filteredProducts.length === 0 ? (
          <Status>No products match your search or category filter.</Status>
        ) : (
          <InventoryLayout>
            <ProductList>
              <ListHeader>
                <span>Product</span>
                <span>Quantity</span>
                <span>Price / unit</span>
              </ListHeader>

              {filteredProducts.map((product, index) => {
                const isSelected =
                  String(product.id) === String(selectedProduct?.id);

                const isExpanded =
                  String(product.id) === String(expandedId);

                return (
                  <ProductItem key={`${product.id}-${index}`}>
                    <ProductRow
                      type="button"
                      $active={isSelected}
                      $expanded={isExpanded}
                      onClick={() => toggleProduct(product)}
                      aria-expanded={isExpanded}
                      aria-label={`View details for ${product.productName}`}
                    >
                      <ProductInfo>
                        <strong>
                          {product.productName || "Unnamed product"}
                        </strong>
                        <span>
                          {product.farmerId || "No farmer ID"} · #
                          {product.id ?? index + 1}
                        </span>
                        <CategoryBadge>
                          {product.category || "Other"}
                        </CategoryBadge>
                      </ProductInfo>

                      <RowValue>
                        <strong>
                          {Number(product.quantity ?? 0).toLocaleString(
                            "en-IN"
                          )}{" "}
                          {product.unit || ""}
                        </strong>
                        <span>Stock</span>
                      </RowValue>

                      <RowValue>
                        <strong>₹{product.pricePerUnit ?? "—"}</strong>
                        <span>Per unit</span>
                      </RowValue>

                      <Arrow aria-hidden="true">
                        {isExpanded ? "⌄" : "›"}
                      </Arrow>
                    </ProductRow>

                    {/* Inline details appear only on mobile/tablet. */}
                    {isExpanded && (
                      <MobileDetails>
                        {renderProductDetails(product)}
                      </MobileDetails>
                    )}
                  </ProductItem>
                );
              })}
            </ProductList>

            {/* Separate detail panel is visible on desktop only. */}
            {selectedProduct && (
              <DetailsPanel>
                {renderProductDetails(selectedProduct)}
              </DetailsPanel>
            )}
          </InventoryLayout>
        )}
      </Page>
    </PageLayout>
  );
}

export default FarmInventoryManager;