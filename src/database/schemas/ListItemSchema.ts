import { tableSchema } from '@nozbe/watermelondb';

const listItemSchema = tableSchema({
  name: 'list_items',
  columns: [
    {
      name: 'product_id',
      type: 'string',
    },
    {
      name: 'list_id',
      type: 'string',
    },
    {
      name: 'price',
      type: 'number',
    },
    {
      name: 'quantity',
      type: 'number',
    },
  ],
});

export default listItemSchema;
