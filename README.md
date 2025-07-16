# Simple App

This is an Angular 17 application using Angular Material and NgRx Component Store for state management. It features a login page, dashboard, and a listing page with a Material table.

## Features
- **Login Page**: Authenticates users and stores session info in cookies.
- **Dashboard**: Displays a welcome message and the logged-in user's email.
- **Listing Page**: Shows a list of items in a Material table with name and description columns, using NgRx Component Store for state management.
- **Material Design**: Uses Angular Material components for a modern UI.

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm

### Installation
1. Clone the repository:
   ```sh
   git clone <your-repo-url>
   cd simple-app
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

### Running the Application
Start the development server:
```sh
npm start
```
The app will be available at [http://localhost:4200](http://localhost:4200).
 
## Project Structure
```
src/
  app/
    dashboard/         # Dashboard component
    listing/           # Listing component (uses Component Store)
    login/             # Login component
    services/          # Data service for listing
    app.module.ts      # Main app module
    app.routes.ts      # Routing configuration
  assets/              # Static assets
  styles.css           # Global styles
  index.html           # Main HTML file
```

## State Management
- Uses [NgRx Component Store](https://ngrx.io/guide/component-store) for local state in the listing component.

## Material Icons
- Material Icons font is included via CDN in `index.html`.

## License
MIT
