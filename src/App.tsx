import { useMemo, useState } from 'react';

import { useQuery } from 'react-query';

import Book from '@/Components/Book';
import BookModal from '@/Components/BookModal';
import SkeletonLoadingBooks from '@/Components/SkeletonLoadingBooks';

import { getBestSellingBooks } from '@/Server/Api/Books';

import useModal, { ACTION } from '@/Utils/Hooks/useModal';

function App() {
  const { isLoading, data: books } = useQuery(
    'bestSellingBooks',
    getBestSellingBooks
  );

  const { isOpen, dispatch } = useModal();
  const [selectedBookIsbn, setSelectedBookIsbn] = useState<null | string>(null);

  const selectedBook = useMemo(
    () => books?.find(book => book.isbn === selectedBookIsbn),
    [selectedBookIsbn]
  );

  return (
    <>
      <div className='container mx-auto px-10 my-10'>
        <h1 className='text-2xl mb-4 md:text-4xl lg:text-6xl'>
          New York Times Best Selling Books
        </h1>

        {isLoading ? (
          <SkeletonLoadingBooks />
        ) : (
          <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {books?.map(bookProps => (
              <Book
                key={bookProps.isbn}
                onClickViewMore={() => {
                  setSelectedBookIsbn(bookProps.isbn);
                  dispatch({ type: ACTION.OPEN });
                }}
                {...bookProps}
              />
            ))}
          </div>
        )}
      </div>
      <BookModal
        open={isOpen}
        onClose={() => dispatch({ type: ACTION.CLOSE })}
        bookData={selectedBook!}
      />
    </>
  );
}

export default App;
