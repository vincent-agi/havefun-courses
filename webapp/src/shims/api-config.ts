/**
 * Shim web de `mobile/src/infrastructure/http/api-config.ts`.
 *
 * La webapp de démo tourne sur la même machine que le backend : on cible
 * toujours `localhost:3000`. Surchargeable via `VITE_API_BASE_URL`.
 */
export const API_BASE_URL: string =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000';
