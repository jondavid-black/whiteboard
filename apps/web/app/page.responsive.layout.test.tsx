import { render, screen } from '@testing-library/react';
import Home from './page';

describe('Landing Page Responsive Layout', () => {
  it('has accessible navigation for keyboard users', () => {
    render(<Home />);
    const navLinks = screen.getAllByRole('link');
    expect(navLinks.length).toBeGreaterThanOrEqual(2);
    navLinks.forEach((link) => {
      expect(link).toHaveAttribute('href');
      expect(link).toBeVisible();
    });
  });

  it('has accessible logo with aria-label', () => {
    render(<Home />);
    const logo = screen.getByLabelText(/logo/i);
    expect(logo).toBeInTheDocument();
  });
});
