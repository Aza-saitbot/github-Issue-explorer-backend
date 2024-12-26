import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from '../exeptions/validation.exception';


@Injectable()
export class ValidationPipe implements PipeTransform<any> {

  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    console.log('value',value)
    console.log('metadata',metadata)

    const obj = plainToClass(metadata.metatype, value);
    console.log('obj',obj)
    const errors = await validate(obj);
    console.log('errors',errors)
    if (errors.length) {
      const messages = errors.map((err) => {
        return `${err.property} - ${Object.values(err.constraints).join(', ')}`;
      });

      throw new ValidationException(messages);
    }
    return value;
  }
}