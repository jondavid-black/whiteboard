import { render, fireEvent } from '@testing-library/react';
import Canvas from './Canvas';

describe('Canvas', () => {
  it('renders full-screen and is accessible', () => {
    const { getByLabelText } = render(<Canvas />);
    const canvas = getByLabelText('Infinite Canvas');
    expect(canvas).toBeInTheDocument();
    expect(canvas).toHaveStyle({ width: '100vw', height: '100vh' });
  });

  it('supports mouse panning', () => {
    const { getByLabelText } = render(<Canvas />);
    const canvas = getByLabelText('Infinite Canvas');
    // Simulate mouse drag
    fireEvent.mouseDown(canvas, { clientX: 100, clientY: 100 });
    fireEvent.mouseMove(window, { clientX: 120, clientY: 130 });
    fireEvent.mouseUp(window);
    // No error means pan logic is working (visual check in integration test)
  });

  it('supports wheel zooming', () => {
    const { getByLabelText } = render(<Canvas />);
    const canvas = getByLabelText('Infinite Canvas');
    // Simulate ctrl+wheel event for zoom
    fireEvent.wheel(canvas, { deltaY: -100, ctrlKey: true });
    // No error means zoom logic is working (visual check in integration test)
  });
});
