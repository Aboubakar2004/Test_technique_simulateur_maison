const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export function getStoredToken() {
  return localStorage.getItem("auth_token");
}

export function setStoredToken(token) {
  if (token) {
    localStorage.setItem("auth_token", token);
  } else {
    localStorage.removeItem("auth_token");
  }
}

export async function apiRequest(
  path,
  { method = "GET", body, headers = {} } = {}
) {
  const token = getStoredToken();
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const contentType = response.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const data = isJson ? await response.json() : await response.text();
  if (!response.ok) {
    const message =
      isJson && data && data.message ? data.message : response.statusText;
    throw new Error(message || "Request failed");
  }
  return data;
}

export const authApi = {
  signup: (payload) =>
    apiRequest("/api/register", { method: "POST", body: payload }),
  login: (payload) =>
    apiRequest("/api/login", { method: "POST", body: payload }),
  me: () => apiRequest("/api/me"),
  logout: () => apiRequest("/api/logout", { method: "POST" }),
};

export default apiRequest;
