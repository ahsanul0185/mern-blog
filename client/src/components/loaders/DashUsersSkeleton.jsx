import React from "react";

const DashUsersSkeleton = () => {
  return (
    <div>
      {/* Table skeleton */}
      <div className="relative overflow-x-auto rounded border border-gray-200 dark:border-gray-200/40 custom-scrollbar">
        <table className="w-full text-sm text-left rtl:text-right text-gray-600 dark:text-gray-200">
          <thead className="text-xs uppercase bg-primary text-white dark:bg-primary/40">
            <tr>
              {["Date Created", "User Profile", "Username", "Email", "Role", "Actions"].map((col) => (
                <th key={col} className="px-6 py-3">
                  <div className="h-4 w-16 bg-primary/60 rounded animate-shimmer" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map((i) => (
              <tr key={i} className="bg-white dark:bg-primaryDark border-b dark:border-gray-200/30 border-gray-200">
                <td className="px-6 py-4">
                  <div className="h-4 w-20 bg-gray-300 dark:bg-primary/40 rounded animate-shimmer" />
                </td>
                <td className="px-6 py-4">
                  <div className="size-9 md:size-12 rounded-full bg-gray-300 dark:bg-primary/40 animate-shimmer" />
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 w-24 bg-gray-300 dark:bg-primary/40 rounded animate-shimmer" />
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 w-32 bg-gray-300 dark:bg-primary/40 rounded animate-shimmer" />
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 w-16 bg-gray-300 dark:bg-primary/40 rounded animate-shimmer" />
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="h-4 w-8 bg-gray-300 dark:bg-primary/40 rounded animate-shimmer ml-auto" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashUsersSkeleton; 