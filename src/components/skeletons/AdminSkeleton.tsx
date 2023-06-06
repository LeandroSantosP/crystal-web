import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const AdminSkeleton = () => (
  <div className="flex h-full flex-col  text-gray-800">
    <section className="flex h-40 w-full gap-3">
      <Skeleton
        className="z-0"
        baseColor="rgba(56, 56, 56, 0.39)"
        highlightColor="rgba(255, 255, 255, 0.39)"
        height={160}
        width={310}
      />
      <Skeleton
        className="z-0"
        baseColor="rgba(56, 56, 56, 0.39)"
        highlightColor="rgba(255, 255, 255, 0.39)"
        height={160}
        width={310}
      />
      <Skeleton
        className="z-0"
        baseColor="rgba(56, 56, 56, 0.39)"
        highlightColor="rgba(255, 255, 255, 0.39)"
        height={160}
        width={310}
      />
      <Skeleton
        className="z-0"
        baseColor="rgba(56, 56, 56, 0.39)"
        highlightColor="rgba(255, 255, 255, 0.39)"
        height={160}
        width={310}
      />
    </section>
    <section className="flex flex-1 items-center gap-3 text-gray-100">
      <Skeleton
        baseColor="rgba(56, 56, 56, 0.39)"
        highlightColor="rgba(255, 255, 255, 0.39)"
        height={410}
        width={1000}
      />
      <Skeleton
        className="2 z-0 h-full"
        baseColor="rgba(56, 56, 56, 0.39)"
        highlightColor="rgba(255, 255, 255, 0.39)"
        height={410}
        width={265}
      />
    </section>
  </div>
);
