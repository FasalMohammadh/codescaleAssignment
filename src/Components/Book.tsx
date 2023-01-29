import React from 'react';

import Button from '@/Components/Button';

interface BookProps {
  book_image: string;
  author: string;
  title: string;
  price: string;
  onClickViewMore: () => void;
}

const Book = (props: BookProps): JSX.Element => (
  <div className='group rounded-lg relative overflow-hidden'>
    <img
      src={props.book_image}
      alt='Book Cover'
      className='w-full aspect-[4/5] rounded-lg object-cover'
      loading='lazy'
      decoding='async'
    />
    <div className='flex flex-col transition-all absolute top-1/2 left-1/2 translate-x-full -translate-y-1/2 bg-slate-200 bg-opacity-80 w-full h-full p-6 backdrop-blur-[2px] group-hover:-translate-x-1/2 group-focus:-translate-x-1/2 '>
      <div className='grid grid-cols-[1fr_auto] gap-x-2 '>
        <span className='whitespace-nowrap'>Title</span>
        <span>{props.title}</span>

        <span className='whitespace-nowrap'>Written By</span>
        <span>{props.author}</span>

        <span className='whitespace-nowrap'>Price</span>
        <span>{props.price}</span>
      </div>
      <Button
        type='button'
        className='self-end mt-auto'
        onClick={props.onClickViewMore}
      >
        View More
      </Button>
    </div>
  </div>
);

export default React.memo(Book);
export type { BookProps };
