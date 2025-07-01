import React from "react";

const DashCommentsSkeleton = () => {
  return (
    <div>
      {/* Comment cards */}
      <div className="flex flex-col gap-5 mt-12">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-gray-200 dark:bg-primaryDark p-4 rounded border border-gray-300 dark:border-gray-200/20 animate-shimmer"
          >
            <div className="flex flex-col xl:flex-row justify-between items-start gap-3">
              <div className="w-full">
                <div className="bg-gray-300 dark:bg-primary/40 h-6 w-1/2 rounded mb-2" />
                <div className="bg-gray-300 dark:bg-primary/40 h-4 w-1/3 rounded mb-2" />
                <div className="bg-gray-200 dark:bg-primary/30 h-4 w-2/3 rounded mb-2" />
              </div>
              <div className="flex items-center gap-3 xl:w-[40%] shrink-0 mt-4">
                <div className="bg-gray-300 dark:bg-primary/40 w-16 aspect-[3/2] rounded mr-2" />
                <div className="bg-gray-300 dark:bg-primary/40 h-4 w-32 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashCommentsSkeleton; 