import './App.css';
import wordsList from './WordsList';
import { useState } from 'react';
import styled from 'styled-components';

function App() {
  const Input = styled.input`
  color: rgba(232, 230, 227, 0.5);
  width: 50%;
  height: 46px;
  line-height: 46px;
  font-size: 1.1em;
  color: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 30px;
  padding: 10px 20px;
  box-sizing: border-box;
  text-align: center;
`;
  const rand = (max) => Math.floor(Math.random() * max);
  const getNewQuestion = () => {
    const word = wordsList[rand(wordsList.length)]
    const substring = rand(word.length - 2)
    const finalWord = word.substring(substring, substring + 3)
    return finalWord
  }
  const getUserInput = (e) => {
    if (e.key === 'Enter') {
      const userValue = e.target.value.toLowerCase().trim()
      userValue.includes(currQ) && wordsList.includes(userValue) && setScore(score + 1)
      setCurrQ(getNewQuestion)
    }
  }
  const [currQ, setCurrQ] = useState(getNewQuestion)
  const [score, setScore] = useState(0)

  return <div className="App">
    <p>Type a word that contains <br/> <b>{currQ}</b></p>
    <Input type="text" onKeyDown={getUserInput} autoFocus/>
    <p>Score: {score}</p>
  </div>
}

export default App;