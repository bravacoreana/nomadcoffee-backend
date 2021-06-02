export const createSlug = (name) => {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s{2,}/gi, " ")
    .replaceAll(" ", "-");
};
