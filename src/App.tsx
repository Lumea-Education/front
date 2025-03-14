import { Routes, Route } from "react-router-dom";
import Top from "./components/top";
import Home from "./pages/home";
import Educators from "./pages/educators";
import Careers from "./pages/careers";
import Position from "./pages/position";
import Voluntary from "./pages/voluntary"; // ✅ 봉사 지원 추가
import Demo from "./pages/demo";
import Form from "./pages/form";
import Contact from "./pages/contact";
import Sending from "./pages/sending";
import Received from "./pages/received";
import Retry from "./pages/retry";

function App() {
  return (
    <>
      <Top />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/educators" element={<Educators />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/careers/:positionName" element={<Position />} />{" "}
        <Route
          path="/careers/volunteer/:volunteerName"
          element={<Voluntary />}
        />{" "}
        <Route path="/sending" element={<Sending />} />
        <Route path="/received" element={<Received />} />
        <Route path="/retry" element={<Retry />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/form" element={<Form />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}

export default App;
