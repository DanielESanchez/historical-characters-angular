import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[toUppercase]',
  standalone: true
})
export class UppercaseDirective {
  @HostListener('input', ['$event']) onInput(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.toUpperCase();
  }

}
