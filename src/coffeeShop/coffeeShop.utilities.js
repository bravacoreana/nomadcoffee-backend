export const createSlug = (name) => {
  return name.trim().toLowerCase().replace(/\s+/g, "-");
};
