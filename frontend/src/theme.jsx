import { createSystem, defaultConfig } from "@chakra-ui/react";

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        mainColor: {
          50: "#e6f2ff",
          100: "#e6f2ff",
          200: "#bfdeff",
          300: "#99caff",
          950: "#001a33",
        },
      },
    },
  },
});
