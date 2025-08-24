import type { Config } from "@react-router/dev/config";

export default {
  ssr: false,
  prerender: [
    "/en",
    "/en/sign-up",
    "/en/sign-in",
  ]
} satisfies Config;
