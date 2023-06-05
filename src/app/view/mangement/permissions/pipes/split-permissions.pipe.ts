import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitPermissions'
})
export class SplitPermissionsPipe implements PipeTransform {

  transform(value: string, args: number): string {
    let item = value.split('.');
    return item[args]
  }

}
