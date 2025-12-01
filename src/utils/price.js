export function getDiscountedPrice(price, discountPercentage, decimals = 2) {
  if (!price || !discountPercentage) return price.toFixed(decimals)
  const discounted = price - (price * discountPercentage) / 100
  return discounted.toFixed(decimals)
}
