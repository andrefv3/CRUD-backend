import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional, IsEmail } from "class-validator";
@InputType()
export class CreateUserDTO {
    
    @Field({nullable: false})
    @IsNotEmpty({ message: "El campo email no puede estar vacio." })
    public email: string;

    @Field({nullable: false})
    @IsNotEmpty({ message: "El campo names no puede estar vacio." })
    public names: string;

    @Field({nullable: false})
    @IsNotEmpty({ message: "El campo lastNames no puede estar vacio." })
    public lastNames: string;

    @Field({nullable: false})
    @IsNotEmpty({ message: "El campo password no puede estar vacio." })
    public password: string;

    @Field({nullable: true})
    public stateCode: number = 1;
}