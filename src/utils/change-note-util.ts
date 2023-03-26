import {ChangeEvent} from "react";

export const changeNoteUtil = (setTextParam: (text: string) => void, setTagsParam: (tags: string[]) => void) => (e: ChangeEvent<HTMLTextAreaElement> | null, text: string | null ) => {
  console.log(text)
  let str
  if (typeof text === 'string') {
    str = text
  } else {
    str = e ? e.currentTarget.value : ''
  }

  let tags: string[] = []
  setTextParam(str)
  if (str.at(-1) !== '') {
    const splittedStr = str.split(' ')
    splittedStr.forEach(word=>{
      word.trim()
      if (word[0] === '#' && !tags.includes(word)) {
        tags.push(word)
        setTagsParam(tags)
      }
    })
  }
  if (!str.includes('#')) {
    setTagsParam([])
  }
}