import { Skeleton } from '@heroui/react';

export default function ProfileLoader() {
  return (
    <div className="flex flex-col items-center justify-center h-full mb-10">
      <Skeleton className="w-full h-full">
        <span className="text-center text-5xl font-bold">&nbsp;</span>
      </Skeleton>
    </div>
  );
}
