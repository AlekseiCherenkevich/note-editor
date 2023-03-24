import {ChangeEvent} from "react";

export const changeNoteUtil = (setTextParam: (text: string) => void, setTagsParam: (tags: string[]) => void) => (e: ChangeEvent<HTMLTextAreaElement>, ) => {
  let text = e.currentTarget.value
  let tags: string[] = []
  setTextParam(text)
  if (text.at(-1) !== '') {
    const splittedStr = text.split(' ')
    splittedStr.forEach(word=>{
      word.trim()
      if (word[0] === '#' && !tags.includes(word)) {
        tags.push(word)
        setTagsParam(tags)
      }
    })
  }
  if (!text.includes('#')) {
    setTagsParam([])
  }
}