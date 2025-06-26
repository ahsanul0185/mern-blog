import React from "react";

const LoaderPost = () => {
  return (
    <div className="w-full h-full flex flex-col gap-5">

        <div className="flex flex-col h-full w-full gap-2">
          <div className="bg-gray-300 dark:bg-primary/20 h-8 w-2/3 rounded animate-pulse"></div>
          <div className="bg-gray-300 dark:bg-primary/20 h-5 w-1/2 rounded animate-pulse"></div>
        </div>
          <div className="bg-gray-300 dark:bg-primary/20 w-full aspect-[23/9] rounded animate-pulse"></div>

          <div className="flex flex-col gap-2">
            <div className="bg-gray-300 dark:bg-primary/20 w-1/2 h-6 rounded animate-pulse"></div>
          <div className="bg-gray-300 dark:bg-primary/20 w-full h-6  rounded animate-pulse"></div>
          <div className="bg-gray-300 dark:bg-primary/20 w-full h-6  rounded animate-pulse"></div>
          <div className="bg-gray-300 dark:bg-primary/20 w-full h-6  rounded animate-pulse"></div>
          <div className="bg-gray-300 dark:bg-primary/20 w-full h-6  rounded animate-pulse"></div>
          </div>

    </div>
  );
};

export default LoaderPost;
