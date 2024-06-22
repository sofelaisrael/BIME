import Cale from "./Cale.jsx";
import ToDoList from './ToDoList.jsx';
import "./App.css";
import "./index.css";

function App() {


  return (
    <>
      <div className="advanced-emoji-background">
       
        <ToDoList />
        <Cale />

        {[...Array(20)].map((_, index) => (
          <div key={index} className="emoji">DO IT</div>
        ))}
      </div>
    </>
  );
}

export default App;
