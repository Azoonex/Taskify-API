import { CreateBookInput } from "./book.input";
import { Book } from "./book.type";
import { UpdateBook } from "./update.book";

const book: Book[] = [
  { author: "smit", title: "clean code", publisher: true, id: "1" },
];

export class BookService {
  get getBooks() {
    return book;
  }
  addBook()
}
