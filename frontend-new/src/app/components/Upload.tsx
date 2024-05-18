"use client"

import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useDropzone } from 'react-dropzone';
import { useRouter } from 'next/navigation';
import { createAlbum, addMedia } from '../../api/services';
import useUpload from '../../utils/useUpload';

export default function Upload() {
  const router = useRouter();

  const {
    clear,
    onDrop: onUploadDrop,
  } = useUpload();

  const onDrop = async (acceptedFiles: File[]) => {
    const album = await createAlbum();
    
    onUploadDrop(acceptedFiles, async (media) => {
      await addMedia(album.id, media.id);
    });

    router.push(`/album/${album.hash}`);
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({ onDrop, accept: { 'image/*': [ '.jpg', '.jpeg', '.png', '.heic' ], 'video/*': [ '.mp4', '.mov' ] }, maxFiles: 50 });

  useEffect(() => {
    clear();
  }, []);

  return (
    <div {...getRootProps()} style={{ border: '1px #28a745 dashed', padding: '40px', borderRadius: '20px', textAlign: 'center', marginTop: 50 }}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Presuň sem fotky...</p> :
          <p style={{ marginBottom: 0 }}>Presuň sem fotky alebo ich vyber kliknutím</p>
      }
      <div style={{ marginTop: 20 }}>
        <Button variant="success">Nahrať fotky</Button>
      </div>
    </div>
  );
}
