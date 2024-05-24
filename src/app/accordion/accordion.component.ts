import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule, NgForOf} from "@angular/common";

@Component({
   selector: 'app-accordion',
   standalone: true,
   imports: [
      NgForOf,
      CommonModule
   ],
   templateUrl: './accordion.component.html',
   styleUrl: './accordion.component.scss'
})
export class AccordionComponent {

   @Input()
   public isOpen = false;

   @Input()
   public title = '';

   @Output()
   public onAccordionToggle = new EventEmitter();

}
