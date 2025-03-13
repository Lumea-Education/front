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

function App() {
  return (
    <>
      <Top />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/educators" element={<Educators />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/careers/:positionName" element={<Position />} />{" "}
        {/* ✅ 채용 페이지 */}
        <Route
          path="/careers/volunteer/:volunteerName"
          element={<Voluntary />}
        />{" "}
        {/* ✅ 봉사 지원 페이지 */}
        <Route path="/demo" element={<Demo />} />
        <Route path="/form" element={<Form />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}

export default App;
