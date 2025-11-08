import React from 'react';
import Link from 'next/link';

/**
 * NavBar: Standard navigation bar spanning the top of the page.
 * - Contains navigation actions (placeholder)
 */
const NavBar: React.FC = () => {
  return (
    <nav
      style={{
        width: '100vw',
        height: 56,
        background: '#fff',
        borderBottom: '1px solid #e0e0e0',
        display: 'flex',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 100,
        boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
      }}
      aria-label="Main Navigation"
    >
      <span aria-label="Logo" style={{ marginLeft: 24, fontWeight: 600, fontSize: 18 }}>
        Whiteboard
      </span>
      <nav aria-label="Site Navigation" style={{ marginLeft: 40, display: 'flex', gap: 24 }}>
        <Link href="/" legacyBehavior>
          <a
            style={{
              background: 'none',
              border: 'none',
              fontSize: 16,
              cursor: 'pointer',
              color: '#333',
              padding: 0,
              textDecoration: 'underline',
            }}
          >
            Home
          </a>
        </Link>
        <Link href="/about" legacyBehavior>
          <a
            style={{
              background: 'none',
              border: 'none',
              fontSize: 16,
              cursor: 'pointer',
              color: '#333',
              padding: 0,
              textDecoration: 'underline',
            }}
          >
            About
          </a>
        </Link>
      </nav>
    </nav>
  );
};

export default NavBar;
