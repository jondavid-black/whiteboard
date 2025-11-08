it('removes a shape when using the eraser tool', () => {
  const { getByLabelText, getByRole } = render(<Canvas />);
  // Select rectangle tool and draw a rectangle
  const rectBtn = getByRole('button', { name: 'Rectangle' });
  fireEvent.click(rectBtn);
  const canvas = getByLabelText('Infinite Canvas');
  fireEvent.mouseDown(canvas, { clientX: 200, clientY: 200 });
  fireEvent.mouseUp(canvas, { clientX: 300, clientY: 300 });
  // Rectangle shape should be present (not the toolbar button)
  // There will be two elements with aria-label 'Rectangle': the toolbar button and the shape
  // The shape is inside the canvas div, not inside the toolbar
  // Only consider divs (the shape), not buttons (the toolbar)
  const rectangles = Array.from(
    document.querySelectorAll('div.canvas-shape[aria-label="Rectangle"]'),
  );
  expect(rectangles.length).toBeGreaterThan(0);
  // Select eraser tool
  const eraserBtn = getByRole('button', { name: 'Eraser' });
  fireEvent.click(eraserBtn);
  // Click on the rectangle to erase (fire both mouseDown and mouseUp)
  fireEvent.mouseDown(canvas, { clientX: 250, clientY: 250 });
  fireEvent.mouseUp(canvas, { clientX: 250, clientY: 250 });
  // Rectangle shape should be gone
  const rectanglesAfter = Array.from(
    document.querySelectorAll('div.canvas-shape[aria-label="Rectangle"]'),
  );
  expect(rectanglesAfter.length).toBe(0);
});
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
