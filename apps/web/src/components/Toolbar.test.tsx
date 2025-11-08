it('supports arrow key navigation and focus', () => {
  const onSelect = vi.fn();
  const { getByRole } = render(<Toolbar activeTool="rectangle" onSelect={onSelect} />);
  const toolbar = getByRole('toolbar');
  // Focus toolbar and press ArrowRight
  toolbar.focus();
  fireEvent.keyDown(toolbar, { key: 'ArrowRight' });
  expect(onSelect).toHaveBeenCalledWith('circle');
  // Press ArrowLeft
  fireEvent.keyDown(toolbar, { key: 'ArrowLeft' });
  expect(onSelect).toHaveBeenCalledWith('hand');
  // Press Home
  fireEvent.keyDown(toolbar, { key: 'Home' });
  expect(onSelect).toHaveBeenCalledWith('rectangle');
  // Press End
  fireEvent.keyDown(toolbar, { key: 'End' });
  expect(onSelect).toHaveBeenCalledWith('hand');
});

it('has correct ARIA roles and attributes', () => {
  const { getByRole, getAllByRole } = render(
    <Toolbar activeTool="rectangle" onSelect={() => {}} />,
  );
  const toolbar = getByRole('toolbar');
  expect(toolbar).toHaveAttribute('aria-orientation', 'horizontal');
  const buttons = getAllByRole('button');
  expect(buttons.length).toBe(6);
  buttons.forEach((btn) => {
    expect(btn).toHaveAttribute('aria-label');
    expect(['true', 'false']).toContain(btn.getAttribute('aria-pressed'));
  });
});

import { render, fireEvent } from '@testing-library/react';
import Toolbar, { ToolKey } from './Toolbar';
import { vi } from 'vitest';

describe('Toolbar', () => {
  const toolLabels: Record<ToolKey, string> = {
    rectangle: 'Rectangle',
    circle: 'Circle',
    line: 'Line',
    text: 'Text',
    eraser: 'Eraser',
    hand: 'Pan/Zoom',
  };

  it('renders all tool buttons', () => {
    const { getByLabelText } = render(<Toolbar activeTool="rectangle" onSelect={() => {}} />);
    (Object.values(toolLabels) as string[]).forEach((label) => {
      expect(getByLabelText(new RegExp(label, 'i'))).toBeInTheDocument();
    });
  });

  it('highlights the active tool', () => {
    const { getByLabelText } = render(<Toolbar activeTool="circle" onSelect={() => {}} />);
    const circleBtn = getByLabelText(/circle/i);
    expect(circleBtn).toHaveAttribute('aria-label', 'Circle');
  });

  it('calls onSelect when a tool is clicked', () => {
    const onSelect = vi.fn();
    const { getByLabelText } = render(<Toolbar activeTool="rectangle" onSelect={onSelect} />);
    const textBtn = getByLabelText(/text/i);
    fireEvent.click(textBtn);
    expect(onSelect).toHaveBeenCalledWith('text');
  });
});
