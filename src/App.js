import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 to-purple-600">
      <header className="flex flex-col items-center">
        <img src={logo} className="w-32 h-32 animate-spin-slow" alt="logo" />
        <p className="mt-4 text-xl text-white">
          Edit <code className="bg-white p-1 rounded text-black">src/App.js</code> Changed to Trello.
        </p>
        <a
          className="mt-4 text-white hover:text-gray-200 underline"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
