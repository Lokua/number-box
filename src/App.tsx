import { useState } from 'react'
import NumberBox from './NumberBox'

export default function App() {
  const [v1, setV1] = useState(0)
  const [v2, setV2] = useState(0)
  const [v3, setV3] = useState(0)
  const [v4, setV4] = useState(0)

  return (
    <div>
      <fieldset>
        <label>range = [0, 100], step = 1</label>
        <NumberBox value={v1} onChange={setV1} />
      </fieldset>
      <fieldset>
        <label>range = [0, 1], step = 0.001</label>
        <NumberBox value={v2} min={0} max={1} step={0.001} onChange={setV2} />
      </fieldset>
      <fieldset>
        <label>range = [0, 100], step = 10</label>
        <NumberBox value={v3} min={0} max={100} step={10} onChange={setV3} />
      </fieldset>
      <fieldset>
        <label>range = [0, 10_000], step = 1</label>
        <NumberBox value={v4} min={0} max={10_000} step={1} onChange={setV4} />
      </fieldset>
    </div>
  )
}
