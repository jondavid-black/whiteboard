import { render, screen } from '@testing-library/react';
import Home from './page';

describe('Landing Page', () => {
  it('renders the MVP welcome message', () => {
    render(<Home />);
    expect(screen.getByText('Welcome to the Whiteboard MVP')).toBeInTheDocument();
    expect(screen.getByText(/initial landing page/i)).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Home />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });
});
