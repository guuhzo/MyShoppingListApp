import { tableSchema } from '@nozbe/watermelondb'

const productSchema = tableSchema({
  name: 'products',
  columns: [
    {
      name: 'name',
      type: 'string'
    }
  ]
})

export default productSchema