export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "http://0.0.0.0:3000"
    : "http://localhost:3000"
