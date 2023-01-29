import React from 'react';

interface BookData {
  title: string;
  author: string;
  description: string;
  price: string;
  publisher: string;
  age_group: string;
  amazon_product_url: string | null;
  book_image: string;
  category: string;
}

interface BookModalProps {
  open: boolean;
  onClose: () => void;
  bookData: BookData;
}

const BookModal = ({ open, onClose, bookData }: BookModalProps) => {
  if (!open) return null;

  const ageGroup = bookData.age_group || 'Not Available';
  const description = bookData.description || 'Not Available';
  const price =
    Number(bookData.price) > 0
      ? Intl.NumberFormat(undefined).format(Number(bookData.price))
      : 'Not Available';

  return (
    <div
      className='fixed top-0 left-0 h-screen w-screen max-h-screen bg-slate-300 bg-opacity-80 flex items-center justify-center backdrop-blur-sm'
      onClick={onClose}
    >
      <div
        className=' container mx-2 mt-10 bg-white p-5 rounded-lg grid grid-cols-1 ring-1 ring-slate-100 shadow-2xl gap-8 overflow-auto max-h-full lg:grid-cols-[1fr_2fr] lg:m-20'
        onClick={event => {
          event.stopPropagation();
        }}
      >
        <div
          role='button'
          title='close'
          className=' relative top-0 right-0 left-full lg:hidden'
          onClick={onClose}
        >
          <span className='relative rounded-full'>
            <div className='absolute w-[2px] h-5 rounded-full bg-black rotate-45'></div>
            <div className='absolute w-[2px] h-5 rounded-full bg-black -rotate-45'></div>
          </span>
        </div>

        <img
          src={bookData.book_image}
          alt='Book Cover'
          className='aspect-[2/3] rounded-lg object-cover w-full'
        />
        <div className='flex flex-col'>
          <div className='grid gap-x-10 h-fit gap-y-2 lg:grid-cols-[1fr_auto]'>
            <p className='text-xl'>Title</p>
            <p className='text-xl'>{bookData.title}</p>
            <p className='text-xl'>Label Name</p>
            <p className='text-xl'>{bookData.category}</p>
            <p className='text-xl'>Description</p>
            <p className='text-xl'>{description}</p>
            <p className='text-xl'>Author</p>
            <p className='text-xl'>{bookData.author}</p>
            <p className='text-xl'>Price</p>
            <p className='text-xl'>{price}</p>
            <p className='text-xl'>Publisher</p>
            <p className='text-xl'>{bookData.publisher}</p>
            <p className='text-xl'>Age Group</p>
            <p className='text-xl'>{ageGroup}</p>
          </div>
          {bookData.amazon_product_url && (
            <a
              href={bookData.amazon_product_url}
              target='_blank'
              rel='noopener noreferrer'
              className='mt-auto ml-auto rounded-lg py-1 px-6 ring-1 ring-black hover:bg-black hover:text-white transition-all self-end text-center'
            >
              Buy Now
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(BookModal);
export type { BookData };
