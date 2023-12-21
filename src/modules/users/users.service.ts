import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UtilsService } from '../utils/Utils.service';
import { UserDTO } from './dto/userDTO';
import { encryptPassword } from '../helpers/encrypt.tool';
import { CreateUserDTO } from './dto/createUserDTO';
import { UpdateUserDTO } from './dto/updateUserDTO';

@Injectable()
export class UsersService extends UtilsService<UserDTO>{
    constructor(protected readonly prismaService : PrismaService){
        const prismaServiceImplements = prismaService;
        const module = 'users';
        super(prismaServiceImplements, module)
    }   

    //THIS METHOD CREATE ONE USER
    async createUser(data: CreateUserDTO): Promise<UserDTO> {
        try {
          const existsUser: UserDTO = await this.getByIds({ email: data.email });
    
          if (!existsUser) {
            const encryptPass = await encryptPassword(data.password, process.env.SECRETSTRING).toString();
            data.password = encryptPass;
            
            return await this.create(data);
          } else {
            throw new Error("El usuario " + data.email + " ya existe en la plataforma.");
          }
        } catch (error) {
          throw new BadRequestException(error.message);
        }
    }

    //THIS METHOD UPDATE INFORMATION USER
    async updateUser(data: UpdateUserDTO): Promise<UserDTO> {
        const { email, userCode } = data;//GET EMAIL AND USERCODE THE INFORMATION SET CLIENT
        delete data.email;//DELETE EMAIL THE INFORMATION SET CLIENT
        delete data.userCode;//DELETE USER CODE THE INFORMATION SET CLIENT

        try {
            const existsUser: UserDTO = await this.getByIds({ email, userCode });//FIND USER BY EMAIL AND USER CODE
            if (existsUser) {//VALIDATE IS EXISTS USERS
                return await this.update({ userCode_email: { email: email, userCode: userCode } }, data);// UPDATE INFORMATION SET CLIENT
            } else {
                throw new Error("El usuario " + email + ", " + userCode + " NO existe en la plataforma.");
            }
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    };
}
