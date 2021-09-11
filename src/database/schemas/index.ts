import { appSchema } from '@nozbe/watermelondb'

import listSchema from './ListSchema'
import productSchema from './ProductSchema'
import productListSchema from './ProductListSchema'

export default appSchema({
  version: 2,
  tables: [
    listSchema,
    productSchema,
    productListSchema
  ]
})