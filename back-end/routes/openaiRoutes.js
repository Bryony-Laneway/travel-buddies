const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();
require('dotenv').config();

const OPENAI_API_KEY = process.env.MY_OPENAI_API_KEY;

router.post("/", async (req, res) => {
  const { option } = req.body;

  if (!option) {
    return res.status(400).json({ error: 'Option is required.' });
  }

  let prompt;

  // Define prompts based on the option
  switch (option) {
    case 'Surprise Me':
      prompt = `
        Suggest a real but quirky travel destination that's unexpected and fun.
        Respond in the following structured JSON format, without any additional text or code block syntax:
        {
          "destination": "<Destination Name>",
          "itinerary": "<Brief Itinerary (max 15 words)>",
          "key_places": ["<Key Place 1 (max 3 words)>", "<Key Place 2 (max 3 words)>"]
        }
        Ensure the response is surprising but plausible.
      `;
      break;

    case 'Mountains':
      prompt = `
        Suggest a mountain destination for an adventurous trip.
        Respond in the following structured JSON format, without any additional text or code block syntax:
        {
          "destination": "<Destination Name>",
          "itinerary": "<Brief Itinerary (max 15 words)>",
          "key_places": ["<Key Place 1 (max 3 words)>", "<Key Place 2 (max 3 words)>"]
        }
        Focus on rugged peaks and hiking opportunities.
      `;
      break;

    case 'Beach':
      prompt = `
        Suggest a beautiful beach destination for a relaxing vacation.
        Respond in the following structured JSON format, without any additional text or code block syntax:
        {
          "destination": "<Destination Name>",
          "itinerary": "<Brief Itinerary (max 15 words)>",
          "key_places": ["<Key Place 1 (max 3 words)>", "<Key Place 2 (max 3 words)>"]
        }
        Focus on sunbathing, water activities, and coastal relaxation.
      `;
      break;

    default:
      return res.status(400).json({ error: 'Invalid option selected.' });
  }

  try {
    // Make a request to the OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 100,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Error fetching data from OpenAI API.' });
    }

    const data = await response.json();

    if (data.choices && data.choices[0]?.message?.content) {
      // Extract the JSON content from OpenAI response
      const rawContent = data.choices[0].message.content.trim();

      try {
        const parsedSuggestion = JSON.parse(rawContent); // Parse the JSON response
        return res.json({ suggestion: parsedSuggestion });
      } catch (parseError) {
        console.error('Error parsing OpenAI response:', parseError);
        return res.status(500).json({ error: 'Invalid response format from OpenAI.' });
      }
    } else {
      return res.status(500).json({ error: 'No suggestions received from OpenAI.' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error fetching suggestion. Please try again later.' });
  }
});


module.exports = router;