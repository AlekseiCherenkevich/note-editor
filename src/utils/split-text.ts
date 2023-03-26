

export const splitText = (str: string, tags: string[]) => {
  if (tags.length === 0) return str

  return str.split(/(#*[a-z\d-]+)/ig)
}