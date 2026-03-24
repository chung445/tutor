export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";

export interface ApiError extends Error {
  status?: number;
  data?: any;
}

const buildHeaders = (customHeaders?: Record<string, string>) => ({
  "Content-Type": "application/json",
  Accept: "application/json",
  ...customHeaders,
});

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${path}`;

  const defaultOptions: RequestInit = {
    headers: buildHeaders((options.headers as Record<string, string>) || {}),
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);

    const contentType = response.headers.get("Content-Type") || "";
    const isJson = contentType.includes("application/json");
    const payload = isJson ? await response.json().catch(() => null) : null;

    if (!response.ok) {
      const err: ApiError = new Error(
        (payload && payload.message) || `API error ${response.status}`
      );
      err.status = response.status;
      err.data = payload;
      throw err;
    }

    return payload as T;
  } catch (error) {
    if (error instanceof Error && error.message.includes("Failed to fetch")) {
      const networkError: ApiError = new Error(
        "Lỗi kết nối mạng. Vui lòng kiểm tra kết nối internet và thử lại"
      );
      networkError.name = "NetworkError";
      throw networkError;
    }

    throw error;
  }
}
