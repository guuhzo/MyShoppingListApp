import { tableSchema } from '@nozbe/watermelondb';

const productSchema = tableSchema({
  name: 'products',
  columns: [
    {
      name: 'name',
      type: 'string',
    },
    {
      name: 'name',
      type: 'string',
    },
    {
      name: 'last_price',
      type: 'number',
    },
    {
      name: 'available',
      type: 'boolean',
    },
  ],
});

export default productSchema;
