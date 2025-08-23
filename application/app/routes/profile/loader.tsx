import { Skeleton, Divider } from '@heroui/react';

export default function Loader() {
  return (
    <>
      <Skeleton style={{ height: 64 }} />
      <Divider />
      <Skeleton style={{ height: 64 }} />
      <Divider />
      <Skeleton style={{ height: 64 }} />
      <Divider />
      <Skeleton style={{ height: 64 }} />
      <Divider />
      <Skeleton style={{ height: 64 }} />
      <Divider />
      <Skeleton style={{ height: 64 }} />
    </>
  );
}
