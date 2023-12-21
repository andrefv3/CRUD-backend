import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export abstract class UtilsService<ModuleDTO> {

	constructor(
		private readonly prismaServiceImplements: PrismaService,
		private readonly module: string 
	) { }

	// This method is responsible for registering information according to the module filled in the constructor
	public async create(object: any): Promise<ModuleDTO> {
		try {
			console.log(object)
			const createObject: ModuleDTO = await this.prismaServiceImplements[this.module].create({
				data: object
			});

			if (createObject != null) {
				return createObject;
			} else {
				throw new Error("Unable to register information for the module: " + this.module);
			}
		} catch (error) {
			console.log(error)
			throw new BadRequestException(error.message);
		}
	}

	// This method is responsible for updating information according to the module filled in the constructor
	public async update(ids: any, object: any): Promise<ModuleDTO> {
		try {
			console.log(ids, object)
			const updateObject: ModuleDTO = await this.prismaServiceImplements[this.module].update({
				data: object,
				where: ids
			})
			if (updateObject != null) {
				return updateObject;
			} else {
				throw new Error("Unable to update information for the module: " + this.module);
			}
		} catch (error) {
			throw new BadRequestException(error.message);
		}
	}

	// This method is responsible for querying all records according to the module filled in the constructor
	public async getAll(): Promise<ModuleDTO[]> {
		try {

			const listObject: ModuleDTO[] = await this.prismaServiceImplements[this.module].findMany();

			if (listObject.length > 0) {
				return listObject;
			} else {
				return [];
			}

		} catch (error) {
			throw new BadRequestException(error.message);
		}
	}

	public async getAllWithFilters(where: any): Promise<ModuleDTO[]> {
		try {

			const listObject: ModuleDTO[] = await this.prismaServiceImplements[this.module].findMany({
				where,
				orderBy: {
					createdAt: 'desc'
				}
			});

			if (listObject.length > 0) {
				return listObject;
			} else {
				return [];
			}

		} catch (error) {
			throw new BadRequestException(error.message);
		}
	}

	// This method is responsible for querying records by the sent id according to the module filled in the constructor
	public async getByIds(ids: Object, include?: Object): Promise<ModuleDTO> {
		try {
			const object: ModuleDTO = await this.prismaServiceImplements[this.module].findFirst({
				where: ids, include
			});
			if (object != null) {
				return object;
			} else {
				return null;
			}

		} catch (error) {
			throw new BadRequestException(error.message);
		}
	}

	// This method is responsible for deleting the sent records
	public async deleteByIds(ids: Object): Promise<ModuleDTO> {
		try {
			const object: ModuleDTO = await this.prismaServiceImplements[this.module].delete({
				where: ids
			});
			if (object != null) {
				return object;
			} else {
				throw new Error("Could not delete the record: " + ids.toString());
			}

		} catch (error) {
			throw new BadRequestException("Could not delete the record: " + ids.toString());
		}
	}
}
