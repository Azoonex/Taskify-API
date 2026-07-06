import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Todo } from "./Todo";
import { AddTodoInput } from "./TodoInput";

let todos: Todo[] = [
  { id: "1", title: "Learn TypeScript", completed: true },
  { id: "2", title: "Build GraphQL API", completed: false },
];

@Resolver()
export class TodoResolver {
  // example get todos
  // query {
  //   getTodos {
  //     id
  //     title
  //     completed
  //   }
  // }

  @Query(() => [Todo])
  async getTodos(): Promise<Todo[]> {
    return todos;
  }

  @Mutation(() => Todo)
  async addTodo(@Arg("data") data: AddTodoInput): Promise<Todo> {
    const newTodo: Todo = {
      id: String(todos.length + 1),
      title: data.title,
      completed: false,
    };
    todos.push(newTodo);
    return newTodo;
  }

  @Mutation(() => Todo, { nullable: true })
  async toggleTodo(@Arg("id") id: string): Promise<Todo | null> {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return null;

    todo.completed = !todo.completed;
    return todo;
  }
}
