export function clamp(n, min = 0, max = 1) {
  return n < min ? min : n > max ? max : n
}

export function isNumeric(value) {
  return value !== '' && value != null && /^\d*\.?\d*$/.test(String(value))
}

export function numDecimals(n) {
  const s = String(n)
  const i = s.indexOf('.')

  return i > -1 ? s.slice(i + 1).length : 0
}

export function roundToDecimal(value, decimals) {
  const tenTo = Math.pow(10, decimals)

  return Math.round(value * tenTo) / tenTo
}

export function scale(n, oldMin, oldMax, min = 0, max = 1) {
  return (n - oldMin) * (max - min) / (oldMax - oldMin) + min
}
