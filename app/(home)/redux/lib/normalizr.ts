import { schema, normalize, NormalizedSchema } from "normalizr";

const entities = (key: string) => {
  return new schema.Entity(key);
};

export const normalizedData = <T>(data: T, key: string) => {
  return normalize(data, [entities(key)]);
};
