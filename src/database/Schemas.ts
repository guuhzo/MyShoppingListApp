export const ListSchema = {
  name: 'List',
  primaryKey: '_id',
  properties: {
    _id: 'string',
    name: 'string',
    products: { type: "list", objectType: "Product" },
    budget: { type: "list", objectType: "PaymentMethod"},
    isFinished: 'bool',
    createdAt: 'date'
  } 
} 

export const ProductSchema = {
  name: 'Product',
  primaryKey: '_id',
  properties: {
    _id: 'string',
    name: 'string',
    lastPrice: 'double',
    createdAt: 'date'
  } 
} 

export const PaymentMethodSchema = {
  name: 'PaymentMethod',
  primaryKey: '_id',
  properties: {
    _id: 'string',
    type: 'string',
    value: 'double'
  }
}