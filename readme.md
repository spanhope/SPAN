# SPAN Website

A static website for SPAN (Suicide Prevention Awareness Network - Research & Training), a non-profit organization dedicated to mental health awareness and suicide prevention programs.

## Tech Stack

### Frontend
- **Static HTML/CSS/JS** - Vanilla frontend with no build process
- **Bootstrap 5** - Responsive CSS framework
- **jQuery** - DOM manipulation and event handling
- **Owl Carousel** - Image carousel/slider
- **Font Awesome** - Icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **JWT** - JSON Web Token for authentication
- **bcrypt** - Password hashing
- **Multer** - File upload handling

### Database & Storage
- **SQLite (libSQL/Turso)** - Primary database
- **Cloudinary** - Cloud-based image storage and transformation

## Why This Stack?

### Why SQLite (via Turso/libSQL)?

We chose SQLite for several important reasons:

1. **Simplicity** - SQLite requires zero configuration and has no external server dependencies. The database is a single file that can be easily backed up, moved, or replicated.

2. **Cost-Effective** - As a non-profit organization, keeping operational costs minimal is crucial. SQLite with Turso offers a generous free tier that can handle the traffic volume of a small to medium-sized website without any monthly costs.

3. **ACID Compliance** - SQLite provides full ACID reliability, ensuring that all transactions are processed atomically even if the server crashes or power fails.

4. **Easy Development** - For local development, you can use a local file (`file:./blog.db`) without any setup. The same code works seamlessly with Turso's cloud database in production.

5. **libSQL Client** - The `@libsql/client` library provides a unified API that works identically whether connecting to a local file or Turso's cloud, making development and deployment straightforward.

### Why Cloudinary?

1. **Image Optimization** - Cloudinary automatically optimizes images for different devices and screen sizes, improving page load times significantly.

2. **CDN Delivery** - Images are served through a global CDN, ensuring fast load times for visitors regardless of their location.

3. **Transformation API** - Easy to generate different sizes, crops, and thumbnails on-the-fly without storing multiple copies of each image.

4. **Bandwidth Savings** - Since this is a charity website with limited hosting budgets, Cloudinary's compression and CDN reduces bandwidth costs significantly.

5. **Ease of Integration** - The Cloudinary Node.js SDK integrates seamlessly with Express and Multer for file uploads.

### Why Express.js?

1. **Minimal & Flexible** - Express provides just enough structure to build APIs quickly without imposing strict patterns.

2. **Mature Ecosystem** - Large ecosystem of middleware and plugins available for common tasks like authentication, file uploads, etc.

3. **Lightweight** - No unnecessary abstractions or heavy frameworks, perfect for a simple blog/admin backend.

## Project Structure

```
span-website/
├── index.html              # Main homepage
├── about.html            # About page
├── blog.html            # Blog listing page
├── blog-single.html     # Single blog post page
├── contact.html         # Contact page
├── css/                 # Stylesheets
├── js/                  # Frontend JavaScript
├── icons/               # Icon assets
├── admin/               # Admin panel
│   ├── index.html       # Admin dashboard
│   ├── login.html      # Admin login
│   ├── js/            # Admin JavaScript
│   ├── css/            # Admin styles
│   └── html/           # Admin HTML modules
├── backend/             # Node.js backend
│   ├── server.js       # Express server
│   ├── db.js           # Database configuration
│   ├── routes/         # API routes
│   ├── config/         # Configuration files
│   ├── middleware/     # Express middleware
│   └── package.json    # Backend dependencies
└── readme.md           # This file
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd span-website
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the `backend` directory:
   ```env
   # Turso Database (use file:./blog.db for local development)
   TURSO_DB_URL=libsql://your-turso-database-url
   TURSO_AUTH_TOKEN=your-auth-token
   
   # Cloudinary
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   
   # JWT Secret
   JWT_SECRET=your-super-secret-key
   ```

4. **Start the server**
   ```bash
   npm start
   ```

   The backend will run on `http://localhost:3000`

5. **Set up frontend (static files)**
   
   The frontend is static HTML and can be served from any web server. For development, you can:
   - Use VS Code Live Server
   - Use Python: `python -m http.server 8000`
   - Use Vercel, Netlify, or any static hosting

### Default Admin Account


> **Important**: Change this password immediately after first login!

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Admin login |
| GET | `/api/posts` | Get all posts |
| GET | `/api/posts/:id` | Get single post |
| POST | `/api/posts` | Create post (auth required) |
| PUT | `/api/posts/:id` | Update post (auth required) |
| DELETE | `/api/posts/:id` | Delete post (auth required) |
| GET | `/api/comments/:postId` | Get comments for a post |
| POST | `/api/comments` | Add comment |
| GET | `/api/gallery` | Get gallery photos |
| POST | `/api/upload` | Upload image (auth required) |
| POST | `/api/newsletter` | Subscribe to newsletter |
| GET | `/api/testimonials` | Get testimonials |
| GET | `/api/stats` | Get statistics |

## Deployment

### Backend (Vercel)

The backend can be deployed to Vercel with the following configuration:

```json
// vercel.json
{
  "buildCommand": "npm install",
  "outputDirectory": "backend",
  "installCommand": "cd backend && npm install",
  "framework": null,
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/backend/server.js"
    }
  ]
}
```

### Frontend (Vercel/Netlify)

The static frontend can be deployed to any static hosting service:
- Vercel (recommended for seamless integration with backend)
- Netlify
- GitHub Pages

## License

This project is for educational and non-profit purposes.

## Author

SPAN (Suicide Prevention Awareness Network - Research & Training)