import './App.css';
import Create from './components/create';
import Read from './components/read';
import Update from './components/update';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {


  return (
    <BrowserRouter>
      <div className="main">
        <h2 className="main-header">React Crud Operations</h2>
        <Routes>
        <Route exact path='/' element={<Read/>} />
          <Route exact path='/create' element={<Create/>} />
          <Route path='/update' element={<Update/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
