/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly FIREBASE_SERVICE_ACCOUNT: string;
  readonly FIREBASE_STORAGE_BUCKET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
} 