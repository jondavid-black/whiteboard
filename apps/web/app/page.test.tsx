import { render, screen } from '@testing-library/react';
import Home from './page';

describe('Landing Page', () => {
  it('renders the NavBar, SidePanel, and Canvas', () => {
    render(<Home />);
    // NavBar
    expect(screen.getByLabelText('Main Navigation')).toBeInTheDocument();
    // SidePanel hamburger button
    expect(screen.getByRole('button', { name: /side panel/i })).toBeInTheDocument();
    // Canvas
    expect(screen.getByLabelText('Infinite Canvas')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Home />);
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
  });
});
