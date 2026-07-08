import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { CreateBookInput } from "./book.input";
import { Book } from "./book.type";
import { BookService } from "./book.service";
import { UpdateBook } from "./update.book";

@Resolver(() => Book)
export class BookResolver {
  private bookService = new BookService();

  @Query(() => [Book])
  getBook(): Book[] {
    return this.bookService.getBooks;
  }

  @Mutation(() => Book)
  addBook(@Arg("data") data: CreateBookInput) {
    return this.bookService.addBook(data);
  }

  @Mutation(() => Book, { nullable: true })
  updateBook(@Arg("data") data: UpdateBook): Book | null {
    return this.bookService.updateBook(data);
  }
}
