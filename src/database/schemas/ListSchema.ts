import { tableSchema } from '@nozbe/watermelondb'

const listSchema = tableSchema({
  name: 'lists',
  columns: [
    {
      name: 'name',
      type: 'string'
    },
    {
      name: 'cash',
      type: 'number'
    },
    {
      name: 'quantity',
      type: 'number'
    },
    {
      name: 'card',
      type: 'string'
    },
    {
      name: 'done',
      type: 'boolean'
    },
  ]
})

export default listSchema