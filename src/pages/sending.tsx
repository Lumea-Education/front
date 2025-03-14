import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface LocationState {
  data?: Record<string, string | File | null>;
}

export default function Sending() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const sendRequest = async () => {
      const state = location.state as LocationState;
      console.log("📩 Received data from previous page:", state);

      if (!state?.data) {
        console.log("❌ No data received, redirecting to /retry");
        navigate("/retry");
        return;
      }

      const { data } = state;
      const fileFields = ["resume", "coverLetter"];
      const files: { [key: string]: File } = {};
      const jsonData: { [key: string]: string | null } = {};

      Object.keys(data).forEach((key) => {
        if (
          fileFields.includes(key) &&
          data[key] instanceof FileList &&
          data[key].length > 0
        ) {
          files[key] = data[key][0]; // ✅ 첫 번째 파일만 저장
        } else {
          jsonData[key] = data[key] as string | null;
        }
      });

      try {
        // ✅ 적절한 API 엔드포인트 결정
        let apiUrl = "";

        // ✅ `position.tsx` 또는 `voluntary.tsx`에서 온 데이터 → 무조건 careers API 사용
        if (jsonData.firstName && jsonData.lastName && jsonData.email) {
          apiUrl = `${import.meta.env.VITE_BACKEND_URL}/api/careers`;
        }

        // ✅ `contact.tsx`에서 온 데이터 → 문의사항 API
        else if (jsonData.email && jsonData.inquiryType) {
          apiUrl = `${import.meta.env.VITE_BACKEND_URL}/api/contact`;
        }

        // ✅ `form.tsx`에서 온 데이터 → 대기자 명단 API
        else if (
          jsonData.email &&
          !jsonData.phoneNumber &&
          !jsonData.firstName
        ) {
          apiUrl = `${import.meta.env.VITE_BACKEND_URL}/api/waitlist`;
        }

        // ❌ 위 조건에 해당하지 않으면 /retry로 이동
        if (!apiUrl) {
          console.log("❌ No matching API endpoint, redirecting to /retry");
          navigate("/retry");
          return;
        }

        // ✅ JSON 데이터 업로드
        console.log("🚀 Sending JSON Data:", JSON.stringify(jsonData, null, 2));
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(jsonData), // ✅ jsonData 자체를 전송
        });

        const jsonResult = await response.json();
        console.log("✅ JSON Response:", jsonResult);

        if (!response.ok) {
          console.log("❌ JSON Data upload failed:", jsonResult);
          navigate("/retry");
          return;
        }

        // ✅ 파일 업로드 진행 (resume & coverLetter 존재 시)
        if (Object.keys(files).length > 0 && jsonResult.applicationId) {
          const formDataToSend = new FormData();
          Object.keys(files).forEach((key) => {
            formDataToSend.append(key, files[key]);
          });

          console.log("🔍 Sending Files:", [...formDataToSend.entries()]);
          const fileResponse = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/careers/upload/${
              jsonResult.applicationId
            }`,
            {
              method: "POST",
              body: formDataToSend,
            }
          );

          const fileUploadResult = await fileResponse.json();
          console.log("✅ File Upload Response:", fileUploadResult);

          if (!fileResponse.ok) {
            console.log("❌ File Upload Failed:", fileUploadResult);
            navigate("/retry");
            return;
          }
        }

        // ✅ 모든 프로세스가 정상적으로 완료되었을 때
        navigate("/received");
      } catch (error) {
        console.error("❌ Error submitting form:", error);
        navigate("/retry");
      }
    };

    sendRequest();
  }, [location.state, navigate]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white bg-opacity-80">
      <div className="h-16 w-16 border-4 border-t-4 border-gray-300 rounded-full animate-spin border-t-green-400"></div>
      <p className="mt-4 text-lg text-gray-700">
        Please wait, we are currently processing your request.
      </p>
    </div>
  );
}
