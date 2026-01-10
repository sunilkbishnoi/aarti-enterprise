import { Skeleton } from '@/components/ui/skeleton';

interface ProductSkeletonProps {
  count?: number;
  compact?: boolean;
}

const ProductSkeleton = ({ count = 8, compact = false }: ProductSkeletonProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-card rounded-2xl overflow-hidden border border-border/50 animate-pulse"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          {/* Image Skeleton */}
          <div className="aspect-[4/3] bg-muted">
            <Skeleton className="w-full h-full" />
          </div>

          {/* Content Skeleton */}
          <div className={compact ? 'p-4' : 'p-5'}>
            {/* Title */}
            <Skeleton className="h-5 w-3/4 mb-3" />
            
            {/* Description (non-compact) */}
            {!compact && (
              <>
                <Skeleton className="h-3 w-full mb-1" />
                <Skeleton className="h-3 w-2/3 mb-4" />
              </>
            )}

            {/* Price */}
            <div className="flex items-end justify-between">
              <div>
                <Skeleton className="h-2 w-16 mb-1" />
                <Skeleton className="h-6 w-20" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductSkeleton;