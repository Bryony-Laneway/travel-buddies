import React, { useState } from 'react';
import { Container, Card, Button } from 'react-bootstrap';

const ChooseVibe = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [surpriseResult, setSurpriseResult] = useState(null);

  const handleSelect = (option) => {
    setSelectedOption(option);
    fetchDestination(option);
  };

  const fetchDestination = async (option) => {
    try {
      const response = await fetch('http://localhost:3333/openai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ option }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSurpriseResult(data.suggestion || 'No suggestions received.');
    } catch (error) {
      console.error('Error fetching destination:', error);
      setSurpriseResult('Error fetching suggestion. Please try again later.');
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center min-vh-100">
      <Card className="shadow-lg" style={{ maxWidth: '600px', borderRadius: '10px', padding: '20px' }}>
        <Card.Body>
          <h2 className="text-center">Where do you want to go next?</h2>
          <Card.Text className="text-center">
            Choose your vibe... or let us surprise you with an unexpected destination.
          </Card.Text>
          <div className="d-grid gap-3">
            <Button onClick={() => handleSelect('Mountains')}>Mountains</Button>
            <Button onClick={() => handleSelect('Beach')}>Beach</Button>
            <Button onClick={() => handleSelect('Surprise Me')}>Surprise Me</Button>
          </div>
        </Card.Body>
      </Card>

    {selectedOption && (
      <Card className="text-center mt-4 shadow-lg" style={{ maxWidth: '600px', borderRadius: '10px', padding: '20px' }}>
        <Card.Body>
          <Card.Title>Selected Option: {selectedOption}</Card.Title>
          {surpriseResult ? (
            <div>
              <h4>Destination: {surpriseResult.destination}</h4>
              <p><strong>Itinerary:</strong> {surpriseResult.itinerary}</p>
              <p><strong>Key Places to Visit:</strong></p>
              <ul>
                {surpriseResult.key_places.map((place, index) => (
                  <li key={index}>{place}</li>
                ))}
              </ul>
            </div>
          ) : (
            <div>Fetching your destination...</div>
          )}
        </Card.Body>
      </Card>
    )}
     
    </Container>
  );
};

export default ChooseVibe;
