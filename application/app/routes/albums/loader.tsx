import { Skeleton } from '@heroui/react';

export default function AlbumsLoader() {  
  return (
    <div className="grid grid-cols-4 gap-4">
      {
        Array(8).fill(undefined).map((_, index) => (
          <Skeleton key={index} className="w-full h-full" style={{ height: 200 }} />
        ))
      }
    </div>
  );
}
