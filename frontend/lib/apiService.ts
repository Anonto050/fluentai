const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

if (!BASE_URL) {
  throw new Error("NEXT_PUBLIC_BACKEND_URL is not defined");
}

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  return response.json();
}
