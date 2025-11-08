import { render, screen, fireEvent } from '@testing-library/react';
import SidePanel from './SidePanel';

describe('SidePanel', () => {
  it('renders hamburger button on the left', () => {
    render(<SidePanel />);
    const btn = screen.getByRole('button', { name: /open side panel/i });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveStyle({ position: 'fixed', left: '24px' });
  });

  it('expands and collapses the side panel', () => {
    render(<SidePanel />);
    const btn = screen.getByRole('button', { name: /open side panel/i });
    fireEvent.click(btn);
    expect(screen.getByRole('heading', { name: /side panel/i })).toBeInTheDocument();
    // Overlay should be present
    expect(screen.getByLabelText('Close side panel overlay')).toBeInTheDocument();
    // Collapse by clicking overlay
    fireEvent.click(screen.getByLabelText('Close side panel overlay'));
    expect(screen.queryByRole('heading', { name: /side panel/i })).not.toBeInTheDocument();
  });
});
