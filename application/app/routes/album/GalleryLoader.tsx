import { Skeleton } from '@heroui/react';

export default function GalleryLoader({ showFormLoader }: { showFormLoader?: boolean }) {
  return (
    <>
      {showFormLoader === true ? (
        <div className="mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
            <div>
              <Skeleton className="w-full" style={{ height: '2rem' }} />
              <Skeleton className="w-full mt-4" style={{ height: '6rem' }} />
            </div>
            <div>
              <Skeleton className="w-full" style={{ height: '2rem' }} />
              <Skeleton className="w-full mt-4" style={{ height: '2rem' }} />
              <Skeleton className="w-full mt-4" style={{ height: '2rem' }} />
              <Skeleton className="w-full mt-4" style={{ height: '2rem' }} />
              <Skeleton className="w-full mt-4" style={{ height: '2rem' }} />
            </div>
          </div>
          <div className="mt-4 flex justify-center w-full">
            <Skeleton style={{ height: '3rem', width: '8rem' }} />
            <Skeleton className="ms-2" style={{ height: '3rem', width: '8rem' }} />
          </div>
        </div>
      ) : null}
      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 gap-2">
        {Array(8)
          .fill(undefined)
          .map((_, index) => (
            <Skeleton key={index} className="w-full h-full" style={{ height: 200 }} />
          ))}
      </div>
    </>
  );
}
