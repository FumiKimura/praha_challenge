/** @type { import('@storybook/react').Preview } */
import { QueryClient, ReactQueryCacheProvider } from '@tanstack/react-query';
import { initialize, mswLoader } from 'msw-storybook-addon';

// Initialize MSW
initialize();
const queryCache = new QueryClient();

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    loaders: [mswLoader],
  },
};

export default preview;
