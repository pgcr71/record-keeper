import { getRepository, InsertResult, ObjectID, Repository } from "typeorm";
import { IRepository } from "./repository.interface";
import { InterestTypes } from "../entities/interest_types.entity";

export class InterestTypesRepository implements IRepository<InterestTypes> {
  public repository: Repository<InterestTypes> = getRepository(InterestTypes);

  public async all(): Promise<InterestTypes[]> {
    return this.repository.find();
  }

  public async one(params: InterestTypes): Promise<InterestTypes> {
    return this.repository.findOne(params.id) as Promise<InterestTypes>;
  }

  public async remove(params: { id: string | number | Date | ObjectID | undefined }): Promise<InterestTypes> {
    const InterestTypesToRemove = await this.repository.findOne(params.id);
    return ((await this.repository.remove(
      InterestTypesToRemove as InterestTypes,
    )) as unknown) as Promise<InterestTypes>;
  }

  public async save(InterestTypes: InterestTypes): Promise<InsertResult> {
    return this.repository.insert(InterestTypes);
  }
}
