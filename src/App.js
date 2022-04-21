import "./App.css";
import HomePage from "./Pages/HomePage";
import { MovieProvider } from "./Reducer/MovieContext";

function App() {
  return (
    <div className='App'>
      <MovieProvider>
        <HomePage />
      </MovieProvider>
    </div>
  );
}

export default App;
