import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import * as DATA from './data';
import {CommonModule} from "@angular/common";
import {Item, Price, Size} from "./data";
import {AccordionComponent} from "./accordion/accordion.component";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
   selector: 'app-root',
   standalone: true,
   imports: [CommonModule, RouterOutlet, AccordionComponent],
   templateUrl: './app.component.html',
   styleUrl: './app.component.scss',
   animations: [
      trigger('accordionState', [
         state('collapsed', style({
            height: '0',
            overflow: 'hidden',
            marginTop: 0
         })),
         state('expanded', style({
            height: '*',
            overflow: 'auto'
         })),
         transition('collapsed <=> expanded', [
            animate('200ms ease')
         ])
      ])
   ]
})
export class AppComponent implements OnInit {
   public items: Item[] = DATA.items;
   public itemPrices: Price[] = DATA.itemPrices
   public itemSizes: Size[] = DATA.itemSizes

   public originalPrices: Price[] = JSON.parse(JSON.stringify(this.itemPrices));
   public changesMade: { [key: number]: boolean } = {};
   public openItemId: null | number = 0;
   public checkboxStates: { [key: number]: { [key: number]: boolean } } = {};

   public ngOnInit(): void {
      this.items.forEach(item => {
         this.changesMade[item.itemId] = false;
      });

      const savedPrices = localStorage.getItem('itemPrices');
      if (savedPrices) {
         this.itemPrices = JSON.parse(savedPrices);
      }

      const savedCheckboxStates = localStorage.getItem('checkboxStates');
      if (savedCheckboxStates) {
         this.checkboxStates = JSON.parse(savedCheckboxStates);
      } else {
         this.initializeCheckboxStates();
      }

      this.originalPrices = JSON.parse(JSON.stringify(this.itemPrices));
   }

   public initializeCheckboxStates(): void {
      this.items.forEach(item => {
         this.checkboxStates[item.itemId] = {};
         this.itemSizes.forEach(size => {
            const price = this.itemPrices.find(p => p.itemId === item.itemId && p.sizeId === size.sizeId);
            // @ts-ignore
            this.checkboxStates[item.itemId][size.sizeId] = price && price.price !== 0;
         });
      });
      localStorage.setItem('checkboxStates', JSON.stringify(this.checkboxStates));
   }

   public findPrices(item: any, size: any): any {
      return this.itemPrices.find(p => p.itemId === item.itemId && p.sizeId === size.sizeId)?.price;
   }

   public toggleSize(itemId: number, sizeId: number, checkedEvent: any): void {
      const price = this.itemPrices.find(p => p.itemId === itemId && p.sizeId === sizeId);
      const originalPrice = this.originalPrices.find(p => p.itemId === itemId && p.sizeId === sizeId);
      if (price && originalPrice) {
         price.price = checkedEvent.target.checked ? originalPrice.price : 0.00;
         this.checkboxStates[itemId][sizeId] = checkedEvent.target.checked;
         this.changesMade[itemId] = true;
         localStorage.setItem('itemPrices', JSON.stringify(this.itemPrices));
         localStorage.setItem('checkboxStates', JSON.stringify(this.checkboxStates));
      }
   }

   public updatePrice(itemId: number, sizeId: number, newPriceEvent: any): void {
      const price = this.itemPrices.find(p => p.itemId === itemId && p.sizeId === sizeId);

      if (price) {
         price.price = newPriceEvent.target.value;
         this.changesMade[itemId] = true;
         localStorage.setItem('itemPrices', JSON.stringify(this.itemPrices));
      }
   }

   public undoChanges(itemId: number): void {
      this.itemPrices = JSON.parse(JSON.stringify(this.originalPrices));
      this.changesMade[itemId] = false;
      localStorage.setItem('itemPrices', JSON.stringify(this.itemPrices));
      this.initializeCheckboxStates();
   }

   public toggleCollapse(itemId: number): void {
      this.openItemId = this.openItemId === itemId ? null : itemId;
   }
}
