import { render, screen } from '@testing-library/react';
import Home from './page';

describe('Landing Page Responsive Layout', () => {
  it('renders correctly on desktop', () => {
    window.innerWidth = 1200;
    render(<Home />);
    expect(screen.getByText('Welcome to the Whiteboard MVP')).toBeInTheDocument();
  });

  it('renders correctly on tablet', () => {
    window.innerWidth = 800;
    render(<Home />);
    expect(screen.getByText('Welcome to the Whiteboard MVP')).toBeInTheDocument();
  });

  it('renders correctly on mobile', () => {
    window.innerWidth = 400;
    render(<Home />);
    expect(screen.getByText('Welcome to the Whiteboard MVP')).toBeInTheDocument();
  });
});
