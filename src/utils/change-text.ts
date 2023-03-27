import { ChangeEvent } from "react";

export const changeText =
  (
    setTextParam: (text: string) => void,
    setTagsParam: (tags: string[]) => void
  ) =>
  (e: ChangeEvent<HTMLTextAreaElement> | null, text: string | null) => {
    let str;
    if (typeof text === "string") {
      str = text;
    } else {
      str = e ? e.currentTarget.value : "";
    }

    setTextParam(str);

    let tags: string[] = [];

    let splittedStr = str.split(/(#*[a-я\d-]+)/gi);
    if (splittedStr.some((el) => el[0] === "#")) {
      splittedStr.forEach((el) => {
        if (el[0] === "#") {
          tags.push(el);
        }
      });
      setTagsParam(tags);
    } else {
      setTagsParam([]);
    }
  };
