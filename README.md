## Modular / Feature-based
````
# Class-Based GraphQL Project Structure

This document outlines a professional directory structure, file organization, and usage examples for building a **Class-based GraphQL API** using:

- TypeGraphQL
- Apollo Server
- TypeScript
- class-validator

---

# 1. Project Directory Structure

A clean, modular, and scalable **feature-based** architecture.

```text
src/
├── modules/
│   └── todo/
│       ├── todo.resolver.ts   # Queries & Mutations
│       ├── todo.type.ts       # GraphQL Object Types
│       └── todo.input.ts      # Input Types & Validation
├── schema.ts                  # Schema Builder
└── index.ts                   # Server Bootstrap
```

---

# 2. Code Implementation

## A. Output Types (`todo.type.ts`)

Defines the shape of the data returned to the client.

```ts
import { Field, ObjectType, ID } from "type-graphql";

@ObjectType({
  description: "Represents a single task in the Todo list",
})
export class Todo {
  @Field(() => ID)
  id!: string;

  @Field({
    description: "The title or description of the task",
  })
  title!: string;

  @Field({
    defaultValue: false,
  })
  completed!: boolean;
}
```

---

## B. Input Types (`todo.input.ts`)

Defines the parameters clients can send, including validation rules.

```ts
import { InputType, Field } from "type-graphql";
import { Length } from "class-validator";

@InputType()
export class AddTodoInput {
  @Field()
  @Length(3, 50, {
    message: "Title must be between 3 and 50 characters long",
  })
  title!: string;
}

@InputType()
export class UpdateTodoInput {
  @Field()
  id!: string;

  @Field({
    nullable: true,
  })
  @Length(3, 50, {
    message: "Title must be between 3 and 50 characters long",
  })
  title?: string;

  @Field({
    nullable: true,
  })
  completed?: boolean;
}
```

---

## C. Resolver (`todo.resolver.ts`)

Contains the business logic for GraphQL Queries and Mutations.

```ts
import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Todo } from "./todo.type";
import { AddTodoInput, UpdateTodoInput } from "./todo.input";

// Temporary in-memory database
let todos: Todo[] = [
  {
    id: "1",
    title: "Learn TypeScript",
    completed: true,
  },
  {
    id: "2",
    title: "Build Class-based GraphQL API",
    completed: false,
  },
];

@Resolver(() => Todo)
export class TodoResolver {
  // Query: Get all todos
  @Query(() => [Todo], {
    description: "Fetch a list of all todo items",
  })
  async getTodos(): Promise<Todo[]> {
    return todos;
  }

  // Query: Get one todo by ID
  @Query(() => Todo, {
    nullable: true,
    description: "Fetch a specific todo by ID",
  })
  async getTodoById(
    @Arg("id") id: string
  ): Promise<Todo | null> {
    const todo = todos.find((t) => t.id === id);
    return todo || null;
  }

  // Mutation: Create a todo
  @Mutation(() => Todo, {
    description: "Add a new todo item",
  })
  async addTodo(
    @Arg("data") data: AddTodoInput
  ): Promise<Todo> {
    const newTodo: Todo = {
      id: String(todos.length + 1),
      title: data.title,
      completed: false,
    };

    todos.push(newTodo);

    return newTodo;
  }

  // Mutation: Update a todo
  @Mutation(() => Todo, {
    nullable: true,
    description: "Update properties of an existing todo",
  })
  async updateTodo(
    @Arg("data") data: UpdateTodoInput
  ): Promise<Todo | null> {
    const todoIndex = todos.findIndex(
      (t) => t.id === data.id
    );

    if (todoIndex === -1) return null;

    const todo = todos[todoIndex];

    if (data.title !== undefined) {
      todo.title = data.title;
    }

    if (data.completed !== undefined) {
      todo.completed = data.completed;
    }

    todos[todoIndex] = todo;

    return todo;
  }

  // Mutation: Delete a todo
  @Mutation(() => Boolean, {
    description: "Remove a todo item by its ID",
  })
  async deleteTodo(
    @Arg("id") id: string
  ): Promise<boolean> {
    const todoIndex = todos.findIndex(
      (t) => t.id === id
    );

    if (todoIndex === -1) {
      return false;
    }

    todos.splice(todoIndex, 1);

    return true;
  }
}
```

---

## D. Schema Builder (`schema.ts`)

Centralizes GraphQL schema generation.

```ts
import { buildSchema } from "type-graphql";
import { TodoResolver } from "./modules/todo/todo.resolver";

export async function createSchema() {
  return buildSchema({
    resolvers: [TodoResolver],

    // Automatically enables class-validator
    validate: true,
  });
}
```

---

## E. Server Bootstrap (`index.ts`)

Starts the Apollo GraphQL server.

```ts
import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { createSchema } from "./schema";

async function bootstrap() {
  const schema = await createSchema();

  const server = new ApolloServer({
    schema,
  });

  const { url } = await server.listen(4000);

  console.log(`🚀 GraphQL Server running at ${url}`);
}

bootstrap().catch((err) => {
  console.error("❌ Failed to start server:", err);
});
```

---

# 3. GraphQL Operations

Open Apollo Sandbox:

```text
http://localhost:4000
```

---

## Fetch All Todos

```graphql
query GetAllTodos {
  getTodos {
    id
    title
    completed
  }
}
```

---

## Fetch One Todo

```graphql
query GetSingleTodo {
  getTodoById(id: "1") {
    id
    title
    completed
  }
}
```

---

## Create Todo

```graphql
mutation CreateTask {
  addTodo(
    data: {
      title: "Complete GraphQL Course"
    }
  ) {
    id
    title
    completed
  }
}
```

---

## Validation Error Example

The following mutation fails because the title contains fewer than **3** characters.

```graphql
mutation TriggerValidationError {
  addTodo(
    data: {
      title: "Go"
    }
  ) {
    id
    title
  }
}
```

---

## Update Todo

```graphql
mutation EditTask {
  updateTodo(
    data: {
      id: "2"
      title: "Class-Based API Complete"
      completed: true
    }
  ) {
    id
    title
    completed
  }
}
```

---

## Delete Todo

```graphql
mutation RemoveTask {
  deleteTodo(id: "1")
}
```

---

# Summary

This architecture provides:

- ✅ Feature-based folder organization
- ✅ Class-based schema definitions
- ✅ Strong TypeScript typing
- ✅ Automatic validation with `class-validator`
- ✅ Clean separation of:
  - Object Types
  - Input Types
  - Resolvers
  - Schema Builder
  - Server Bootstrap
- ✅ Easy scalability for large GraphQL applications
````
