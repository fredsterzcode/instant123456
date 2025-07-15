import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function sanitizeInput(input) {
  return (input || '').replace(/[<>]/g, '').trim();
}

function validateFields(body) {
  const { name, services, skills, rate, tone, experience } = body;
  if (!name || !services || !skills || !rate || !tone || !experience) return false;
  if (isNaN(Number(rate))) return false;
  if (!['Professional', 'Casual', 'Witty'].includes(tone)) return false;
  if (!['Beginner', 'Intermediate', 'Pro'].includes(experience)) return false;
  return true;
}

function buildPrompt({ name, services, skills, rate, tone, experience }) {
  return `Generate gig listings for the following platforms: Upwork, Fiverr, Freelancer.com, Toptal, PeoplePerHour, Guru, 99designs, SimplyHired.\n\nName: ${name}\nServices: ${services}\nSkills: ${skills}\nRate: ${rate}\nTone: ${tone}\nExperience: ${experience}\n\nFor each platform, return:\n- Platform\n- Title\n- Description\n- Pricing\n\nFormat as JSON array.`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    if (!validateFields(req.body)) {
      return res.status(400).json({ error: 'Invalid input fields.' });
    }
    const data = {
      name: sanitizeInput(req.body.name),
      services: sanitizeInput(req.body.services),
      skills: sanitizeInput(req.body.skills),
      rate: sanitizeInput(req.body.rate),
      tone: sanitizeInput(req.body.tone),
      experience: sanitizeInput(req.body.experience)
    };
    const prompt = buildPrompt(data);
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant that writes professional gig listings.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 600,
      temperature: 0.7
    });
    let gigs = [];
    try {
      gigs = JSON.parse(completion.choices[0].message.content);
    } catch (e) {
      return res.status(500).json({ error: 'AI response format error.' });
    }
    res.status(200).json({ gigs });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
} 