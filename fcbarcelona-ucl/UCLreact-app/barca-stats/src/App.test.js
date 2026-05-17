import { render, screen } from '@testing-library/react';
import App from './App';

test('renders loading state', async () => {
  render(<App />);
  const loading = await screen.findByText(/loading data.../i);
  expect(loading).toBeInTheDocument();
});
