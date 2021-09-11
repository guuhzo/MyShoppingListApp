import { tableSchema } from '@nozbe/watermelondb'

const productListSchema = tableSchema({
  name: 'product_lists',
  columns: [
    {
      name: 'product_id',
      type: 'string'
    },
    {
      name: 'list_id',
      type: 'string'
    }
  ]
})

export default productListSchema