"use client"

import React, { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import { useParams } from 'next/navigation';
import Gallery from './Gallery';
import New from './New';
import { getAlbum } from '../../../../api/services';
import useUpload from '../../../../utils/useUpload';

export default function Loader() {
  const params = useParams();
  const { files } = useUpload();
  const [ album, setAlbum ] = useState<Album | undefined>();
  const [ hasError, setHasError ] = useState(false);

  useEffect(() => {
    if (files.length > 0) {
      return;
    }

    getAlbum(params.id as string)
      .then((album) => setAlbum(album))
      .catch(() => setHasError(true));
  }, [ params.id, files ]);

  if (hasError) {
    return (
      <Alert variant="danger">
        Tento album už nie je dostupný.
      </Alert>
    )
  }

  if (files.length > 0) {
    return <New />
  }

  if (typeof album === 'undefined') {
    return null;
  }

  return (
    <Gallery files={album.media} />
  );
}
