import Realm from 'realm'

import {
  ProductSchema,
  ListSchema
} from '../database/Schemas'

export default Realm.open({
  path: 'db',
  schema: [
    ProductSchema,
    ListSchema
  ]
})