import { appSchema } from '@nozbe/watermelondb'

import listSchema from './ListSchema'
import productSchema from './ProductSchema'
import listItemSchema from './ListItemSchema'

export default appSchema({
  version: 5,
  tables: [
    listSchema,
    productSchema,
    listItemSchema
  ]
})