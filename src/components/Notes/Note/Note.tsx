import React, {FC} from "react";
import {v1} from "uuid";
import {Button, Tag} from "../../../common";
import {useNote} from "../../../hooks";
import {getHighlightedText, splitText} from "../../../utils";
import "./Note.scss";
import {useChangeText} from "../../../hooks";

type Props = {
  text: string;
  tags: string[];
  removeNote: () => void;
  editNote: (text: string, tags: string[]) => void;
};

export const Note: FC<Props> = ({ text, tags, removeNote, editNote }) => {
  const {
    edit,
    editedText,
    editedTags,
    changeNote,
    saveChanges,
    cancelChanges,
    activateEditMode,
  } = useNote(text, tags, editNote);

  const splittedText = splitText(editedText, editedTags);
  const highlightedText = getHighlightedText(splittedText, tags);

  const {ref, changeNoteText} = useChangeText(changeNote)

  const renderedTags = editedTags.map((tag) => <Tag key={v1()} tag={tag} />);



  const isActiveModeLayout = (
    <>
      <p
        ref={ref}
        className={"editableParagraph"}
        contentEditable={true}
        dangerouslySetInnerHTML={{ __html: highlightedText }}
        onInput={changeNoteText}
      ></p>
      <div className={"buttons"}>
        <Button callback={cancelChanges}>cancel</Button>
        <Button callback={saveChanges}>save</Button>
      </div>
    </>
  );

  const isNotActiveModeLayout = (
    <>
      <p
        className={"note-text"}
        onDoubleClick={activateEditMode}
        dangerouslySetInnerHTML={{ __html: text }}
      ></p>
      <div className={"buttons"}>
        <Button callback={removeNote}>remove</Button>
        <Button callback={activateEditMode}>edit</Button>
      </div>
    </>
  );

  return (
    <li>
      {edit ? isActiveModeLayout : isNotActiveModeLayout}
      <ul className={"tags"}>{renderedTags}</ul>
    </li>
  );
};




