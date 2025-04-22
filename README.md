# Modern Timer Application

A sleek, responsive timer application built with React and Redux that allows you to track and manage multiple timers simultaneously.

<img width="1276" alt="image" src="https://github.com/user-attachments/assets/4d729211-2256-4108-8ee3-96f4935ff321" />


## Features

- Create and manage multiple timers
- Categorize timers (Work, Study, Break, Exercise, Personal)
- Real-time timer updates
- Pause, resume, reset, and restart timers
- Auto-save timer states
- Export and import timer data
- Dark mode support
- Responsive design for all devices

## Tutorial Steps

This application was built through the following tutorial steps:

1. **Initial Setup**
   - Created React application with Redux for state management
   - Established base timer functionality with start, pause, and reset

2. **Core Timer Features**
   - Implemented timer creation and deletion
   - Added real-time timer updates using intervals
   - Implemented elapsed time tracking

3. **Categories and Organization**
   - Added category support for timers
   - Implemented filtering by category
   - Created category badges and summary view

4. **UI/UX Improvements**
   - Created editable timer labels
   - Added timer status indicators
   - Implemented responsive design considerations

5. **Data Persistence**
   - Added localStorage saving
   - Implemented auto-save functionality
   - Created export/import feature for timer data

6. **Theme Support**
   - Added dark/light mode toggle
   - Created theme-aware styling system
   - Implemented system preference detection

7. **Modern Design System**
   - Implemented CSS variables for consistent styling
   - Added Inter font with proper typography system
   - Created consistent spacing, shadows, and color palette
   - Enhanced UI with subtle animations and interactive elements

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/timer-app.git
   ```

2. Navigate to the project directory
   ```
   cd timer-app
   ```

3. Install dependencies
   ```
   npm install
   ```

4. Start the development server
   ```
   npm start
   ```

5. Open your browser to [http://localhost:3000](http://localhost:3000)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Technologies Used

- React
- Redux Toolkit
- CSS with custom variables
- LocalStorage API

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Inter Font](https://fonts.google.com/specimen/Inter) for the clean typography
- Inspired by productivity techniques like Pomodoro
