# Mystro Project Management Tool v1.0.0 🚀

## 📁 Project Structure

```
├── app/                # Main application code
├── components/         # shadcn/ui components
├── documentation/      # Comprehensive app documentation
├── hooks/              # Custom React hooks
│   └── useNotify.js    # Notification management hook
├── lib/                # Utility libraries
│   ├── prisma.js       # Prisma client configuration
│   └── utils.js        # Helper utilities
├── messages/           # i18n translation files
├── prisma/             # Prisma ORM configuration
│   └── schema.prisma   # Database schema
├── public/             # Static assets and files
└── store/              # State management
    ├── useCreateProject.js
    └── UserSession.js
```

## 🛠️ Technologies

### Core Framework
- **Next.js 14** - React framework for production
- **React (JavaScript)** - UI library for building user interfaces

### Database & Storage
- **PostgreSQL** ![PostgreSQL](https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/postgresql/postgresql.png)
  - Primary database for robust data management
  - Relational database with strong ACID compliance
  - Managed through Prisma ORM

- **Google Cloud Storage** ![GCS](https://avatars.githubusercontent.com/u/2810941?s=200&v=4)
  - Cloud storage for images and files
  - Scalable object storage solution
  - Secure file management

## 🚀 Getting Started

1. **Clone the repository**
```bash
git clone [repository-url]
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

4. **Initialize database**
```bash
npx prisma generate
npx prisma db push
```

5. **Run the development server**
```bash
npm run dev
```

## 📦 Project Components

- **App Directory**: Contains the main application logic and routing
- **Components**: Reusable UI components using shadcn/ui
- **Documentation**: Detailed documentation for application code
- **Hooks**: Custom React hooks for state and side-effect management
- **Libraries**: Utility functions and configuration
- **Messages**: Contains i18n translation files
- **Prisma**: Database schema and migrations
- **Store**: Application state management and user sessions

## 🔧 Configuration Files

- `.eslintrc.json`: ESLint configuration
- `tailwind.config.js`: Tailwind CSS configuration
- `next.config.mjs`: Next.js configuration
- `postcss.config.mjs`: PostCSS configuration