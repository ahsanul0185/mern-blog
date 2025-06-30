import React from "react";

const LoaderAllBlogPage = () => {
  return (
    <div className="mt-14 grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-12 gap-y-10 ">
      {new Array(6).fill(0).map((_, idx) => (
        <div
          style={{ animationDelay: `${idx * 100}ms` }}
          key={idx}
          className="w-full flex flex-col gap-3 justify-between animate-pulse"
        >
          <div className="bg-gray-300 dark:bg-primary/30 rounded-2xl w-full aspect-square" />
          <div className="bg-gray-300 dark:bg-primary/30 rounded w-[20%] h-6" />
          <div className="bg-gray-300 dark:bg-primary/30 rounded w-full h-10" />

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 flex-1">
              <div className="bg-gray-300 dark:bg-primary/30  size-7 rounded-full" />
              <div className="bg-gray-300 dark:bg-primary/30 rounded w-[20%] h-5" />
            </div>
            <div className="bg-gray-300 dark:bg-primary/30 rounded  w-[10%] h-4" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoaderAllBlogPage;
