// const handleContentChange = (event) => {
//   const inputDiv = event.target;
//   const newContent = inputDiv.innerHTML;
//   const newHashtags = getHashtags(newContent);
//   setHashtags(newHashtags);
//
//   // Save the current cursor position
//   const selection = window.getSelection();
//   const range = selection.getRangeAt(0);
//   const { startOffset, endOffset } = range;
//
//   // Highlight the hashtags
//   let highlightedContent = newContent;
//   newHashtags.forEach((hashtag) => {
//     const regex = new RegExp(`#${hashtag}\\b`, "gi");
//     highlightedContent = highlightedContent.replace(
//       regex,
//       `<span style="background-color: red;">${hashtag}</span>`
//     );
//   });
//
//   // Update the content with the highlighted hashtags
//   setContent(highlightedContent);
//
//   // Restore the cursor position
//   const newRange = new Range();
//   newRange.setStart(range.startContainer, startOffset);
//   newRange.setEnd(range.endContainer, endOffset);
//   selection.removeAllRanges();
//   selection.addRange(newRange);
// };
