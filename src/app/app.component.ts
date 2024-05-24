import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import * as DATA from './data';
import {CommonModule} from "@angular/common";
import {Item, Price, Size} from "./data";
import {AccordionComponent} from "./accordion/accordion.component";

@Component({
   selector: 'app-root',
   standalone: true,
   imports: [CommonModule, RouterOutlet, AccordionComponent],
   templateUrl: './app.component.html',
   styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
   public items: Item[] = DATA.items;
   public itemPrices: Price[] = DATA.itemPrices
   public itemSizes: Size[] = DATA.itemSizes

   public originalPrices: Price[] = JSON.parse(JSON.stringify(this.itemPrices));
   public changesMade: { [key: number]: boolean } = {};
   public openItemId: null | number = 0;

   public ngOnInit(): void {
      this.items.forEach(item => {
         this.changesMade[item.itemId] = false;
      });

      const savedPrices = localStorage.getItem('itemPrices');
      if (savedPrices) {
         this.itemPrices = JSON.parse(savedPrices);
      }
      this.originalPrices = JSON.parse(JSON.stringify(this.itemPrices));
   }

   public findPrices(item: any, size: any): any {
      return this.itemPrices.find(p => p.itemId === item.itemId && p.sizeId === size.sizeId)?.price;
   }

   public toggleSize(itemId: number, sizeId: number, checkedEvent: any): void {
      const price = this.itemPrices.find(p => p.itemId === itemId && p.sizeId === sizeId);

      if (price) {
         // @ts-ignore
         price.price = checkedEvent.target.checked ? this.originalPrices.find(p => p.itemId === itemId && p.sizeId === sizeId).price : 0.00;
         this.changesMade[itemId] = true;
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
   }

   public toggleCollapse(itemId: number): void {
      this.openItemId = this.openItemId === itemId ? null : itemId;
   }
}
