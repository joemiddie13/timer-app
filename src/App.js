import './App.css';
import Header from './components/Header';
import TimerBoard from './components/TimerBoard';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="app-content">
        <TimerBoard />
      </main>
    </div>
  );
}

export default App;
