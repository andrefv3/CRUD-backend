import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional } from "class-validator";

@InputType()
export class UpdateUserDTO{

    @Field( () => Int, { nullable: false })
    @IsNotEmpty({ message: "El campo code_user no puede estar vacio." })
    public userCode: number;

    @Field({nullable: false})
    @IsNotEmpty({message: "El campo email no puede estar vacio."})
    public email: string;

    @Field({nullable: true})
    public names: string;

    @Field({nullable: true})
    public lastNames: string;

    @Field({nullable: true})
    public password: string;

    @Field({nullable: true})
    @IsOptional()
    public stateCode: number;

}