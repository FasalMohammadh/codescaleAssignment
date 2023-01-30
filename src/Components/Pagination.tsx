import React from 'react';

import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';

import { PaginationActions, PaginationReducerAction } from '@/App';

interface PaginationProps {
  pageCount: number;
  selectedPage: number;

  setSelectedPage: React.Dispatch<PaginationReducerAction>;
}

const Pagination = ({
  pageCount,
  selectedPage,
  setSelectedPage,
}: PaginationProps) => {
  return (
    <ul className='flex bg-slate-100 rounded-lg mb-3 justify-center'>
      <li
        className='cursor-pointer aspect-square p-3 lg:p-4 flex items-center justify-center rounded-lg'
        onClick={() => setSelectedPage({ type: PaginationActions.FIRST })}
      >
        <FirstPageIcon />
      </li>
      <li
        className='cursor-pointer aspect-square p-3 lg:p-4 flex items-center justify-center rounded-lg'
        onClick={() => setSelectedPage({ type: PaginationActions.PREVIOUS })}
      >
        <NavigateBeforeIcon />
      </li>
      {Array(pageCount)
        .fill('mock')
        .map((_x, index) => {
          const pageNumber = index + 1;
          const isActive = selectedPage === pageNumber;
          const rangeStart = selectedPage - 2;
          const rangeEnd = selectedPage + 2;
          const isInRange = pageNumber < rangeEnd && pageNumber > rangeStart;
          return (
            <li
              className={`cursor-pointer aspect-square p-3 lg:p-4 flex items-center justify-center rounded-lg ${
                isActive ? 'bg-gray-900 text-white shadow-sm' : ''
              }${!isInRange ? 'hidden' : ''}`}
              key={pageNumber}
              onClick={() =>
                setSelectedPage({
                  type: PaginationActions.GOTO,
                  payload: pageNumber,
                })
              }
            >
              {pageNumber}
            </li>
          );
        })}
      <li
        className='cursor-pointer aspect-square p-3 lg:p-4 flex items-center justify-center rounded-lg'
        onClick={() => setSelectedPage({ type: PaginationActions.NEXT })}
      >
        <NavigateNextIcon />
      </li>
      <li
        className='cursor-pointer aspect-square p-3 lg:p-4 flex items-center justify-center rounded-lg'
        onClick={() => setSelectedPage({ type: PaginationActions.LAST })}
      >
        <LastPageIcon />
      </li>
    </ul>
  );
};

export default React.memo(Pagination);
