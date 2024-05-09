function BingoCard({ cardData }) {
    const { numbers, token, background, textColor } = cardData;
    const bingoHeaders = ['B', 'I', 'N', 'G', 'O'];
  
    const containerStyle = {
      backgroundColor: background,
      padding: '20px',
      margin: '10px auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '10px',
      width: '450px',
      maxWidth: '600px', 
      border: '2px solid #ddd',
    };
  
    const cardStyle = {
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      gap: '10px', 
      padding: '20px',
      placeItems: 'center',
      width: '80%', 
    };
  
    const tokenStyle = {
      color: textColor,
      marginBottom: '20px',
      alignSelf: 'start',
      width: '100%',
      textAlign: 'center',
      fontSize: '20px', 
    };
  
    const buttonStyle = {
      backgroundColor: textColor,
      color: background,
      padding: '10px', 
      fontSize: '18px', 
      border: '2px solid #ddd',
      borderRadius: '8px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '60px', 
      height: '35px',
    };
  
    return (
      <div className="cardsContainer" style={containerStyle}>
        <div style={tokenStyle}>Card Token: {token}</div>
        <div className="Card" style={cardStyle}>
          {bingoHeaders.map((header, index) => (
            <button key={`header-${index}`} style={buttonStyle}>{header}</button>
          ))}
          {Object.values(numbers).flat().map((value, index) => (
            <button key={`number-${index}`} style={buttonStyle}>{value}</button>
          ))}
        </div>
      </div>
    );
  }
  
  export default BingoCard;
  