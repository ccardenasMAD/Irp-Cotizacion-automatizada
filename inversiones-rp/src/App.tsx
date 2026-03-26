import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ChatbotPage from './pages/Chatbot.tsx';


const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/chatbot" element={<ChatbotPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
