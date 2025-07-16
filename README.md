# Dream AI Dashboard

A comprehensive dashboard for Dream AI project management with internal tools and marketing pages.

## Features

### Internal Dashboard (4 pages)
- **Dashboard** (`/dashboard`) - Overview with KPIs, timeline, and notes
- **Tasks** (`/tasks`) - Task management with Firebase integration
- **Notes** (`/notes`) - Note-taking with markdown support
- **Contacts** (`/contacts`) - Contact management system

### Marketing Pages (4 pages)
- **Home** (`/marketing/home`) - Main landing page with AI toolkit
- **Micro-Apps** (`/marketing/micro-apps`) - AI-powered micro-apps showcase
- **Consulting** (`/marketing/consulting`) - AI consulting services
- **Investors** (`/marketing/investors`) - Investor relations and analysis

## Technology Stack

- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS
- **Backend**: Firebase (Auth + Firestore)
- **AI**: Gemini API integration
- **Deployment**: Netlify
- **Styling**: Tailwind CSS + Custom theme

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.local.example .env.local
# Edit .env.local with your Firebase and Gemini API keys
```

3. Run development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
```

## Firebase Collections

- `tasks300` - 300-day roadmap tasks
- `notes` - User notes and documentation
- `contacts` - Contact information and relationships
- `config/today` - Current day configuration

## Deployment

The project is configured for automatic deployment to Netlify:

1. Connect your GitHub repository to Netlify
2. Set environment variables in Netlify dashboard
3. Deploy automatically on push to main branch

## Features

- **Responsive Design**: Mobile-first approach
- **Real-time Updates**: Firebase Firestore integration
- **AI Integration**: Gemini API for intelligent features
- **Dark Theme**: Professional dark mode interface
- **Type Safety**: Full TypeScript support
- **Performance**: Optimized for speed and SEO

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - see LICENSE file for details