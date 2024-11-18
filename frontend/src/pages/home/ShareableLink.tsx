import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

interface ShareableLinkProps {
  url: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => unknown;
}

const ShareableLink: React.FC<ShareableLinkProps> = ({ url, onClick }: ShareableLinkProps) => (
  <InputGroup>
    <FormControl type="text" value={url} readOnly />
    <Button variant="outline-secondary" onClick={onClick}>Kopírovať</Button>
  </InputGroup>
);

export default ShareableLink;
