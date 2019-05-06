export default {
  stores: '/stores',

  lifestyles: '/lifestyles',
  productTypes: `/stores/{storeId}/productTypes`,
  subtypes: `/productTypes/{productTypeId}/subtypes`,

  product: {
    all: '/admin/products',
    toggleFeatured: '/admin/products/{productId}/featuredProducts',
    pushNotification: '/admin/products/{productId}/notifications',
  },
}