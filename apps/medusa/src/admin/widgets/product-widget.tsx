import { defineWidgetConfig } from '@medusajs/admin-sdk'

// The widget
const ProductWidget = () => (
  <span style={{ color: 'gray', fontSize: '12px' }}>👀</span>
)

// The widget's configurations
export const config = defineWidgetConfig({
  zone: 'order.list.after'
})

export default ProductWidget
