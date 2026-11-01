import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { db } from './server/db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const ADMIN_TOKEN = 'seel-secret-admin-session-token-2026';

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Auth middleware for admin routes
function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    if (token === ADMIN_TOKEN) {
      return next();
    }
  }
  return res.status(401).json({ error: 'Unauthorized. Administrative access required.' });
}

// ================= API ROUTES =================

// Auth
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  // Default verified administrative credentials
  if (
    (email === 'admin@seniorenv.com' || email === 'admin') &&
    (password === 'SeniorEnv2025!' || password === 'admin123')
  ) {
    return res.json({
      success: true,
      token: ADMIN_TOKEN,
      user: {
        email: 'admin@seniorenv.com',
        name: 'Senior Administrator',
        role: 'Super Admin'
      }
    });
  }
  return res.status(401).json({ success: false, error: 'Invalid administrator credentials' });
});

app.get('/api/auth/verify', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.substring(7) === ADMIN_TOKEN) {
    return res.json({
      valid: true,
      user: {
        email: 'admin@seniorenv.com',
        name: 'Senior Administrator',
        role: 'Super Admin'
      }
    });
  }
  return res.status(401).json({ valid: false });
});

// Settings & Statistics
app.get('/api/settings', (_req: Request, res: Response) => {
  res.json(db.getSettings());
});

app.put('/api/settings', requireAdmin, (req: Request, res: Response) => {
  const updated = db.updateSettings(req.body);
  res.json({ success: true, settings: updated });
});

// Services
app.get('/api/services', (_req: Request, res: Response) => {
  res.json(db.getServices());
});

app.get('/api/services/:slug', (req: Request, res: Response) => {
  const s = db.getServiceBySlug(req.params.slug);
  if (!s) return res.status(404).json({ error: 'Service not found' });
  res.json(s);
});

app.put('/api/services/:id', requireAdmin, (req: Request, res: Response) => {
  const updated = db.updateService(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Service not found' });
  res.json({ success: true, service: updated });
});

// Industries
app.get('/api/industries', (_req: Request, res: Response) => {
  res.json(db.getIndustries());
});

// Projects
app.get('/api/projects', (_req: Request, res: Response) => {
  res.json(db.getProjects());
});

app.post('/api/projects', requireAdmin, (req: Request, res: Response) => {
  const { title, category, location, client, year, description, scopeOfWork, outcomes, image, featured } = req.body;
  if (!title || !category || !location || !description) {
    return res.status(400).json({ error: 'Missing required project fields' });
  }
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const created = db.addProject({
    slug,
    title,
    category,
    location,
    client: client || 'Private Client',
    year: year || new Date().getFullYear().toString(),
    description,
    scopeOfWork: Array.isArray(scopeOfWork) ? scopeOfWork : [],
    outcomes: outcomes || '',
    image: image || '/src/assets/images/service_air_quality_stack_1793480529106.jpg',
    featured: Boolean(featured)
  });
  res.json({ success: true, project: created });
});

app.put('/api/projects/:id', requireAdmin, (req: Request, res: Response) => {
  const updated = db.updateProject(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Project not found' });
  res.json({ success: true, project: updated });
});

app.delete('/api/projects/:id', requireAdmin, (req: Request, res: Response) => {
  const ok = db.deleteProject(req.params.id);
  res.json({ success: ok });
});

// Team
app.get('/api/team', (_req: Request, res: Response) => {
  res.json(db.getTeam());
});

app.put('/api/team/:id', requireAdmin, (req: Request, res: Response) => {
  const updated = db.updateTeamMember(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Team member not found' });
  res.json({ success: true, teamMember: updated });
});

// Testimonials
app.get('/api/testimonials', (req: Request, res: Response) => {
  const all = req.query.all === 'true';
  res.json(db.getTestimonials(all));
});

app.post('/api/testimonials', (req: Request, res: Response) => {
  const { clientName, organization, role, rating, content } = req.body;
  if (!clientName || !content) {
    return res.status(400).json({ error: 'Name and testimonial content are required' });
  }
  const t = db.addTestimonial({
    clientName,
    organization: organization || '',
    role: role || '',
    rating: Number(rating) || 5,
    content
  });
  res.json({
    success: true,
    message: 'Thank you! Your testimonial has been submitted for verification.',
    testimonial: t
  });
});

app.patch('/api/testimonials/:id/status', requireAdmin, (req: Request, res: Response) => {
  const { approved } = req.body;
  const updated = db.updateTestimonial(req.params.id, { approved: Boolean(approved) });
  if (!updated) return res.status(404).json({ error: 'Testimonial not found' });
  res.json({ success: true, testimonial: updated });
});

app.delete('/api/testimonials/:id', requireAdmin, (req: Request, res: Response) => {
  const ok = db.deleteTestimonial(req.params.id);
  res.json({ success: ok });
});

// Articles
app.get('/api/articles', (_req: Request, res: Response) => {
  res.json(db.getArticles());
});

app.post('/api/articles', requireAdmin, (req: Request, res: Response) => {
  const { title, category, summary, content, author, image, tags, readTime } = req.body;
  if (!title || !content) return res.status(400).json({ error: 'Title and content required' });
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const art = db.addArticle({
    slug,
    title,
    category: category || 'Industry Insights',
    summary: summary || '',
    content,
    author: author || 'SEEL Technical Advisory',
    image: image || '/src/assets/images/hero_environmental_engineering_1793480528430.jpg',
    tags: Array.isArray(tags) ? tags : ['Environmental', 'Engineering'],
    readTime: readTime || '5 min read'
  });
  res.json({ success: true, article: art });
});

// Contact Enquiries
app.get('/api/enquiries', requireAdmin, (_req: Request, res: Response) => {
  res.json(db.getEnquiries());
});

app.post('/api/enquiries', (req: Request, res: Response) => {
  const { fullName, company, email, phone, country, serviceRequired, projectLocation, subject, message } = req.body;
  if (!fullName || !email || !message) {
    return res.status(400).json({ error: 'Full name, email, and message are required.' });
  }

  // Simple email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }

  const enq = db.addEnquiry({
    fullName: fullName.trim(),
    company: (company || 'Individual / Enterprise').trim(),
    email: email.trim(),
    phone: (phone || '').trim(),
    country: (country || 'Kenya').trim(),
    serviceRequired: (serviceRequired || 'General Consultation').trim(),
    projectLocation: (projectLocation || 'Nairobi, Kenya').trim(),
    subject: (subject || 'Consultancy Request').trim(),
    message: message.trim()
  });

  res.json({
    success: true,
    message: 'Your inquiry has been received by our technical desk. Our engineering team will review and contact you within 24 business hours.',
    enquiryId: enq.id
  });
});

app.patch('/api/enquiries/:id/status', requireAdmin, (req: Request, res: Response) => {
  const { status } = req.body;
  const updated = db.updateEnquiryStatus(req.params.id, status);
  if (!updated) return res.status(404).json({ error: 'Enquiry not found' });
  res.json({ success: true, enquiry: updated });
});

app.delete('/api/enquiries/:id', requireAdmin, (req: Request, res: Response) => {
  const ok = db.deleteEnquiry(req.params.id);
  res.json({ success: ok });
});

// Quotation Requests
app.get('/api/quotes', requireAdmin, (_req: Request, res: Response) => {
  res.json(db.getQuotes());
});

app.post('/api/quotes', (req: Request, res: Response) => {
  const {
    fullName,
    company,
    email,
    phone,
    serviceRequested,
    projectLocation,
    projectScope,
    estimatedTimeline,
    budgetRange,
    attachmentsNote
  } = req.body;

  if (!fullName || !email || !serviceRequested || !projectScope) {
    return res.status(400).json({
      error: 'Please fill in all required fields (Name, Email, Service, and Project Scope).'
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid corporate email.' });
  }

  const quote = db.addQuote({
    fullName: fullName.trim(),
    company: (company || 'Private Entity').trim(),
    email: email.trim(),
    phone: (phone || '').trim(),
    serviceRequested: serviceRequested.trim(),
    projectLocation: (projectLocation || 'East Africa').trim(),
    projectScope: projectScope.trim(),
    estimatedTimeline: (estimatedTimeline || 'Standard').trim(),
    budgetRange: (budgetRange || 'Competitive Quotation').trim(),
    attachmentsNote: attachmentsNote || ''
  });

  res.json({
    success: true,
    referenceNo: quote.referenceNo,
    message: `Quotation request successfully submitted. Your official reference number is ${quote.referenceNo}. An engineering proposal specialist will prepare the scope document.`,
    quote
  });
});

app.patch('/api/quotes/:id/status', requireAdmin, (req: Request, res: Response) => {
  const { status } = req.body;
  const updated = db.updateQuoteStatus(req.params.id, status);
  if (!updated) return res.status(404).json({ error: 'Quote request not found' });
  res.json({ success: true, quote: updated });
});

app.delete('/api/quotes/:id', requireAdmin, (req: Request, res: Response) => {
  const ok = db.deleteQuote(req.params.id);
  res.json({ success: ok });
});

// Analytics Dashboard summary
app.get('/api/analytics', requireAdmin, (_req: Request, res: Response) => {
  const enquiries = db.getEnquiries();
  const quotes = db.getQuotes();
  const projects = db.getProjects();
  const services = db.getServices();
  const testimonials = db.getTestimonials(true);

  res.json({
    totalEnquiries: enquiries.length,
    newEnquiries: enquiries.filter(e => e.status === 'new').length,
    totalQuotes: quotes.length,
    pendingQuotes: quotes.filter(q => q.status === 'pending').length,
    totalProjects: projects.length,
    totalServices: services.length,
    totalTestimonials: testimonials.length,
    pendingTestimonials: testimonials.filter(t => !t.approved).length,
    recentEnquiries: enquiries.slice(0, 5),
    recentQuotes: quotes.slice(0, 5)
  });
});

// Reset seed
app.post('/api/seed', requireAdmin, (_req: Request, res: Response) => {
  db.resetSeed();
  res.json({ success: true, message: 'Database reset to verified SEEL records.' });
});

// ================= FRONTEND SERVING =================
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    // In dev: integrate with Vite dev server middleware
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    // In prod: serve built dist folder
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Senior Environmental & Engineering Ltd server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
