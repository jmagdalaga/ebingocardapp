import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import BingoCard from './BingoCard';

function App() {
  const gameUrl = 'http://www.hyeumine.com/getcard.php?bcode=yKGqarzZ';
  const checkWinUrl = 'http://www.hyeumine.com/checkwin.php';

  const [cards, setCards] = useState([]);
  const [, setWinner] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      cards.forEach((card) => {
        axios.get(`${checkWinUrl}?playcard_token=${card.token}`)
          .then((response) => {
            if (response.data === 1) {
              const winningMessage = `Card with token ${card.token} has won!`;
              setWinner(winningMessage);
              window.alert(winningMessage);
            }
          })
          .catch((error) => {
            console.error('Error checking win status:', error);
          });
      });
    }, 5000);
  
    return () => clearInterval(intervalId);
  }, [cards]);

  const addCard = async () => {
    try {
      const response = await axios.get(gameUrl);
      const { card, playcard_token } = response.data;

      const newCardData = {
        numbers: {
          B: card.B,
          I: card.I,
          N: card.N,
          G: card.G,
          O: card.O,
        },
        token: playcard_token,

        style: {
          padding: '20px',
        },
      };

      setCards((prevCards) => [...prevCards, newCardData]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const clearCard = () => {
    setCards([]);
    setWinner('');
  };

  return (
    <div className="Con">
      <h2 style={{ margin: "5" }}>Game Code: yKGqarzZ</h2>
      <div style={{ display: "flex" }}>
        <button className="btnNewCard" onClick={() => addCard()}>Add Card</button>
        <button className="btnNewPlayer" onClick={() => window.open('http://localhost:3000', '_blank')}>Add New Player</button>
        <button className="btnClearCard" onClick={() => clearCard()}>Clear Cards</button>
        <button className="btnNavigate" onClick={() => window.location.href = 'http://www.hyeumine.com/bingodashboard.php?bcode=8NRcsvwI'}>Bingo Dashboard</button>
      </div>
      <div className="App">
        {cards.map((cardData, index) => (
          <BingoCard
            key={index}
            cardData={cardData}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
