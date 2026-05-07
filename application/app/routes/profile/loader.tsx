import { Skeleton, Separator } from '@heroui/react';

export default function Loader() {
  return (
    <>
      <Skeleton style={{ height: 64 }} />
      <Separator />
      <Skeleton style={{ height: 64 }} />
      <Separator />
      <Skeleton style={{ height: 64 }} />
      <Separator />
      <Skeleton style={{ height: 64 }} />
      <Separator />
      <Skeleton style={{ height: 64 }} />
      <Separator />
      <Skeleton style={{ height: 64 }} />
    </>
  );
}
