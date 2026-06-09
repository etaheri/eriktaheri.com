/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_POSTHOG_PROJECT_TOKEN: string;
  readonly PUBLIC_POSTHOG_HOST: string;
}

interface Window {
  posthog?: {
    capture: (event: string, properties?: Record<string, unknown>) => void;
    [key: string]: unknown;
  };
}
