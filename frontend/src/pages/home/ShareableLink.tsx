import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

interface ShareableLinkProps {
  albumId: string;
}

const ShareableLink: React.FC<ShareableLinkProps> = ({ albumId }: ShareableLinkProps) => {
  const onCopyClick = () => {
    const el = document.createElement('textarea');
    el.value = `${window.location.protocol}//${window.location.host}/album/${albumId}`;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }

  return (
    <InputGroup>
      { albumId.length === 0 ? <Spinner animation="border" size="sm" style={{ position: 'absolute', zIndex: 9999, left: 10, top: 10 }} /> : null }
      <FormControl type="text" value={albumId.length === 0 ? '': `${window.location.protocol}//${window.location.host}/album/${albumId}`} readOnly />
      <InputGroup.Append>
        <Button variant="outline-secondary" onClick={onCopyClick}>Kopírovať</Button>
      </InputGroup.Append>
    </InputGroup>
  );
}

export default ShareableLink;
