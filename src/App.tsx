import { useMemo, useReducer, useState } from 'react';

import { useQuery } from 'react-query';

import Book from '@/Components/Book';
import BookModal from '@/Components/BookModal';
import Pagination from '@/Components/Pagination';
import SkeletonLoadingBooks from '@/Components/SkeletonLoadingBooks';

import { getBestSellingBooks } from '@/Server/Api/Books';

import useModal, { ACTION } from '@/Utils/Hooks/useModal';

const BOOKS_PER_PAGE = 20;

function App() {
  const { isLoading, data: books } = useQuery(
    'bestSellingBooks',
    getBestSellingBooks
  );

  const pageCount = books ? Math.round(books.length / BOOKS_PER_PAGE) : 0;

  const [selectedBookIsbn, setSelectedBookIsbn] = useState<null | string>(null);
  const [selectedPage, setSelectedPage] = useReducer(reducer(pageCount), 1);

  const { isOpen, dispatch } = useModal();

  const booksToRender = useMemo(() => {
    const bookToShowEndingIndex = selectedPage * BOOKS_PER_PAGE;
    const bookToShowStartingIndex = bookToShowEndingIndex - BOOKS_PER_PAGE;
    return books?.slice(bookToShowStartingIndex, bookToShowEndingIndex);
  }, [books, selectedPage]);

  const selectedBook = useMemo(
    () => books?.find(book => book.isbn === selectedBookIsbn),
    [selectedBookIsbn]
  );

  return (
    <>
      <div className='container mx-auto px-10 mb-10'>
        <h1 className='text-2xl mb-4 md:text-4xl lg:text-6xl mt-10'>
          New York Times Best Selling Books
        </h1>

        {isLoading ? (
          <SkeletonLoadingBooks />
        ) : (
          <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {booksToRender?.map(bookProps => (
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
      <Pagination
        pageCount={pageCount}
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
      />
    </>
  );
}

enum PaginationActions {
  FIRST = 'FIRST',
  PREVIOUS = 'PREVIOUS',
  NEXT = 'NEXT',
  LAST = 'LAST',
  GOTO = 'GOTO',
}

type PaginationReducerAction =
  | {
      type: 'GOTO';
      payload: number;
    }
  | {
      type: 'FIRST' | 'PREVIOUS' | 'NEXT' | 'LAST';
    };

function reducer(pageCount: number) {
  return function (state: number, action: PaginationReducerAction) {
    switch (action.type) {
      case PaginationActions.FIRST:
        scrollToTop();
        return 1;
      case PaginationActions.NEXT:
        if (state < pageCount) {
          scrollToTop();
          return state + 1;
        }
        return state;
      case PaginationActions.PREVIOUS:
        if (state > 1) {
          scrollToTop();
          return state - 1;
        }
        return state;
      case PaginationActions.LAST:
        scrollToTop();
        return pageCount;
      case PaginationActions.GOTO:
        scrollToTop();
        return action.payload;
      default:
        return state;
    }
    function scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
}

export default App;
export { PaginationActions };
export type { PaginationReducerAction };
