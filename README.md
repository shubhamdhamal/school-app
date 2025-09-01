# 🏫 School Directory App

A modern school management application built with Next.js 15, TypeScript, and MySQL. This application allows users to add and view schools with their details including images.

## ✨ Features

- **Add Schools**: Add new schools with comprehensive details
- **View Schools**: Browse all schools with search functionality
- **Image Upload**: Upload school images with automatic storage
- **Responsive Design**: Modern UI that works on all devices
- **TypeScript**: Full type safety throughout the application
- **Modern Architecture**: Built with Next.js App Router

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- MySQL database
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd school-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   DB_HOST=your_database_host
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_NAME=your_database_name
   ```

4. **Set up the database**
   Create a MySQL table for schools:
   ```sql
   CREATE TABLE schools (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     address TEXT NOT NULL,
     city VARCHAR(100) NOT NULL,
     state VARCHAR(100) NOT NULL,
     contact VARCHAR(20),
     email_id VARCHAR(255) NOT NULL,
     image VARCHAR(500),
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
school-app/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── schools/      # School CRUD operations
│   │   └── upload-image/  # Image upload endpoint
│   ├── add-school/        # Add school page
│   ├── schools/           # View schools page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── lib/                   # Utility functions
│   └── db.js             # Database connection
├── public/               # Static assets
│   └── schoolImages/     # Uploaded school images
└── package.json          # Dependencies and scripts
```

## 🔧 Technologies Used

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **MySQL**: Database
- **React Hook Form**: Form handling
- **Next.js Image**: Optimized image handling

## 🛠️ API Endpoints

- `GET /api/schools` - Fetch all schools
- `POST /api/schools` - Add a new school
- `POST /api/upload-image` - Upload school image

## 🚨 Important Notes

### Security
- Database credentials are stored in environment variables
- File uploads are validated for image types only
- Input validation is implemented on both client and server

### File Structure Issues Fixed
- ✅ Migrated from mixed Pages/App Router to pure App Router
- ✅ Removed duplicate CSS files
- ✅ Updated to TypeScript for better type safety
- ✅ Improved API structure with proper error handling
- ✅ Added environment variable support for database credentials

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub.
