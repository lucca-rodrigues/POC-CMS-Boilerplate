export default interface IContractUseCases<T> {
  getAll(query?: T): Promise<T[]>;
  getOne(id: string): Promise<T>;
  create(data: Partial<T>): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
}

export interface IContractUserUseCases<T> extends IContractUseCases<T> {
  upload(file: Express.Multer.File): Promise<T[]>;
}
