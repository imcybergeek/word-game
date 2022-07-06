import './App.css';
import Timer from './components/Timer'
import wordsList from './WordsList';
import { useState, useRef } from 'react';
import styled from 'styled-components';
import heart from './images/heart.png';

const Input = styled.input`
background-color: #2b2a33;
color: white;
width: 50%;
height: 46px;
line-height: 46px;
font-size: 1.1em;
border-radius: 30px;
padding: 10px 20px;
box-sizing: border-box;
text-align: center;
`;

const Button = styled.button`
    color: rgb(232, 230, 227);
    height: 46px;
    padding: 10px 26px;
    border: none;
    background: linear-gradient(
      to right,
      rgba(24, 170, 135, 1) 0%,
      rgba(1, 144, 182, 1) 100%
    );
    border-radius: 30px;
    font-size: 1.1em;
  `;


const Health = styled.div`
padding-top:30px;
`

const Img = styled.img`
height: calc(10px + 5vmin);
margin: 2px;
`

function App() {
  const nextQuestion = () => setCurrQ(getNewQuestion)
  const reduceHealth = () => setHealth(health - 1)
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
      e.target.value = null
      if (userValue.includes(currQ) && wordsList.includes(userValue)) 
      {
        setScore(score + 1); 
        childRef.current.reset();
        setCurrQ(getNewQuestion);
    }
    }
  }
  const [health, setHealth] = useState(3)
  const childRef = useRef();
  const [currQ, setCurrQ] = useState(getNewQuestion)
  const [score, setScore] = useState(0)

  return <div className="App">
    {health ? <>
      <Timer nextQuestion={nextQuestion} reduceHealth={reduceHealth} ref={childRef} />
      <p>Type a word that contains <br /> <b>{currQ}</b></p>
      <Input type="text" onKeyDown={getUserInput} autoFocus />
      <Health>
        {[...Array(health)].map(() => <Img src={heart} alt="❤" />)}
      </Health>
      <p>Score: {score}</p>
    </> : <>
      <h1>Your Score is: {score}</h1>
      <Button onClick={() => setHealth(3)}>Replay</Button>
    </>}
  </div>
}

export default App;