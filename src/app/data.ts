interface Item {
   itemId: number;
   name: string;
}

interface Size {
   sizeId: number;
   name: string;
}

interface Price {
   itemId: number;
   sizeId: number;
   price: number;
}

let items: Item[] = [
   {
      itemId: 0,
      name: 'Margherita'
   },
   {
      itemId: 1,
      name: 'Pepperoni'
   },
   {
      itemId: 2,
      name: '4 Cheeses'
   },
];

let itemPrices: Price[] = [
   {
      itemId: 0,
      sizeId: 0,
      price: 3.99
   },
   {
      itemId: 0,
      sizeId: 1,
      price: 5.99
   },
   {
      itemId: 0,
      sizeId: 2,
      price: 7.99
   },
   {
      itemId: 1,
      sizeId: 0,
      price: 4.42
   },
   {
      itemId: 1,
      sizeId: 1,
      price: 6.52
   },
   {
      itemId: 1,
      sizeId: 2,
      price: 8.62
   },
   {
      itemId: 2,
      sizeId: 0,
      price: 8.62
   },
   {
      itemId: 2,
      sizeId: 1,
      price: 18.62
   },
   {
      itemId: 2,
      sizeId: 2,
      price: 28.62
   },
];

let itemSizes: Size[] = [
   {
      sizeId: 0,
      name: 'Small'
   },
   {
      sizeId: 1,
      name: 'Medium'
   },
   {
      sizeId: 2,
      name: 'Large'
   }
];

export {
   items,
   itemPrices,
   itemSizes,
   Price,
   Size,
   Item
}
