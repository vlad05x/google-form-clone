import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { CreateForm } from "./pages/CreateForm/CreateForm";
import { FillForm } from "./pages/FillForm/FillForm";
import { FormResponses } from "./pages/FormResponses/FormResponses";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <header className="app-header">
          <nav className="__container nav-container">
            <div className="logo-wrap">
              <Link to="/" className="logo-text">
                <span className="logo-icon">☰</span>
                Forms Clone
              </Link>
            </div>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/forms/new" element={<CreateForm />} />
            <Route path="/forms/:id/fill" element={<FillForm />} />
            <Route path="/forms/:id/responses" element={<FormResponses />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
