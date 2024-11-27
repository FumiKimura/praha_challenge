import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import FetchComponent from '../fetch-component';
import { http } from 'msw';

export default {
  title: 'Fetch Component',
  component: FetchComponent,
};

export const Primary = {
  decorators: [
    (Story) => (
      <QueryClientProvider queryClient={new QueryClient()}>
        <Story />
      </QueryClientProvider>
    ),
  ],
  parameters: {
    msw: [
      http.get(
        'https://api.github.com/repos/facebook/react',
        (req, res, ctx) => {
          return res('hello');
        }
      ),
    ],
  },
};
