import { useEffect, useRef, useState } from 'react'

type Props = {
  value: number
  min?: number
  max?: number
  step?: number
  sensitivity?: number
  onChange: (value: number) => void
}

function numberOfDecimals(step: number) {
  const x = step.toString()
  if (x.indexOf('.') > -1) {
    return x.length - x.indexOf('.') - 1
  }
  return 0
}

/**
 * NumberBox component that allows dragging to change values
 *
 * - Normal mode (no shift): The entire range (min to max) is mapped to the
 *   screen height
 * - Shift mode: Values change exactly by the step amount for finer control
 */
export default function NumberBox({
  value,
  min = 0,
  max = 100,
  step = 1,
  sensitivity = 200,
  onChange,
  ...rest
}: Props) {
  const internalValue = useRef(value)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const prevY = useRef(0)
  const [shiftHeld, setShiftHeld] = useState(false)
  const precision = numberOfDecimals(step)

  useEffect(() => {
    internalValue.current = value
  }, [value])

  useEffect(() => {
    function onKeydown(e: KeyboardEvent) {
      if (e.key === 'Shift') {
        setShiftHeld(true)
      }
    }

    function onKeyup(e: KeyboardEvent) {
      if (e.key === 'Shift') {
        setShiftHeld(false)
      }
    }

    window.addEventListener('keydown', onKeydown)
    window.addEventListener('keyup', onKeyup)

    return () => {
      window.removeEventListener('keydown', onKeydown)
      window.removeEventListener('keyup', onKeyup)
    }
  }, [])

  function applyDelta(clientY: number) {
    const pixelDelta = prevY.current - clientY

    let newValue: number

    if (shiftHeld) {
      const direction = pixelDelta > 0 ? 1 : pixelDelta < 0 ? -1 : 0
      newValue =
        direction !== 0
          ? internalValue.current + step * direction
          : internalValue.current
    } else {
      const valuePerPixel = (max - min) / sensitivity
      const rawChange = pixelDelta * valuePerPixel
      newValue = internalValue.current + rawChange
    }

    const boundedValue = Math.min(max, Math.max(min, newValue))

    const finalValue = shiftHeld
      ? boundedValue
      : Math.round((boundedValue - min) / step) * step + min

    if (finalValue !== internalValue.current) {
      internalValue.current = finalValue
      onChange(finalValue)
    }

    prevY.current = clientY
  }

  function onMouseDown(e: React.MouseEvent) {
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    prevY.current = e.clientY
  }

  function onMouseMove(e: MouseEvent) {
    applyDelta(e.clientY)
  }

  function onMouseUp() {
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
  }

  function onTouchStart(e: React.TouchEvent) {
    window.addEventListener('touchmove', onTouchMove as EventListener)
    window.addEventListener('touchend', onTouchEnd)
    prevY.current = e.touches[0].clientY
  }

  function onTouchMove(e: TouchEvent) {
    applyDelta(e.touches[0].clientY)
  }

  function onTouchEnd() {
    window.removeEventListener('touchmove', onTouchMove as EventListener)
    window.removeEventListener('touchend', onTouchEnd)
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = parseFloat(e.target.value)
    if (!isNaN(newValue)) {
      const stepsFromMin = Math.round((newValue - min) / step)
      const steppedValue = min + stepsFromMin * step
      const boundedValue = Math.min(max, Math.max(min, steppedValue))
      internalValue.current = boundedValue
      onChange(boundedValue)
    }
  }

  return (
    <input
      type="text"
      ref={(element) => {
        inputRef.current = element
      }}
      value={internalValue.current.toFixed(precision)}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      onChange={handleInputChange}
      {...rest}
    />
  )
}
