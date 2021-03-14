import './App.css';
//import * as FeatherIcon from 'react-feather';
import Dashboard from './pages/dashboard/Dashboard';

let docWidth = document.documentElement.offsetWidth;

[].forEach.call(
  document.querySelectorAll('*'),
  function(el) {
    if (el.offsetWidth > docWidth) {
      console.log(el);
    }
  }
);

function App() {
  return (
    <div className="App">
      <Dashboard/>
      {/* HELLO WORLD
      <FeatherIcon.X color="#dd515f" size={40}/>
      <FeatherIcon.Check color="#c9e5cb" size={40}/> */}
    </div>
  );
}

export default App;
