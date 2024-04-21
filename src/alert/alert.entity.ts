import { ApiProperty } from '@nestjs/swagger';

export class Alert {
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  quantity: string;

  @ApiProperty()
  datetime: string;
}
