import GalleryNew from './GalleryNew';

interface Props {
  getAlbum: () => Album;
}

const Album: React.FunctionComponent<Props> = ({ getAlbum }: Props) => {
  const album = getAlbum();

  return (
    <GalleryNew files={album.media} />
  );
}

export default Album;
