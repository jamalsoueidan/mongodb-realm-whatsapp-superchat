/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FACEBOOK_ACCESS_TOKEN: string;
  readonly MODE: string;
  // Add more environment variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
