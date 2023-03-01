import { IsString } from 'class-validator';

export class GetAuthLinkResponseDTO {
  @IsString()
  link: string;
}
