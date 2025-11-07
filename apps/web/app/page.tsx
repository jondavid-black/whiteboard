import Link from 'next/link';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Header from '../src/components/Header';

export default function Home() {
  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid>
            <h1
              style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 700, margin: '16px 0' }}
            >
              Welcome to the Whiteboard MVP
            </h1>
            <p style={{ textAlign: 'center', marginTop: 16, fontSize: '1.1rem' }}>
              This is the initial landing page for the Whiteboard web app. Enjoy exploring the MVP
              features!
            </p>
            <nav
              style={{
                textAlign: 'center',
                marginTop: 24,
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: 16,
              }}
            >
              <Link href="/" legacyBehavior>
                <a style={{ textDecoration: 'underline', color: '#1976d2', fontSize: '1rem' }}>
                  Home
                </a>
              </Link>
              <Link href="/about" legacyBehavior>
                <a style={{ textDecoration: 'underline', color: '#1976d2', fontSize: '1rem' }}>
                  About
                </a>
              </Link>
            </nav>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
