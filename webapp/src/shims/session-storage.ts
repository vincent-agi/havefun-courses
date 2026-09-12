/**
 * Shim web de `mobile/src/infrastructure/storage/session-storage.ts`.
 *
 * Démo sans authentification : le backend tourne avec `AUTH_DISABLED=1` et
 * traite chaque requête comme l'utilisateur de démonstration. On renvoie donc
 * toujours un jeton factice non vide pour que `SessionProvider` bascule
 * directement en état `signed-in` (l'écran de connexion n'est jamais monté).
 */
const DEMO_TOKEN = 'demo-local';

export const sessionStorage = {
  async getAccessToken(): Promise<string | null> {
    return DEMO_TOKEN;
  },

  async setAccessToken(_token: string): Promise<void> {
    /* no-op : pas de session persistée en démo */
  },

  async clear(): Promise<void> {
    /* no-op : impossible de se déconnecter en démo */
  },
};
