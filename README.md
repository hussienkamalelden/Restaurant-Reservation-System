# Restaurant Reservation System

Vue.js application for managing restaurant branch reservations, built with Vue 3 Composition API, Pinia state management, and Tailwind CSS.

### [Live demo](https://foodics-task.vercel.app)

## 📊 System Flow

![Restaurant Reservation System Flowchart](https://www.mediafire.com/view/8e247are3c3hqxr/Restaurant_Reservation_System_Flowchart.png/file)

## 🏗️ Project Structure

The project follows a **feature-first architecture** for better scalability and maintainability:

```
src/
├── api/                    # API configuration and interceptors
│   └── axios.js           # Axios instance with auth interceptors
├── assets/                # Static assets (images, fonts, styles)
│   ├── images/
│   └── icomoon/          # Icon font files
├── components/            # Reusable UI components
│   ├── CustomDialog.vue  # Modal dialog component
│   ├── Loading.vue       # Loading spinner
│   ├── Spinner.vue       # Alternative spinner
│   ├── Tag.vue          # Tag/chip component
│   └── Toast.vue        # Toast notification system
├── composables/          # Shared composable functions (empty in current version)
├── features/             # Feature-based modules
│   ├── auth/            # Authentication feature
│   │   ├── components/  # Auth-specific components
│   │   ├── pages/       # Auth pages (LoginPage)
│   │   └── services/    # Auth API services
│   └── branches/        # Branch management feature
│       ├── components/  # Branch-specific components
│       ├── composables/ # Branch-specific logic
│       ├── pages/       # Branch pages (BranchesPage)
│       ├── services/    # Branch API services
│       └── store/       # Branch state management
├── layouts/             # Layout components
│   ├── DefaultLayout.vue
│   ├── Footer.vue
│   └── Navbar.vue
├── router/              # Vue Router configuration
├── utils/               # Utility functions
└── main.js             # Application entry point
```

## 🎯 Key Implementation Decisions

### 1. **Feature-First Architecture**

**Rationale**: Organizes code by business features rather than technical layers, making it easier to:

- Scale the application with new features
- Maintain feature isolation
- Enable team collaboration on different features

### 2. **Vue 3 Composition API**

**Rationale**:

- More flexible logic reuse through composables
- Cleaner, more concise component code

### 3. **Pinia for State Management**

**Rationale**:

- Official Vue state management solution
- Syntax is much cleaner

### 4. **Composables Pattern for Logic Reuse**

**Examples**: `useSlots.js`, `useBranchBatchProcessor.js`

**Rationale**:

- Encapsulates and reuses complex business logic
- Improves code maintainability

### 5. **Service Layer Pattern**

**Examples**: `branchesService.js`, `loginService.js`

**Rationale**:

- Separates API logic from components
- Enables easy API endpoint changes

### 6. **Batch Processing for API Operations**

**Implementation**: `useBranchBatchProcessor.js`

**Rationale**:

- Prevents API rate limiting issues
- Improves user experience with progress feedback
- Handles partial failures gracefully
- Reduces server load

### 7. **Form Validation with VeeValidate + Yup**

**Rationale**:

- Declarative schema-based validation
- Excellent Vue 3 integration
- Better user experience with real-time validation

### 8. **Tailwind CSS for Styling**

**Rationale**:

- Utility-first approach for rapid development
- Consistent design system
- Smaller bundle size with purging
- Excellent responsive design capabilities

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/hussienkamalelden/Restaurant-Reservation-System.git
   cd Restaurant-Reservation-System
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   The application is configured to proxy API requests to `https://api.foodics.dev/v5` via Vite's proxy configuration.

4. **Development Server**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

5. **Build for Production**

   ```bash
   npm run build
   ```

6. **Preview Production Build**
   ```bash
   npm run preview
   ```

## 📱 Usage Instructions

### Authentication

1. Navigate to `/login` to access the login page
2. The application uses token-based authentication stored in localStorage
3. Protected routes automatically redirect to login if no valid token exists

### Branch Management

1. **View Branches**: Navigate to `/branches` to see all restaurant branches
2. **Edit Branch Settings**: Click on any branch that accepts reservations to:
   - Modify reservation duration
   - Configure available tables
   - Set reservation time slots for each day of the week
   - Apply Saturday settings to all days
3. **Disable Branch**: Use the "Disable Branch" button to stop accepting reservations

### Key Features

- **Time Slot Validation**: Prevents overlapping reservations and validates against business hours
- **Batch Operations**: Efficiently handles multiple branch updates
- **Real-time Feedback**: Toast notifications for user actions

## 🛠️ Technical Features

### Performance Optimizations

- **Lazy Loading**: Routes are loaded on-demand using dynamic imports
- **Computed Properties**: Efficient reactive data transformations
- **Batch API Processing**: Prevents overwhelming the server with concurrent requests

### Error Handling

- **Axios Interceptors**: Automatic token error handling
- **Form Validation**: Real-time validation with user-friendly error messages
- **API Error Management**: Graceful handling of network and server errors

### State Management

- **Centralized Store**: Branch data managed through Pinia store
- **Reactive Updates**: Automatic UI updates when data changes

## 🔧 Configuration

### API Configuration

The API base URL is configured in `vite.config.js`:

```javascript
server: {
  proxy: {
    '/api': {
      target: 'https://api.foodics.dev/v5',
      changeOrigin: true,
      secure: true,
      rewrite: (path) => path.replace(/^\/api/, ''),
    },
  },
}
```

### Styling Configuration

Custom Tailwind theme configuration in `src/style.css`:

```css
@theme {
  --color-primary: #5c2d91;
  --color-text: #1f1f23;
}
```

## 📦 Dependencies

### Core Dependencies

- **Vue 3**: Progressive JavaScript framework
- **Vue Router 4**: Official router for Vue.js
- **Pinia**: State management library
- **Axios**: HTTP client for API requests
- **VeeValidate**: Form validation library
- **Yup**: Schema validation library
- **Tailwind CSS**: Utility-first CSS framework

### Development Dependencies

- **Vite**: Fast build tool and dev server
- **Sass**: CSS preprocessor for custom styles

## 🎨 Design System

The application uses a consistent design system built with Tailwind CSS:

- **Primary Color**: Purple (`#5c2d91`)
- **Text Color**: Dark gray (`#1f1f23`)
- **Responsive Breakpoints**: Mobile-first approach
- **Component Library**: Reusable components with consistent styling
