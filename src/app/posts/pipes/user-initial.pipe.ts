import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'userInitial' })
export class UserInitialPipe implements PipeTransform {
  transform(name: string): string {
    return name.split(' ')[0].charAt(0) + ' ' + name.split(' ')[1].charAt(0);
  }
}
