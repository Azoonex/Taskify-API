import { InputType, Field } from "type-graphql";
import { Length } from "class-validator";

@InputType()
export class CreateBookInput {
  @Field()
  @Length(2, 40, {
    message: "Title must be between 3 and 50 characters",
  })
  title!: string;

  @Field()
  @Length(3, 50)
  author!: string;
}
