import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Details from './components/Details';

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="details" element={<Details />} />
  </Routes>
);

export default App;
