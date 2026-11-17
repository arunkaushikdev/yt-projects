import { useState } from 'react'
import './App.css'

const LIMIT = 100

function App() {
  const [text, setText] = useState('')

  const count = [...text].length
  const remaining = LIMIT - count

  let status = ''
  if (remaining === 0) status = 'danger'
  else if (remaining <= 20) status = 'warning'

  function handleChange(e) {
    const value = e.target.value
    if ([...value].length <= LIMIT) {
      setText(value)
    }
  }

  return (
    <div className="app">
      <div className="card">
        <h1>Character Counter</h1>

        <textarea
          value={text}
          onChange={handleChange}
          placeholder="Start typing..."
          rows={5}
        />

        <div className="bar">
          <div
            className={`fill ${status}`}
            style={{ width: `${(count / LIMIT) * 100}%` }}
          />
        </div>

        <p className={`count ${status}`}>
          {count} / {LIMIT} · {remaining} left
        </p>
      </div>
    </div>
  )
}

export default App
