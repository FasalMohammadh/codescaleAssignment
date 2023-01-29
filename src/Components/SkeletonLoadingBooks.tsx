import React from 'react';

const SkeletonLoadingBooks = () => (
  <div className='container mx-auto grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
    {Array(20)
      .fill('')
      .map((_x, index) => (
        <div
          className='aspect-[4/5] w-full bg-slate-200 rounded-lg animate-pulse'
          key={index}
        />
      ))}
  </div>
);

export default React.memo(SkeletonLoadingBooks);
