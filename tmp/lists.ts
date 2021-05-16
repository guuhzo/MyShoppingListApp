

interface IList {
  id: string;
  name: string;
  isShared: boolean;
  quantityProducts: number;
  total: number;
}

const lists: IList[] = [
  {
    id: 'a',
    name: 'MY SHOPPING LIST - 20/04/2021',
    isShared: false,
    quantityProducts: 30,
    total: 478.00
  },
  {
    id: 'b',
    name: 'Grocery List',
    isShared: true,
    quantityProducts: 27,
    total: 345.00
  },
  {
    id: 'c',
    name: 'My Christmas List',
    isShared: true,
    quantityProducts: 9,
    total: 4000.00
  }, 
  {
    id: 'Da',
    name: 'MY SHOPPING LIST - 20/04/2021',
    isShared: false,
    quantityProducts: 30,
    total: 478.00
  },
  {
    id: 'ba',
    name: 'Grocery List',
    isShared: true,
    quantityProducts: 27,
    total: 345.00
  },
  {
    id: 'ca',
    name: 'My Christmas List',
    isShared: true,
    quantityProducts: 9,
    total: 4000.00
  }, 
      
]

export default lists