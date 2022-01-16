import { IsIn, IsOptional } from 'class-validator';

function propertyTypes() {
  let properties = [];
  for (let i = 0; i <= 19; i++) {
    let type = `${i + 1}-bedroom`;
    properties.push(type);
  }
  return properties;
}

let properties: string[] = propertyTypes();

export class propertyTypeDto {
  @IsIn(properties)
  @IsOptional()
  type: string;
}
