import { Skeleton } from '@heroui/react';

export default function AlbumsLoader() {
  return (
    <div className="grid ggrid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
      {Array(8)
        .fill(undefined)
        .map((_, index) => (
          <Skeleton key={index} className="w-full h-full" style={{ height: 200 }} />
        ))}
    </div>
  );
}
