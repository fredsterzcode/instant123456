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
  return `
You are an expert freelance coach and copywriter. For each of the following platforms, generate a gig listing that is:
- Structured according to the platform's best practices and unique fields (e.g., Fiverr: 3 packages, Upwork: proposal, 99designs: contest brief, etc.).
- Recommends the most effective gig type/service for the user based on their skills and experience.
- Uses the user's preferred tone and experience level.
- Is ready to use and highly professional.

User Details:
- Name: ${name}
- Services: ${services}
- Skills: ${skills}
- Rate: ${rate}
- Preferred Tone: ${tone}
- Experience Level: ${experience}

For each platform, return an object with:
- platform: (e.g., 'Fiverr')
- recommended_gig_type: (e.g., 'Logo Design Package')
- title: (catchy, platform-optimized)
- description: (detailed, tailored to platform and user)
- pricing: (suggested pricing or packages, as appropriate)
- platform_specific_fields: (e.g., for Fiverr: { basic_package, standard_package, premium_package }, for Upwork: { proposal }, for 99designs: { contest_brief }, etc.)

Format as a valid JSON array. Do not include any explanation, markdown, or code block. Only output raw JSON. Make each listing unique, actionable, and optimized for the platform.
`;
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
    let content = completion.choices[0].message.content.trim();
    // Extract JSON from code block if present
    const match = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
    if (match) content = match[1];
    try {
      gigs = JSON.parse(content);
    } catch (e) {
      return res.status(500).json({ error: 'AI response format error.', raw: completion.choices[0].message.content });
    }
    res.status(200).json({ gigs });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
} 