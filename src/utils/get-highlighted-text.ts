export const getHighlightedText = (text: string | string[], tags: string[]) => {
  if (!Array.isArray(text)) return text;
  return text
    .map((el) => {
      if (tags.includes(el)) {
        return `<span style="background-color: red">
              ${el}
            </span>`;
      }
      return el;
    })
    .join("");
};
