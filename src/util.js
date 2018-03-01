export function clamp(n, min = 0, max = 1) {
  return n < min ? min : n > max ? max : n
}

export function isNumeric(value) {
  return value !== '' && value != null && /^\d*\.?\d*$/.test(String(value))
}

export function roundToDecimal(value, decimals) {
  const tenTo = Math.pow(10, decimals)

  return Math.round(value * tenTo) / tenTo
}
