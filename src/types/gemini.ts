import { ResponseSchema, SchemaType } from "@google/generative-ai";

// Not exhaustively tested, but should work for most cases
type InferSchemaType<T extends Record<string, ResponseSchema>> = {
  [K in keyof T]: T[K]["type"] extends SchemaType.STRING
    ? string
    : T[K]["type"] extends SchemaType.NUMBER | SchemaType.INTEGER
    ? number
    : T[K]["type"] extends SchemaType.BOOLEAN
    ? boolean
    : T[K]["type"] extends SchemaType.ARRAY
    ? T[K]["items"] extends ResponseSchema
      ? InferSchemaType<{ item: T[K]["items"] }>["item"][]
      : unknown[]
    : T[K]["type"] extends SchemaType.OBJECT
    ? T[K]["properties"] extends Record<string, ResponseSchema>
      ? InferSchemaType<T[K]["properties"]>
      : Record<string, unknown>
    : unknown;
};

export type SchemaProperties = Record<string, ResponseSchema>;

export type InferSchema<T extends SchemaProperties> = InferSchemaType<T>;
