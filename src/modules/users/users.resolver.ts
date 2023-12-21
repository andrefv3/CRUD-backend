import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserDTO } from './dto/userDTO';
import { CreateUserDTO } from './dto/createUserDTO';
import { UpdateUserDTO } from './dto/updateUserDTO';

@Resolver()
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [UserDTO])
  getAllUsers(): Promise<UserDTO[]> {
    return this.usersService.getAll();
  }

  @Query(() => UserDTO)
  getUserById(
    @Args('userId', { type: () => Int }) userId: number
  ):Promise<UserDTO> {
    return this.usersService.getByIds({userId})
  }

  @Mutation(() => UserDTO)
  createUser(
    @Args('object') object: CreateUserDTO
  ): Promise<UserDTO> {
    return this.usersService.createUser(object);
  }

  @Mutation(() => UserDTO)
  updateUser(
    @Args('object') object: UpdateUserDTO
  ): Promise<UserDTO> {
    return this.usersService.updateUser(object);
  }

  @Mutation(() => UserDTO)
  deleteUser(
    @Args('object') object: UpdateUserDTO
  ): Promise<UserDTO> {
    object.stateCode = 2;//SET STATE CODE DELETE (2)
    return this.usersService.updateUser(object);
  }
}
