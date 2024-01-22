import "./App.css";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  return (
    <div className='App'>
      <h1>KYC Samples</h1>
      <main className='main-container'>
        <section>
          <h2 className='section-header'>SMILE ID SDK SAMPLE</h2>
          <button className='section-btn' onClick={() => navigate("/smile-id")}>
            Try this out
          </button>
        </section>
        <section>
          <h2 className='section-header'>REACT WEBCAM SAMPLE</h2>
          <button
            className='section-btn'
            onClick={() => navigate("/react-webcam")}>
            Try this out
          </button>
        </section>
      </main>
    </div>
  );
}

export default App;
