import React from 'react'

const AddContactLoading = () => {
  return (
    <div className="flex items-center justify-between p-2 rounded-md">
      <div className="flex items-center gap-3">
        {/* Skeleton Avatar */}
        <div className="w-8 h-8 rounded-full bg-gray-700 animate-pulse"></div>

        {/* Skeleton Text Lines */}
        <div className="flex flex-col gap-y-1.5">
          <div className="h-4 w-24 rounded bg-gray-700 animate-pulse"></div>
          <div className="h-3 w-20 rounded bg-gray-700 animate-pulse"></div>
        </div>
      </div>

      {/* Skeleton Button */}
      <div className="h-6 w-12 rounded-md bg-gray-700 animate-pulse"></div>
    </div>
  );
}

export default AddContactLoading