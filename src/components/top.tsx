import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation(); // 현재 URL 경로 가져오기

  useEffect(() => {
    window.scrollTo(0, 0); // 페이지 변경될 때 항상 맨 위로 이동
  }, [pathname]); // pathname이 변경될 때 실행됨

  return null;
}
