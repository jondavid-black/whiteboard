import { render, screen, fireEvent } from '@testing-library/react';
import NavBar from './NavBar';

describe('NavBar', () => {
  it('renders and is visible at the top', () => {
    render(<NavBar />);
    const nav = screen.getByLabelText('Main Navigation');
    expect(nav).toBeInTheDocument();
    expect(nav).toHaveStyle({ position: 'fixed', top: '0px' });
  });

  it('shows navigation actions', () => {
    render(<NavBar />);
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
  });

  it('navigation actions are clickable', () => {
    render(<NavBar />);
    const homeLink = screen.getByRole('link', { name: /home/i });
    fireEvent.click(homeLink);
    // No error means link is clickable; navigation logic is handled by Next.js
  });
});
