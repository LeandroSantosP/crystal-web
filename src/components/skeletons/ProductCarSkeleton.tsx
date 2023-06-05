import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const ProductCarSkeleton = () => {
  return (
    <Skeleton
      className="z-0"
      baseColor="rgba(56, 56, 56, 0.39)"
      highlightColor="rgba(255, 255, 255, 0.39)"
      height={200}
    />
  );
};
