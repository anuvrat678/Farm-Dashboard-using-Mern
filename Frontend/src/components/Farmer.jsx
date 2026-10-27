import { useState } from "react";
import { z } from "zod";

import {
  TableRow,
  TableCell,
} from "./styled/DataTable.jsx";

import {
  ActionButton,
  ButtonGroup,
  FormInput,
  SecondaryButton,
  StatusText,
} from "./styled/ContextControls.jsx";

const schema = z.object({
  name: z.string().trim().min(1, "Farmer name is required"),
  age: z.number().int().positive("Age must be a positive number"),
  location: z.string().optional(),
});

const Farmer = ({
  name,
  age,
  location,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const [draft, setDraft] = useState({
    name: name ?? "",
    age: age === undefined ? "" : String(age),
    location: location ?? "",
  });

  const [saveError, setSaveError] = useState("");

  const validation = schema.safeParse({
    name: name ?? "",
    age,
    location,
  });

  function startEditing() {
    setDraft({
      name: name ?? "",
      age: age === undefined ? "" : String(age),
      location: location ?? "",
    });

    setSaveError("");
    setIsEditing(true);
  }

  function cancelEditing() {
    setIsEditing(false);
    setSaveError("");
  }

  function handleSave() {
    const result = schema.safeParse({
      name: draft.name,
      age: draft.age.trim() === ""
        ? undefined
        : Number(draft.age),
      location: draft.location.trim() || undefined,
    });

    if (!result.success) {
      setSaveError(
        result.error.issues
          .map((issue) => issue.message)
          .join(". ")
      );

      return;
    }

    onUpdate(result.data);

    setSaveError("");
    setIsEditing(false);
  }

  return (
    <TableRow>
      <TableCell>
        {isEditing ? (
          <FormInput
            aria-label="Farmer name"
            value={draft.name}
            onChange={(event) =>
              setDraft((previous) => ({
                ...previous,
                name: event.target.value,
              }))
            }
          />
        ) : (
          name || "N/A"
        )}
      </TableCell>

      <TableCell>
        {isEditing ? (
          <FormInput
            aria-label="Farmer age"
            type="number"
            min="1"
            value={draft.age}
            onChange={(event) =>
              setDraft((previous) => ({
                ...previous,
                age: event.target.value,
              }))
            }
          />
        ) : (
          age ?? "N/A"
        )}
      </TableCell>

      <TableCell>
        {isEditing ? (
          <FormInput
            aria-label="Farm location"
            value={draft.location}
            onChange={(event) =>
              setDraft((previous) => ({
                ...previous,
                location: event.target.value,
              }))
            }
          />
        ) : (
          location || "N/A"
        )}
      </TableCell>

      <TableCell>
        {isEditing ? (
          saveError ? (
            <StatusText $tone="error">
              {saveError}
            </StatusText>
          ) : (
            <StatusText $tone="success">
              Editing
            </StatusText>
          )
        ) : validation.success ? (
          <StatusText $tone="success">
            Valid
          </StatusText>
        ) : (
          <StatusText $tone="error">
            {validation.error.issues
              .map((issue) => issue.message)
              .join(". ")}
          </StatusText>
        )}
      </TableCell>

      <TableCell>
        {isEditing ? (
          <ButtonGroup>
            <ActionButton
              type="button"
              onClick={handleSave}
            >
              Save
            </ActionButton>

            <SecondaryButton
              type="button"
              onClick={cancelEditing}
            >
              Cancel
            </SecondaryButton>
          </ButtonGroup>
        ) : (
          <ActionButton
            type="button"
            onClick={startEditing}
          >
            Edit
          </ActionButton>
        )}
      </TableCell>
    </TableRow>
  );
};

export default Farmer;