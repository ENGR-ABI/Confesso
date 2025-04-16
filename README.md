# Confesso - Anonymous Messaging App

Confesso is a modern, secure anonymous messaging platform that allows users to share their thoughts and confessions without revealing their identity. Built with privacy and user experience in mind, Confesso provides a safe space for open communication.

## Features

- 🔒 Complete anonymity for message senders
- 💬 Real-time messaging capabilities
- 🎨 Modern, responsive UI built with React and Tailwind CSS
- 🔐 Secure authentication system
- 📱 Mobile-friendly design
- 🚀 Real-time updates using WebSocket
- 🎯 User-friendly interface with intuitive navigation

## Tech Stack

- **Frontend:**
  - React 18
  - Tailwind CSS
  - Radix UI Components
  - React Query
  - Wouter for routing
  - Framer Motion for animations

- **Backend:**
  - Node.js
  - Express
  - WebSocket for real-time communication
  - Drizzle ORM
  - PostgreSQL (via Neon Database)
  - Passport.js for authentication

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd confesso
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```
DATABASE_URL=your_database_url
SESSION_SECRET=your_session_secret
```

4. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run check` - Run TypeScript type checking
- `npm run db:push` - Push database schema changes

## Project Structure

```
confesso/
├── client/          # Frontend React application
├── server/          # Backend Express server
├── shared/          # Shared types and utilities
├── public/          # Static assets
└── attached_assets/ # Additional assets
```

## Security Features

- End-to-end encryption for messages
- Secure session management
- Rate limiting to prevent abuse
- Input sanitization
- XSS protection
- CSRF protection

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the development team.

---

Built with ❤️ by the Confesso Team 