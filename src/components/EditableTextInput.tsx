import { ActionIcon, TextInput, TextInputProps } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import { useState } from "react";
import classes from "./EditableTextInput.module.css";

export function EditableTextInput(props: TextInputProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(props.defaultValue);
  const [focused, setFocused] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    setFocused(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    setFocused(false);
  };

  return (
    <TextInput
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
      onFocus={() => setFocused(true)}
      onBlur={handleBlur}
      onClick={handleEdit}
      readOnly={!isEditing} // Only allow editing when the input is in edit mode
      classNames={classes}
      rightSection={
        <ActionIcon onClick={handleEdit} variant="transparent" c="black">
          <IconEdit size={16} />
        </ActionIcon>
      }
      variant="unstyled" // Remove default styling
      data-focused={focused || isEditing}
      {...props}
    />
  );
}
