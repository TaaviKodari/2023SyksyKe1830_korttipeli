import './App.css'
import Card from './components/Card';

const playerCard = {
  image: 'http://placekitten.com/120/100',
  stats: [{name:'Cuteness', value: 1},
          {name:'Speed', value: 50},
          {name:'Weight', value: 100}]
};
const opponentCard = {
  image: 'http://placekitten.com/120/100?image=2',
  stats: [{name:'Cuteness', value: 10},
          {name:'Speed', value: 5},
           {name:'Weight', value: 50}]
}
export default function App(){
  
  function compareCards(){
    const playerStat = playerCard.stats[0];
    const opponentStat = opponentCard.stats[0];

    let result = '';

    if(playerStat.value === opponentStat.value){
      result = 'draw';
    }
    else if(playerStat.value > opponentStat.value){
      result = 'winner';
    }
    else{
      result = 'loss';
    }
    console.log(result);
  }

  return(
    <>
      <h1>Hello World!</h1>
      <Card card ={playerCard}/>
      <button onClick={compareCards} type="button">Play</button>
      <Card card ={opponentCard}/>
    </>
  );
}