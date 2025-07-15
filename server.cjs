require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { OpenAI } = require('openai');
const validator = require('validator');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Rate limiting: 5 requests/hour per IP
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: { error: 'Rate limit exceeded. Try again in an hour.' }
});
app.use('/api/generate', limiter);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

function sanitizeInput(input) {
  // Remove HTML, trim, and basic validation
  return validator.escape(validator.stripLow(input || '').trim());
}

function validateFields(body) {
  const { name, services, skills, rate, tone, experience } = body;
  if (!name || !services || !skills || !rate || !tone || !experience) return false;
  if (!validator.isNumeric(rate.toString())) return false;
  if (!['Professional', 'Casual', 'Witty'].includes(tone)) return false;
  if (!['Beginner', 'Intermediate', 'Pro'].includes(experience)) return false;
  return true;
}

function buildPrompt({ name, services, skills, rate, tone, experience }) {
  return `Generate gig listings for the following platforms: Upwork, Fiverr, Freelancer.com, Toptal, PeoplePerHour, Guru, 99designs, SimplyHired.\n\nName: ${name}\nServices: ${services}\nSkills: ${skills}\nRate: ${rate}\nTone: ${tone}\nExperience: ${experience}\n\nFor each platform, return:\n- Platform\n- Title\n- Description\n- Pricing\n\nFormat as JSON array.`;
}

app.post('/api/generate', async (req, res) => {
  try {
    if (!validateFields(req.body)) {
      return res.status(400).json({ error: 'Invalid input fields.' });
    }
    // Sanitize all fields
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
    // Try to parse the response as JSON
    let gigs = [];
    try {
      gigs = JSON.parse(completion.choices[0].message.content);
    } catch (e) {
      return res.status(500).json({ error: 'AI response format error.' });
    }
    res.json({ gigs });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// New endpoint: /api/improve
app.post('/api/improve', async (req, res) => {
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
    res.json({ improved });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 