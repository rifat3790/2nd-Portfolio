import type { Config } from "@react-router/dev/config";

export default {
  // Disable SSR to build as a purely Static/SPA site for easy Netlify deployment
  ssr: false,
} satisfies Config;
