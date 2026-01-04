# Name Drawer - Frontend

Angular frontend for the Name Drawer application.

## Prerequisites

- Node.js (v18 or higher)
- npm (comes with Node.js)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:4200`

## Features

- ✅ Add names to the list
- ✅ View all added names
- ✅ Draw a random name from the list
- ✅ Delete individual names
- ✅ Clear all names at once
- ✅ Responsive design

## Usage

1. Make sure the backend API is running at `http://localhost:5000`
2. Start the frontend with `npm start`
3. Open `http://localhost:4200` in your browser

## Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Deployment to Debian

For deployment, you can serve the built files using Nginx:

1. Build the application:
```bash
npm run build
```

2. Copy the contents of `dist/name-drawer-frontend/` to your web server directory:
```bash
sudo cp -r dist/name-drawer-frontend/* /var/www/html/
```

3. Configure Nginx to serve the application and proxy API requests to the backend.
