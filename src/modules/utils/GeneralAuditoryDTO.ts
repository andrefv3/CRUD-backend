import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class GeneralAuditoryDTO {
    
    @Field({nullable: true})
    public createdAt: Date;

    @Field({nullable: true})
    public updatedAt: Date;
    
}
