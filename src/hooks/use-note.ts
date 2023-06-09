import { useState } from "react";
import { changeText } from "../utils";

export const useNote = (
  text: string,
  tags: string[],
  editNote: (editedText: string, editedTags: string[]) => void
) => {
  const [edit, setEdit] = useState(false);
  const [editedText, setEditedText] = useState(text);
  const [editedTags, setEditedTags] = useState(tags);

  const activateEditMode = () => setEdit(true);
  const deactivateEditMode = () => setEdit(false);

  const saveChanges = () => {
    editNote(editedText, editedTags);
    deactivateEditMode();
  };

  const cancelChanges = () => {
    setEditedText(text);
    deactivateEditMode();
  };

  const changeNote = changeText(setEditedText, setEditedTags);

  return {
    edit,
    editedText,
    editedTags,
    changeNote,
    activateEditMode,
    saveChanges,
    cancelChanges,
  };
};
