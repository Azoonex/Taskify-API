import { InputType, Field } from "type-graphql";
import { Length } from "class-validator";

@InputType()
export class AddTodoInput {
  @Field()
  @Length(3, 50, { message: "Title must be between 3 and 50 characters" })
  title!: string;
}
