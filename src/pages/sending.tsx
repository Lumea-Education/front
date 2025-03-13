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

      if (!state?.data) {
        navigate("/retry");
        return;
      }

      const { data } = state;
      const formDataToSend = new FormData();

      Object.keys(data).forEach((key) => {
        if (data[key] !== null && data[key] !== undefined) {
          formDataToSend.append(key, data[key] as string | Blob);
        }
      });

      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/careers`,
          {
            method: "POST",
            body: formDataToSend,
          }
        );

        if (response.ok) {
          navigate("/received");
        } else {
          navigate("/retry");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
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
