import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import { useParams } from 'react-router-dom';
import SEO from '../components/SEO';
import { getPublicProfiles } from '../api/services';

const PublicProfile: React.FC = () => {
  const params = useParams();
  const [ publicProfile, setPublicProfile ] = useState<PublicProfile | undefined>();
  const [ hasError, setHasError ] = useState(false);

  useEffect(() => {
    getPublicProfiles({ slug: params.id })
      .then((response) => setPublicProfile(response.data.publicProfiles.pop()))
      .catch(() => setHasError(true));
  }, []);

  return (
    <SEO title="" description="">
      <Container fluid="xl">
        {
          hasError ? (
            <Alert variant="danger">
              Tento album už nie je dostupný.
            </Alert>
          ) : null
        }
        {
          typeof publicProfile !== 'undefined' ? (
            <>
              <h1 className="text-center">{publicProfile.name}</h1>
              <p className="text-center lead">{publicProfile.description}</p>
            </>
          ) : null
        }
      </Container>
    </SEO>
  );
}

export default PublicProfile;
