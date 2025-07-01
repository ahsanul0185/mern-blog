import React from "react";

const DashInsightsSkeleton = () => {
  return (
    <div>
      {/* Greeting */}
      <div>
        <div className="bg-gray-300 dark:bg-primary/40 h-10 w-1/2 rounded animate-shimmer mb-2" />
        <div className="bg-gray-200 dark:bg-primary/30 h-6 w-1/4 rounded animate-shimmer" />
      </div>

      {/* Top insights */}
      <div className="mt-10 flex flex-col lg:flex-row items-center gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="p-4 bg-gray-200 dark:bg-primaryDark rounded w-full dark:border border-gray-300 dark:border-gray-200/40"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="bg-gray-300 dark:bg-primary/40 h-4 w-24 rounded animate-shimmer mb-2" />
                <div className="bg-gray-300 dark:bg-primary/40 h-8 w-16 rounded animate-shimmer" />
              </div>
              <div className="bg-gray-300 dark:bg-primary/40 h-8 w-8 rounded-full animate-shimmer" />
            </div>
            <div className="mt-3 flex items-center gap-3 text-sm">
              <div className="bg-green-200 dark:bg-primary/30 h-4 w-16 rounded animate-shimmer" />
              <div className="bg-gray-200 dark:bg-primary/30 h-4 w-20 rounded animate-shimmer" />
            </div>
          </div>
        ))}
      </div>

      {/* Chart and recent posts/comments */}
      <div className="mt-6 flex flex-col lg:flex-row gap-6">
        {/* Donut Chart */}
        <div className="lg:w-[60%] shrink-0 bg-gray-200 dark:bg-primaryDark dark:border border-gray-300 dark:border-gray-200/40 p-4 rounded">
          <div className="bg-gray-300 dark:bg-primary/40 h-[400px] w-full rounded animate-shimmer" />
        </div>
        {/* Recent Posts/Comments */}
        <div className="grow bg-gray-200 dark:bg-primaryDark dark:border border-gray-300 dark:border-gray-200/40 p-4 rounded flex flex-col gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-300 dark:bg-primary/40 h-10 w-full rounded animate-shimmer" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashInsightsSkeleton; 