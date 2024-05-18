import type { Metadata } from 'next';
import Container from 'react-bootstrap/Container';
import Loader from './components/Loader';

export const metadata: Metadata = {
  title: "Album | Zdielaj.si",
  robots: {
    index: false,
  },
};

export default function Album() {
  return (
    <Container>
      <Loader />
    </Container>
  );
}
