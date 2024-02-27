/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASES_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
