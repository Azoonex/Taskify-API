import { Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class UpdateBook {
  @Field()
  id!: string;

  @Field({ nullable: true })
  @Length(3, 50)
  title!: string;

  @Field({ nullable: true })
  @Length(3, 50)
  author?: string;
}
