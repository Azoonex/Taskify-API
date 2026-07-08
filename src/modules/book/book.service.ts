import { CreateBookInput } from "./book.input";
import { Book } from "./book.type";
import { UpdateBook } from "./update.book";

const books: Book[] = [
  { author: "smit", title: "clean code", publisher: true, id: "1" },
];

export class BookService {
  get getBooks() {
    return books;
  }
  addBook(data: CreateBookInput) {
    const newBook: Book = {
      id: String(books.length + 1),
      title: data.title,
      author: data.author,
      publisher: false,
    };
    books.push(newBook);
    return newBook;
  }
  updateBook(data: UpdateBook) {
    const book = books.find((b) => b.id === data.id);
    if (!book) return null;
    if (!!data.title) book.title = data.title;
    if (!!data.author) book.author = data.author;

    return book;
  }
}
