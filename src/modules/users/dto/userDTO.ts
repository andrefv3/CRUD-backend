import { Field, Int, ObjectType } from "@nestjs/graphql";
import { GeneralAuditoryDTO } from "src/modules/utils/GeneralAuditoryDTO";

@ObjectType()
export class UserDTO extends GeneralAuditoryDTO {

    @Field( () => Int, { nullable: false })
    public userId: number;

    @Field({nullable: false})
    public email: string;

    @Field({nullable: false})
    public names: string;

    @Field({nullable: false})
    public lastNames: string;

    @Field({nullable: true})
    public password: string;

    @Field( () => Int, { nullable: false })
    public stateCode: number;

    @Field({nullable: true})
    public documentNumber?: string;

    @Field({nullable: true})
    public documentType?: string;

    @Field( () => Int, { nullable: true })
    public phone: number;

    @Field({nullable: true})
    public profilePicture?: string;
}
