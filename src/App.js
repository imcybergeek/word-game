import './App.css';
import wordsList from './WordsList';
import { useState } from 'react';

function App() {
  const rand = (max) => Math.floor(Math.random() * max);
  const getNewQuestion = () => {
    const word = wordsList[rand(wordsList.length)]
    const substring = rand(word.length - 2)
    const finalWord = word.substring(substring, substring + 3)
    return finalWord
  }
  const getUserInput = (e) => {
    if (e.key === 'Enter') {
      e.target.value.includes(currQ) && wordsList.includes(e.target.value) && setScore(score + 1)
      e.target.value = null
      setCurrQ(getNewQuestion)
    }
  }
  const [currQ, setCurrQ] = useState(getNewQuestion)
  const [score, setScore] = useState(0)

  return <>
    <p>{currQ}</p>
    <input type="text" onKeyDown={getUserInput} />
    <p>{score}</p>
  </>
}

export default App;