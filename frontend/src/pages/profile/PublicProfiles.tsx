import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

interface Props {
  albumsCount?: number;
}

const PublicProfiles: React.FC<Props> = () => {
  return (
    <>
      <h4>Verejné profily</h4>
      <Alert variant="info">Nemáte žiadny verejný profil.</Alert>
      <Button disabled>Vytvoriť nový</Button>
      <p><small>Funkcia zatiaľ nie je podporovaná.</small></p>
    </>
  );
};

export default PublicProfiles;
