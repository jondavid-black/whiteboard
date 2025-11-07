import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  it('renders the app name', () => {
    render(<Header />);
    const name = screen.getByText('Whiteboard');
    expect(name).toBeInTheDocument();
    expect(name).toHaveStyle('color: rgb(255, 255, 255)');
  });

  it('renders the logo with correct branding', () => {
    render(<Header />);
    const logo = screen.getByTestId('logo-placeholder');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('aria-label', 'Whiteboard logo');
    // Check SVG exists inside logo placeholder
    const svg = logo.querySelector('svg');
    expect(svg).toBeInTheDocument();
    // Check for circle and text in SVG
    expect(svg?.querySelector('circle')).toBeInTheDocument();
    expect(svg?.querySelector('text')).toBeInTheDocument();
  });
});
