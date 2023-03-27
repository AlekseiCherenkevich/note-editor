import {ChangeEvent, FormEvent, useEffect, useRef, useState} from "react";


export const useChangeText = (changeNote: (e: ChangeEvent<HTMLTextAreaElement> | null, text: string | null) => void) => {


  const [selectionRange, setSelectionRange] = useState<any>({ range: null })
  const ref = useRef(null)

  useEffect(() => {
    const selection = document.getSelection()
    if (selectionRange !== undefined) {
      selection?.removeAllRanges()
      if (selectionRange.range)
        selection?.addRange(selectionRange.range)
    }
  })

  const changeNoteText = (e: FormEvent<HTMLParagraphElement>) => {
    const selection = document.getSelection()
    if (selection) {
      const range = selection.getRangeAt(0)
      const { startOffset, endOffset } = range
      setSelectionRange({ startOffset, endOffset })
    }
    changeNote(null, e.currentTarget.textContent)
  }

  return {ref, setSelectionRange, changeNoteText}
}