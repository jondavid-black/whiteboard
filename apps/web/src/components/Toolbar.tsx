import React from 'react';
import { Box, Paper, IconButton, Tooltip } from '@mui/material';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import PanToolIcon from '@mui/icons-material/PanTool';
import AutoFixOffIcon from '@mui/icons-material/AutoFixOff';

const tools = [
  { key: 'hand', icon: <PanToolIcon />, label: 'Pan/Zoom' },
  { key: 'rectangle', icon: <CropSquareIcon />, label: 'Rectangle' },
  { key: 'circle', icon: <RadioButtonUncheckedIcon />, label: 'Circle' },
  { key: 'line', icon: <ShowChartIcon />, label: 'Line' },
  { key: 'text', icon: <TextFieldsIcon />, label: 'Text' },
  { key: 'eraser', icon: <AutoFixOffIcon />, label: 'Eraser' },
];

export type ToolKey = (typeof tools)[number]['key'];

export interface ToolbarProps {
  activeTool: ToolKey;
  onSelect: (tool: ToolKey) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ activeTool, onSelect }) => {
  // For keyboard navigation
  const buttonRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  // Focus the active tool when toolbar mounts or activeTool changes
  React.useEffect(() => {
    const idx = tools.findIndex((t) => t.key === activeTool);
    if (idx >= 0 && buttonRefs.current[idx]) {
      buttonRefs.current[idx]?.focus();
    }
  }, [activeTool]);

  // Handle arrow key navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const idx = tools.findIndex((t) => t.key === activeTool);
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const next = (idx + 1) % tools.length;
      onSelect(tools[next].key as ToolKey);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = (idx - 1 + tools.length) % tools.length;
      onSelect(tools[prev].key as ToolKey);
    } else if (e.key === 'Home') {
      e.preventDefault();
      onSelect(tools[0].key as ToolKey);
    } else if (e.key === 'End') {
      e.preventDefault();
      onSelect(tools[tools.length - 1].key as ToolKey);
    } else if (e.key === ' ' || e.key === 'Enter') {
      // Activate selected tool
      e.preventDefault();
      if (idx >= 0) {
        buttonRefs.current[idx]?.click();
      }
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        left: '50%',
        bottom: 32,
        transform: 'translateX(-50%)',
        zIndex: 1000,
        pointerEvents: 'auto',
      }}
      aria-label="Floating Toolbar"
    >
      <Paper
        elevation={6}
        sx={{
          display: 'flex',
          borderRadius: 32,
          px: 2,
          py: 1,
          bgcolor: 'background.paper',
          boxShadow: 4,
        }}
        role="toolbar"
        tabIndex={0}
        aria-orientation="horizontal"
        onKeyDown={handleKeyDown}
      >
        {tools.map((tool, i) => (
          <Tooltip title={tool.label} key={tool.key}>
            <IconButton
              color={activeTool === tool.key ? 'primary' : 'default'}
              aria-label={tool.label}
              aria-pressed={activeTool === tool.key}
              tabIndex={activeTool === tool.key ? 0 : -1}
              ref={(el) => {
                buttonRefs.current[i] = el;
              }}
              onClick={() => onSelect(tool.key as ToolKey)}
              sx={{ mx: 1, outline: activeTool === tool.key ? '2px solid #1976d2' : undefined }}
              role="button"
            >
              {tool.icon}
            </IconButton>
          </Tooltip>
        ))}
      </Paper>
    </Box>
  );
};

export default Toolbar;
