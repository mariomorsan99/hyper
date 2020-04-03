import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'progress'
})

export class ProgressPipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer) { }

  transform(value: string): any {
    const uri = 'width:';
    return this.domSanitizer.bypassSecurityTrustStyle(uri + value + '%');
  }
}
