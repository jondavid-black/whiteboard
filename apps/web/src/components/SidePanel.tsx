import React, { useState } from 'react';

/**
 * SidePanel: Expandable/collapsible panel on the left, triggered by hamburger button.
 */
const SidePanel: React.FC = () => {
  const [open, setOpen] = useState(false);

  // Keyboard shortcut: Ctrl+B toggles side panel
  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'b' || e.key === 'B')) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <>
      {/* Hamburger button (fixed, visibly distinct) */}
      <button
        aria-label={open ? 'Close side panel' : 'Open side panel'}
        onClick={() => setOpen((v) => !v)}
        style={{
          position: 'fixed',
          top: 72, // 56px NavBar + 16px margin
          left: 24,
          zIndex: 200,
          width: 40,
          height: 40,
          borderRadius: 20,
          background: '#fff',
          border: '1px solid #e0e0e0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setOpen((v) => !v);
          }
        }}
        title="Toggle side panel (Ctrl+B)"
      >
        <span style={{ fontSize: 24, fontWeight: 700 }}>&#9776;</span>
      </button>
      {/* Side panel */}
      <aside
        style={{
          position: 'fixed',
          top: 56, // below NavBar
          left: open ? 0 : -280,
          width: 280,
          height: 'calc(100vh - 56px)',
          background: '#f4f4f8',
          boxShadow: open ? '2px 0 8px rgba(0,0,0,0.08)' : 'none',
          transition: 'left 0.3s cubic-bezier(.4,0,.2,1)',
          zIndex: 150,
          padding: 24,
          display: 'flex',
          flexDirection: 'column',
        }}
        aria-hidden={!open}
      >
        <h2 style={{ margin: 0, marginBottom: 16 }}>Side Panel</h2>
        {/* Future: Add tools/settings here */}
      </aside>
      {/* Overlay for closing panel by clicking outside */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.05)',
            zIndex: 100,
          }}
          aria-label="Close side panel overlay"
        />
      )}
    </>
  );
};

export default SidePanel;
