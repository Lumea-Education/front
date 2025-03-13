import { useEffect, useState } from "react";

export default function Demo() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const mobileCheck = /iPhone|iPad|iPod|Android/i.test(userAgent);
    setIsMobile(mobileCheck);

    if (!mobileCheck) {
      let downloadUrl = "";

      if (userAgent.includes("Win")) {
        downloadUrl = "https://example.com/download.exe"; // Windows
      } else if (userAgent.includes("Mac")) {
        downloadUrl = "https://example.com/download.dmg"; // Mac
      } else if (userAgent.includes("Linux")) {
        downloadUrl = "https://example.com/download.AppImage"; // Linux
      } else {
        alert("Your OS is not supported for automatic download.");
        return;
      }

      // 팝업 창에서 다운로드 진행
      const popup = window.open(downloadUrl, "_blank");

      if (!popup) {
        alert("Popup blocked! Please allow popups for automatic download.");
      }
    }
  }, []);

  return (
    <div className="my-48 text-center space-y-48">
      <h1 className="text-6xl text-primary-submit">
        Thank you for choosing us!
      </h1>

      {isMobile ? (
        // 모바일이면 Google Play & App Store 카드 표시
        <div className="flex flex-col items-center space-y-8">
          {/* Google Play Store Card */}
          <div className="bg-gray-100 p-6 rounded-2xl shadow-lg w-80">
            <h2 className="text-2xl font-bold text-gray-800">
              Download on Google Play
            </h2>
            <p className="text-gray-600 mt-2">
              Get our app for Android devices.
            </p>
            <a
              href="https://play.google.com/store/apps/details?id=com.example"
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
            >
              Get it on Google Play
            </a>
          </div>

          {/* Apple App Store Card */}
          <div className="bg-gray-100 p-6 rounded-2xl shadow-lg w-80">
            <h2 className="text-2xl font-bold text-gray-800">
              Download on the App Store
            </h2>
            <p className="text-gray-600 mt-2">Get our app for iPhone & iPad.</p>
            <a
              href="https://apps.apple.com/app/id123456789" // 실제 App Store 링크로 변경 필요
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
            >
              Get it on the App Store
            </a>
          </div>
        </div>
      ) : (
        // 데스크톱이면 기존 메시지 + 수동 다운로드 링크 제공
        <div>
          <p className="text-xl text-neutral-body w-3/6 mx-auto">
            We are glad that you have decided to start a journey with us. Lumea
            Education web application should be downloaded shortly! If not,
            please click here to download the program!
          </p>
          <ul className="my-20 text-blue-500 underline space-y-2 md:grid md:grid-cols-3 max-w-[1000px] md:mx-auto">
            <li>
              <a href="https://example.com/download.exe" target="_blank">
                Download for Windows
              </a>
            </li>
            <li>
              <a href="https://example.com/download.dmg" target="_blank">
                Download for Mac
              </a>
            </li>
            <li>
              <a href="https://example.com/download.AppImage" target="_blank">
                Download for Linux
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
