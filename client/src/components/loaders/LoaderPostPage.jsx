import React from "react";

const LoaderPostPage = () => {
  return (
    <div className="default-padding pt-12 mx-auto w-full flex flex-col lg:flex-row items-start gap-6 relative">
      {/* Main content skeleton */}
      <div className="grow w-full">
        {/* Title */}
        <div className="bg-gray-300 dark:bg-primary/40 h-10 w-2/3 rounded animate-shimmer mb-4" />
        {/* Meta info */}
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-gray-200 dark:bg-primary/30 h-5 w-24 rounded animate-shimmer" />
          <div className="bg-gray-200 dark:bg-primary/30 h-5 w-20 rounded animate-shimmer" />
          <div className="bg-gray-200 dark:bg-primary/30 h-5 w-28 rounded animate-shimmer" />
        </div>
        {/* Cover image */}
        <div className="bg-gray-300 dark:bg-primary/40 w-full aspect-[23/9] rounded-md animate-shimmer mb-8" />
        {/* Content lines */}
        <div className="space-y-4 mb-8">
          {[1,2,3,4,5,6,7].map(i => (
            <div key={i} className={`bg-gray-200 dark:bg-primary/30 h-4 ${i%2===0 ? 'w-5/6' : 'w-full'} rounded animate-shimmer`} />
          ))}
        </div>
        {/* Tags */}
        <div className="flex gap-2 mb-8">
          {[1,2,3].map(i => (
            <div key={i} className="bg-primary/30 h-6 w-16 rounded animate-shimmer" />
          ))}
        </div>
        {/* Share section */}
        <div className="bg-gray-200 dark:bg-primary/30 h-10 w-1/2 rounded animate-shimmer mb-4" />
        <div className="flex gap-3">
          {[1,2].map(i => (
            <div key={i} className="bg-gray-300 dark:bg-primary/40 size-8 rounded-full animate-shimmer" />
          ))}
        </div>
      </div>
      {/* Recent posts sidebar skeleton */}
      <div className="lg:w-[29%] shrink-0 rounded sticky right-0 top-[90px] lg:px-5 mb-16 w-full">
        {/* Recent Posts title skeleton */}
        <div className="h-7 w-1/2 bg-gray-300 dark:bg-primary/40 rounded mb-4 animate-shimmer" />
        <div className="space-y-5">
          {[1,2,3,4].map(i => (
            <div key={i} className="flex gap-3 items-center bg-gray-200 dark:bg-primary/30 rounded p-3 animate-shimmer">
              <div className="w-20 h-16 rounded object-cover bg-gray-300 dark:bg-primary/40" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-3/4 bg-gray-300 dark:bg-primary/40 rounded" />
                <div className="h-3 w-1/2 bg-gray-200 dark:bg-primary/30 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoaderPostPage; 