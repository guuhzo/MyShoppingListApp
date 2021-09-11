import { Model } from '@nozbe/watermelondb'
import { field, immutableRelation } from '@nozbe/watermelondb/decorators'

class ProductList extends Model {
  static table = 'product_lists'
  static associations = {
    lists: { type: 'belongs_to', key: 'list_id' },
    products: { type: 'belongs_to', key: 'product_id' }
  }

  @immutableRelation('lists', 'list_id') list
  @immutableRelation('products', 'product_id') product
}

export default ProductList