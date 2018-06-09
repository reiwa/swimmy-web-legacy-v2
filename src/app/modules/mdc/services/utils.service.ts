import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {
  toBool(value: string): boolean {
    return value === '' || Boolean(value);
  }
}
