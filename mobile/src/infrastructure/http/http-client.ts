import { API_BASE_URL } from './api-config';
import { sessionStorage } from '../storage/session-storage';

export class ApiError extends Error {
  constructor(public readonly status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: unknown;
  authenticated?: boolean;
};

async function request<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { method = 'GET', body, authenticated = true } = options;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (authenticated) {
    const token = await sessionStorage.getAccessToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const payload = await response
      .json()
      .catch(() => ({ message: response.statusText }));
    throw new ApiError(
      response.status,
      payload.message ?? 'Erreur réseau inattendue.',
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export const httpClient = {
  get: <T>(path: string, authenticated = true) =>
    request<T>(path, { method: 'GET', authenticated }),
  post: <T>(path: string, body?: unknown, authenticated = true) =>
    request<T>(path, { method: 'POST', body, authenticated }),
  patch: <T>(path: string, body?: unknown, authenticated = true) =>
    request<T>(path, { method: 'PATCH', body, authenticated }),
};
