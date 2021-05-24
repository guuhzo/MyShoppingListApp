export const ListSchema = {
  name: 'List',
  primaryKey: '_id',
  properties: {
    _id: 'objectId',
    name: 'string',
    isShared: 'boolean',
    products: { type: "list", objectType: "Product" },
    total: 'double'
  } 
} 

export const ProductSchema = {
  name: 'Product',
  primaryKey: '_id',
  properties: {
    _id: 'objectId',
    name: 'string',
    isShared: 'boolean',
    lastPrice: 'double'
  } 
} 