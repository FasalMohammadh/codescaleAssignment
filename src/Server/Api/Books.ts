import axios from '@/Server/Axios';

interface GetBooksResponse {
  status: string;
  copyright: string;
  num_results: number;
  results: Results;
}

interface Results {
  bestsellers_date: string;
  published_date: string;
  published_date_description: string;
  previous_published_date: string;
  next_published_date: string;
  lists: List[];
}

interface List {
  list_id: number;
  list_name: string;
  list_name_encoded: string;
  display_name: string;
  updated: string;
  list_image?: unknown;
  list_image_width?: unknown;
  list_image_height?: unknown;
  books: Book[];
}

interface Book {
  age_group: string;
  amazon_product_url: string;
  article_chapter_link: string;
  author: string;
  book_image: string;
  book_image_width: number;
  book_image_height: number;
  book_review_link: string;
  book_uri: string;
  contributor: string;
  contributor_note: string;
  created_date: string;
  description: string;
  first_chapter_link: string;
  price: string;
  primary_isbn10: string;
  primary_isbn13: string;
  publisher: string;
  rank: number;
  rank_last_week: number;
  sunday_review_link: string;
  title: string;
  updated_date: string;
  weeks_on_list: number;
  buy_links: Buylink[];
}

interface Buylink {
  name: string;
  url: string;
}

interface BookToReturn {
  book_image: string;
  description: string;
  author: string;
  title: string;
  price: string;
  amazon_product_url: string | null;
  category: string;
  publisher: string;
  age_group: string;
  isbn: string;
  rank: number;
}

async function getBestSellingBooks() {
  return axios
    .get<GetBooksResponse>('lists/full-overview.json')
    .then(response =>
      response.data.results.lists.reduce((preVal, curVal) => {
        curVal.books.forEach(book => {
          const bookToReturn = {
            book_image: book.book_image,
            description: book.description,
            author: book.author,
            title: book.title,
            price: book.price,
            amazon_product_url:
              book.buy_links.find(link => link.name.toLowerCase() === 'amazon')
                ?.url ?? null,
            category: curVal.list_name,
            publisher: book.publisher,
            age_group: book.age_group,
            isbn: book.primary_isbn13,
            rank: book.rank,
          };
          preVal.push(bookToReturn);
        });
        return preVal;
      }, [] as Array<BookToReturn>)
    );
}

export { getBestSellingBooks };
