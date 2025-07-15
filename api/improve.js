import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function sanitizeInput(input) {
  return (input || '').replace(/[<>]/g, '').trim();
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const { gig, platform, improvement } = req.body;
    if (!gig || !platform || !improvement) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }
    const sanitizedGig = sanitizeInput(gig);
    const sanitizedPlatform = sanitizeInput(platform);
    const sanitizedImprovement = sanitizeInput(improvement);
    const prompt = `You are an expert freelance coach. Improve the following gig for the platform ${sanitizedPlatform}.\n\nImprovement type: ${sanitizedImprovement}\n\nOriginal gig:\n${sanitizedGig}\n\nReturn improved gig content only, in the same format.`;
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant that rewrites and improves freelance gigs.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 600,
      temperature: 0.7
    });
    const improved = completion.choices[0].message.content;
    res.status(200).json({ improved });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
} 