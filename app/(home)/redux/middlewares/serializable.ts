import {
  createSerializableStateInvariantMiddleware,
  isPlain,
} from "@reduxjs/toolkit";
import { isImmutable } from "immutable";

const isSerializable = (value: any) => {
  return isImmutable(value) || isPlain(value);
};

const getEntries = (value: any) => {
  return isImmutable(value)
    ? (Array.from(value.entries()) as [string, any][])
    : Object.entries(value);
};

export const serializableMiddleware =
  createSerializableStateInvariantMiddleware({
    isSerializable,
    getEntries,
  });
