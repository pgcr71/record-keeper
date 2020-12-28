import { InsertResult, SelectQueryBuilder } from "typeorm";

export interface IRepository<T> {
  all(): Promise<T[]> | Promise<SelectQueryBuilder<T>>;
  one(params?: unknown): Promise<T>;
  save(params?: unknown): Promise<InsertResult>;
  remove(params?: unknown): Promise<T>;
}
