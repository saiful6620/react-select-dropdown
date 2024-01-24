import "./App.css";
import { SaSelect } from "./components/select/SaSelect";
import options from "./components/select/data";

function App() {
  return (
    <div className="card">
      <div className="flex">
        <div>
          <SaSelect />
        </div>
        <div>
          <SaSelect />
        </div>
        <div>
          <SaSelect />
        </div>
      </div>
      <div>
        {options.map((item) => (
          <div className="listItem" key={item.id}>
            {item.name}
          </div>
        ))}
      </div>
      <div className="flex">
        <SaSelect />
        <SaSelect />
        <SaSelect />
      </div>
      <div>
        {options.map((item) => (
          <div className="listItem" key={item.id}>
            {item.name}
          </div>
        ))}
      </div>
      <div className="flex">
        <SaSelect maxWidth="220px" />
        <SaSelect maxWidth="300px" />
      </div>
    </div>
  );
}

export default App;
