import { useEffect, useState } from 'react'
import { questions } from './questions'
import './App.css'

const TIME_LIMIT = 10

function App() {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT)

  const finished = index === questions.length
  const timeUp = timeLeft === 0
  const isAnswered = selected !== null || timeUp

  useEffect(() => {
    if (finished || isAnswered) return
    const id = setInterval(() => {
      setTimeLeft((t) => t - 1)
    }, 1000)
    return () => clearInterval(id)
  }, [index, finished, isAnswered])

  function handleSelect(i) {
    if (isAnswered) return
    setSelected(i)
    if (i === questions[index].answer) {
      setScore((s) => s + 1)
    }
  }

  function handleNext() {
    setIndex((i) => i + 1)
    setSelected(null)
    setTimeLeft(TIME_LIMIT)
  }

  function handleRestart() {
    setIndex(0)
    setSelected(null)
    setScore(0)
    setTimeLeft(TIME_LIMIT)
  }

  if (finished) {
    let message = 'Keep practising! 💪'
    if (score === questions.length) message = 'Perfect score! 🏆'
    else if (score >= 3) message = 'Nice work! 🎉'

    return (
      <div className="app">
        <div className="card result">
          <h1>Quiz complete!</h1>
          <p className="score">
            {score} / {questions.length}
          </p>
          <p className="message">{message}</p>
          <button className="next" onClick={handleRestart}>
            Play again
          </button>
        </div>
      </div>
    )
  }

  const q = questions[index]

  function optionClass(i) {
    if (!isAnswered) return 'option'
    if (i === q.answer) return 'option correct'
    if (i === selected) return 'option wrong'
    return 'option dim'
  }

  let feedback = '❌ Wrong!'
  if (selected === q.answer) feedback = '✅ Correct!'
  if (selected === null) feedback = "⏰ Time's up!"

  return (
    <div className="app">
      <div className="card">
        <div className="top">
          <span className="progress">
            Question {index + 1} of {questions.length}
          </span>
          <span className={timeLeft <= 3 ? 'timer low' : 'timer'}>
            ⏱ {timeLeft}s
          </span>
        </div>

        <h2>{q.question}</h2>

        <div className="options">
          {q.options.map((option, i) => (
            <button
              key={option}
              className={optionClass(i)}
              onClick={() => handleSelect(i)}
              disabled={isAnswered}
            >
              {option}
            </button>
          ))}
        </div>

        {isAnswered && (
          <div className="footer">
            <p className="feedback">{feedback}</p>
            <button className="next" onClick={handleNext}>
              {index + 1 === questions.length ? 'See results' : 'Next'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
