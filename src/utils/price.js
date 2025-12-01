

export function getDiscountAmount(discountedPrice, discountPercentage) {
  if (!discountPercentage) return '0.00'
  return (getOriginalPrice(discountedPrice, discountPercentage) - Number(discountedPrice)).toFixed(2)
}

export function calcDiscountedFromOriginal(originalPrice, discountPercentage) {
  if (!discountPercentage) return Number(originalPrice).toFixed(2)
  return (Number(originalPrice) * (1 - Number(discountPercentage) / 100)).toFixed(2)
}
export function getDiscountedPrice(price, discountPercentage, decimals = 2) {
  if (!price || !discountPercentage) return price.toFixed(decimals)
  const discounted = price - (price * discountPercentage) / 100
  return discounted.toFixed(decimals)
}
