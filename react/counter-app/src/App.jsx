import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  function increase() {
    setCount((prev) => prev + 1)
  }

  function decrease() {
    setCount((prev) => prev - 1)
  }

  function reset() {
    setCount(0)
  }

  return (
    <div className="app">
      <div className="counter">
        <h1>Counter App</h1>
        <p className="count">{count}</p>

        <div className="buttons">
          <button onClick={decrease} disabled={count === 0}>
            −
          </button>
          <button className="reset" onClick={reset}>
            Reset
          </button>
          <button onClick={increase}>+</button>
        </div>
      </div>
    </div>
  )
}

export default App
