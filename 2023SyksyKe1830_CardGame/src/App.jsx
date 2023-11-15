import './App.css'
import Card from './components/Card';
import PlayButton from './components/PlayButton';
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
const half = Math.ceil(deck.length /2);
const dealCards = () =>{
  shuffle(deck);
  return{
    player: deck.slice(0,half),
    opponent: deck.slice(half)
  }
}

function shuffle(array){
  for(let i = array.length -1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default function App(){
  
  const [result, setResult] = useState('');
  const [cards, setCards] = useState(dealCards);
  const [gameState, setGameState] = useState('play');
  const [selectedStat, setSelected] = useState(0);

  if(gameState !== 'game_over' && (!cards.opponent.length || !cards.player.length)){
    
  }

  function compareCards(){
    const playerStat = cards.player[0].stats[selectedStat];
    const opponentStat = cards.opponent[0].stats[selectedStat];

    if(playerStat.value === opponentStat.value){
      setResult('Draw');
    }
    else if(playerStat.value > opponentStat.value){
      setResult('Winner');
    }
    else{
      setResult('Loss');
    }
    setGameState('result');
  }

  function nextRound(){
    setCards(cards =>{
      const playedCards = [{...cards.player[0]}, {...cards.opponent[0]}];
      const player = cards.player.slice(1);
      const opponent = cards.opponent.slice(1);
      if(result === 'Draw'){
        return{
          player,
          opponent
        };
      }
      if(result === 'Winner'){
        return{
          player:[...player, ...playedCards],
          opponent
        };
      }
      if(result === 'Loss'){
        return{
          player,
          opponent: [...opponent,...playedCards]
        };
      }
      return cards;
    });
    setGameState('play');
    setResult('')
  }

  function restartGame(){
    setCards(dealCards);
    setResult('');
    setGameState('play');
  }
  return(
    <>
      <h1>Hello World!</h1>
      <div className='game'>
        <div className='hand player'>
          <ul className='card-list'>
            {cards.player.map((pCard,index) =>(
              <li className='card-list-item player' key={pCard.id}>
                <Card card={ index === 0 ? pCard : null}
                handleSelect={statIndex => gameState ==='play' && setSelected(statIndex)}
                selectedStat={selectedStat}
                />
              </li>
            ))}
          </ul>
        </div>
        
        <div className='center-area'>
          <p>{result || 'Press the button'}</p>
          {
            gameState === 'play' ? 
            (<PlayButton text={'Play'} handleClick={compareCards} />)
            :
            gameState === 'game_over' ? 
            (<PlayButton text={'Restart'} handleClick={restartGame}/>)
            :
            (<PlayButton text={'Next'} handleClick={nextRound} />)
          }
          
        </div>

        <div className='hand opponent'>
          <ul className='card-list opponent'>
            {cards.opponent.map(oCard =>(
              <li className='card-list-item opponent' key={oCard.id}>
                <Card card ={oCard}/>
              </li>
            ))}
          </ul>
        </div>
        
      </div>
    </>
  );
}