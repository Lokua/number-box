import { useEffect, useRef, useState } from 'react'

type Props = {
  value: number
  min?: number
  max?: number
  step?: number
  sensitivity?: [number, number]
  onChange: (value: number) => void
}

function numberOfDecimals(step: number) {
  const x = step.toString()
  if (x.indexOf('.') > -1) {
    return x.length - x.indexOf('.') - 1
  }
  return 0
}

export default function NumberBox({
  value,
  min = 0,
  max = 100,
  step = 1,
  sensitivity = [200, 500],
  onChange,
  ...rest
}: Props) {
  const internalValue = useRef(value)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const prevY = useRef(0)
  const [shiftHeld, setShiftHeld] = useState(false)
  const precision = numberOfDecimals(step)

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
      window.removeEventListener('keydown', onKeyup)
    }
  }, [])

  function applyDelta(clientY: number) {
    const delta = prevY.current - clientY
    const rangeDivisor = shiftHeld ? sensitivity[1] : sensitivity[0]
    const dragSensitivity = (max - min) / rangeDivisor
    const rawValue = internalValue.current + delta * dragSensitivity
    const quantizedValue = Math.round(rawValue / step) * step
    prevY.current = clientY
    setInternalValue(quantizedValue)
    onChange(quantizedValue)
  }

  function setInternalValue(x: number) {
    internalValue.current = x < min ? min : x > max ? max : x
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
    console.log('onMouseUp:', inputRef)
  }

  function onTouchStart(e: React.TouchEvent) {
    window.addEventListener('touchmove', onTouchMove)
    window.addEventListener('touchend', onTouchEnd)
    prevY.current = e.touches[0].clientY
  }

  function onTouchMove(e: React.TouchEvent | TouchEvent) {
    applyDelta(e.touches[0].clientY)
  }

  function onTouchEnd() {
    window.removeEventListener('touchmove', onTouchMove)
    window.removeEventListener('touchend', onTouchEnd)
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
      onTouchMove={onTouchMove}
      onChange={(e) => {
        setInternalValue(e.currentTarget.valueAsNumber)
      }}
      {...rest}
    />
  )
}
