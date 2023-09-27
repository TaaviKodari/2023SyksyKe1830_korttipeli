import './App.css'
import Card from './components/Card';
import { useState } from 'react';

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min +1) + min);

const playerCard = {
  image: 'http://placekitten.com/120/100?image=' + getRandomInt(0,15),
  stats: [{name:'Cuteness', value: getRandomInt(1,999)},
          {name:'Speed', value: getRandomInt(1,999)},
          {name:'Weight', value: getRandomInt(1,999)}]
};
const opponentCard = {
  image: 'http://placekitten.com/120/100?image=' +getRandomInt(0,15),
  stats: [{name:'Cuteness', value: getRandomInt(1,999)},
          {name:'Speed', value: getRandomInt(1,999)},
           {name:'Weight', value: getRandomInt(1,999)}]
}

const createCard = (index) =>({
  image: 'http://placekitten.com/120/100?image=' + index,
  stats: [{name:'Cuteness', value: getRandomInt(1,999)},
          {name:'Speed', value: getRandomInt(1,999)},
          {name:'Weight', value: getRandomInt(1,999)}],
  id: crypto.randomUUID()
        });

const deck = Array(16).fill(null).map((_,index) => createCard(index))
export default function App(){
  
  const [result, setResult] = useState('');

  function compareCards(){
    const playerStat = playerCard.stats[0];
    const opponentStat = opponentCard.stats[0];

    if(playerStat.value === opponentStat.value){
      setResult('Draw');
    }
    else if(playerStat.value > opponentStat.value){
      setResult('Winner');
    }
    else{
      setResult('Loss');
    }

  }

  return(
    <>
      <h1>Hello World!</h1>
      <div className='game'>
        <Card card ={playerCard}/>
        
        <div className='center-area'>
          <p>{result || 'Press the button'}</p>
          <button onClick={compareCards} type="button">Play</button>
        </div>

        <Card card ={opponentCard}/>
      </div>
    </>
  );
}