import { IsString, IsNotEmpty } from "class-validator";

export class CreateStoreDto {
  @IsString()
  @IsNotEmpty()
  storeName: string;
}
