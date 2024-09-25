const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

if (!BASE_URL) {
  throw new Error("NEXT_PUBLIC_BACKEND_URL is not defined");
}

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    });

    // Custom handling for 400 errors
    if (response.status === 400) {
      console.warn(`400 Bad Request error on ${endpoint}`);
      return null; // or return a specific value, like a fallback object
    }

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }

    return response.json();
  } catch (error) {
    const err = error as Error;
    console.error(`Error in apiFetch: ${err.message}`);
    throw error; // Re-throw the error so it can be handled by the caller
  }
}
