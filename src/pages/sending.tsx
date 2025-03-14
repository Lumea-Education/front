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
      const fileFields = ["resume", "coverLetter", "image"];
      const files: { [key: string]: File } = {};
      const jsonData: { [key: string]: string | null } = {};

      // JSON 데이터와 파일을 분리
      Object.keys(data).forEach((key) => {
        if (fileFields.includes(key) && data[key] instanceof FileList) {
          if (data[key].length > 0) {
            files[key] = data[key][0]; // ✅ FileList → File 변환
          }
        } else {
          jsonData[key] = data[key] as string | null;
        }
      });

      jsonData.resumePath = "pending_upload";

      try {
        // ✅ 1단계: JSON 데이터 업로드
        console.log("🚀 Sending JSON Data:", JSON.stringify(jsonData, null, 2));
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/careers`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
              Accept: "application/json",
            },
            body: JSON.stringify(jsonData),
          }
        );

        if (!response.ok) {
          let errorMessage = "";
          try {
            errorMessage = await response.json();
          } catch {
            errorMessage = await response.text();
          }
          console.error(
            `❌ JSON Upload Failed ${response.status}:`,
            errorMessage
          );
          navigate("/retry");
          return;
        }

        const jsonResult = await response.json();
        console.log("✅ JSON Response:", jsonResult);

        if (!jsonResult.applicationId) {
          console.error("❌ No application ID received, redirecting to /retry");
          navigate("/retry");
          return;
        }

        // ✅ 2단계: 파일 업로드 (resume, coverLetter, image 존재 시)
        if (Object.keys(files).length > 0) {
          const formData = new FormData();
          Object.keys(files).forEach((key) => {
            formData.append(key, files[key]);
          });

          console.log("🔍 Sending Files:", [...formData.entries()]);
          const fileResponse = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/careers/upload/${
              jsonResult.applicationId
            }`,
            {
              method: "POST",
              body: formData,
            }
          );

          const fileUploadResult = await fileResponse.json();
          console.log("✅ File Upload Response:", fileUploadResult);

          if (!fileResponse.ok) {
            console.error(
              `❌ File Upload Failed ${fileResponse.status}:`,
              fileUploadResult
            );
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
