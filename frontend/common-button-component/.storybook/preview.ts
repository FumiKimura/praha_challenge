// Replace your-framework with the framework you are using (e.g., react, vue3)
import { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on.*" },
  },
};

export default preview;
