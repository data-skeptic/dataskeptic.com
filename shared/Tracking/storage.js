export const read = key => {
  let data = null
  try {
    data = JSON.parse(localStorage.getItem(key))
  } catch (err) {}
  return data
}

export const write = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value))

export const exists = key => !!read(key)
