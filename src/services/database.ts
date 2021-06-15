import Realm from 'realm'

import {
  ProductSchema,
  ListSchema,
  PaymentMethodSchema
} from '../database/Schemas'

// export default () => (
//   Realm.open({
//     path: 'db',
//     schema: [
//       ProductSchema,
//       ListSchema
//     ],
//     schemaVersion: 6
//   })
// )
export default new Realm({
  path: 'db',
  schema: [
    ProductSchema,
    ListSchema,
    PaymentMethodSchema
  ],
  schemaVersion: 7
})