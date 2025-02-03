import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

interface ShareableLinkProps {
  children: React.ReactNode;
  url: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => unknown;
}

const ShareableLink: React.FC<ShareableLinkProps> = ({ children, url }: ShareableLinkProps) => {
  const onCopyClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    navigator.clipboard.writeText(url);

    const innerHTML = (event.target as HTMLButtonElement).innerHTML;
    (event.target as HTMLButtonElement).innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#10003;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';

    setTimeout(() => {
      (event.target as HTMLButtonElement).innerHTML = innerHTML;
    }, 2000);
  };

  return (
    <InputGroup>
      <FormControl type="text" value={url} readOnly />
      <Button variant="outline-secondary" onClick={onCopyClick}>{children}</Button>
    </InputGroup>
  );
}

export default ShareableLink;
