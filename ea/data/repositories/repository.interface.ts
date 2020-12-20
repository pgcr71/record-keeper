import { Product } from "electron/main";

export interface IRepository<T> {
  getAll(): Promise<T[]>;
  getOne(params: T): Promise<T[]>;
}
