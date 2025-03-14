import { useState } from "react";
import { useForm } from "react-hook-form";
import { Clock, Mail, MessageSquare } from "lucide-react";

interface Form {
  name: string;
  email: string;
  country: string;
  areaCode: string;
  phone: string;
  inquiryType: string;
  inquiryTitle: string;
  message: string;
}

const countryData = [
  { name: "United States", code: "US", dialCode: "+1" },
  { name: "United Kingdom", code: "GB", dialCode: "+44" },
  { name: "Canada", code: "CA", dialCode: "+1" },
  { name: "Australia", code: "AU", dialCode: "+61" },
  { name: "Germany", code: "DE", dialCode: "+49" },
  { name: "France", code: "FR", dialCode: "+33" },
  { name: "Japan", code: "JP", dialCode: "+81" },
  { name: "South Korea", code: "KR", dialCode: "+82" },
  { name: "China", code: "CN", dialCode: "+86" },
  { name: "India", code: "IN", dialCode: "+91" },
  { name: "Brazil", code: "BR", dialCode: "+55" },
  { name: "Mexico", code: "MX", dialCode: "+52" },
  { name: "Italy", code: "IT", dialCode: "+39" },
  { name: "Russia", code: "RU", dialCode: "+7" },
  { name: "Spain", code: "ES", dialCode: "+34" },
  { name: "Netherlands", code: "NL", dialCode: "+31" },
  { name: "Sweden", code: "SE", dialCode: "+46" },
  { name: "Switzerland", code: "CH", dialCode: "+41" },
  { name: "Argentina", code: "AR", dialCode: "+54" },
  { name: "Turkey", code: "TR", dialCode: "+90" },
  { name: "Indonesia", code: "ID", dialCode: "+62" },
  { name: "South Africa", code: "ZA", dialCode: "+27" },
  { name: "Saudi Arabia", code: "SA", dialCode: "+966" },
  { name: "Thailand", code: "TH", dialCode: "+66" },
  { name: "Poland", code: "PL", dialCode: "+48" },
  { name: "Egypt", code: "EG", dialCode: "+20" },
  { name: "Malaysia", code: "MY", dialCode: "+60" },
  { name: "Philippines", code: "PH", dialCode: "+63" },
  { name: "Vietnam", code: "VN", dialCode: "+84" },
  { name: "Colombia", code: "CO", dialCode: "+57" },
  { name: "Pakistan", code: "PK", dialCode: "+92" },
  { name: "Bangladesh", code: "BD", dialCode: "+880" },
  { name: "Belgium", code: "BE", dialCode: "+32" },
  { name: "Greece", code: "GR", dialCode: "+30" },
  { name: "Ukraine", code: "UA", dialCode: "+380" },
  { name: "Norway", code: "NO", dialCode: "+47" },
  { name: "Austria", code: "AT", dialCode: "+43" },
  { name: "Czech Republic", code: "CZ", dialCode: "+420" },
  { name: "Israel", code: "IL", dialCode: "+972" },
  { name: "Portugal", code: "PT", dialCode: "+351" },
  { name: "Ireland", code: "IE", dialCode: "+353" },
  { name: "Denmark", code: "DK", dialCode: "+45" },
  { name: "New Zealand", code: "NZ", dialCode: "+64" },
];

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedSupport, setSelectedSupport] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState(countryData[0]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<Form>();

  const inquiryTypes = [
    "Technical Support",
    "Account Inquiry",
    "Payment Issues",
    "Course Information",
    "Partnership Proposal",
    "Other",
  ];

  const onSubmit = (data: Form) => {
    console.log(data);
    setIsSubmitted(true);
    reset();

    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  const handleSupportOption = (type: string) => {
    setSelectedSupport(type);
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const country = countryData.find((c) => c.code === e.target.value);
    if (country) {
      setSelectedCountry(country);
      setValue("areaCode", country.dialCode);
    }
  };

  return (
    <div className="max-w-[1440px] md:my-4 md:mx-auto p-6 px-6 mx-6 bg-[#f7f6f6] rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <h2 className="md:text-5xl text-2xl font-bold mb-6 text-secondary-helper text-center">
            Contact Us
          </h2>

          {isSubmitted ? (
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h3 className="text-xl font-semibold text-green-700 mb-2">
                Thank You!
              </h3>
              <p className="text-green-600">
                Your inquiry has been successfully submitted. We'll get back to
                you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none transition ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="John Doe"
                  {...register("name", { required: "Please enter your name" })}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none transition ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="example@email.com"
                  {...register("email", {
                    required: "Please enter your email address",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Please enter a valid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Phone Number
                </label>
                <div className="md:flex md:gap-2 space-y-5">
                  <select
                    {...register("country", { required: true })}
                    className="md:w-1/3 w-full px-4 py-2 border rounded-md"
                    onChange={handleCountryChange}
                  >
                    {countryData.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.name} ({country.dialCode})
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    {...register("areaCode", { required: true })}
                    className="md:w-1/4 w-full px-4 py-2 border rounded-md bg-gray-100"
                    readOnly
                    value={selectedCountry.dialCode}
                  />
                  <input
                    type="tel"
                    {...register("phone", {
                      required: "Please enter your phone number",
                    })}
                    className="md:w-1/2 w-full px-4 py-2 border rounded-md"
                    placeholder="1234567890"
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Inquiry Type
                </label>
                <select
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none transition ${
                    errors.inquiryType ? "border-red-500" : "border-gray-300"
                  }`}
                  {...register("inquiryType", {
                    required: "Please select an inquiry type",
                  })}
                >
                  <option value="">Select Inquiry Type</option>
                  {inquiryTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.inquiryType && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.inquiryType.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Inquiry Title
                </label>
                <input
                  type="text"
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none transition ${
                    errors.inquiryTitle ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your inquiry title"
                  {...register("inquiryTitle", {
                    required: "Please enter an inquiry title",
                  })}
                />
                {errors.inquiryTitle && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.inquiryTitle.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Inquiry Message
                </label>
                <textarea
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none transition min-h-32 ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Please provide details about your inquiry"
                  rows={4}
                  {...register("message", {
                    required: "Please enter your inquiry message",
                  })}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-primary-submit text-white font-medium rounded-md focus:outline-none transition shadow-md"
              >
                Submit Inquiry
              </button>
            </form>
          )}
        </div>

        <div className="md:w-64 flex flex-col">
          <h2 className="text-2xl font-bold mb-6 text-secondary-helper text-center">
            Other Support Options
          </h2>

          <div className="space-y-4">
            <div
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                selectedSupport === "chat"
                  ? "bg-indigo-50 border-indigo-200"
                  : "hover:bg-gray-50 border-gray-200"
              }`}
              onClick={() => handleSupportOption("chat")}
            >
              <div className="flex items-center space-x-3 mb-2">
                <MessageSquare className="text-indigo-600" size={20} />
                <h4 className="font-medium">Live Chat</h4>
              </div>
              <p className="text-sm text-gray-600">
                Talk to a support agent in real-time
              </p>
            </div>

            <div
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                selectedSupport === "email"
                  ? "bg-indigo-50 border-indigo-200"
                  : "hover:bg-gray-50 border-gray-200"
              }`}
              onClick={() => handleSupportOption("email")}
            >
              <div className="flex items-center space-x-3 mb-2">
                <Mail className="text-indigo-600" size={20} />
                <h4 className="font-medium">Email Support</h4>
              </div>
              <p className="text-sm text-gray-600">
                Contact us at support@edutech.com
              </p>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="text-gray-500" size={18} />
                <h4 className="font-medium text-gray-700">Response Time</h4>
              </div>
              <p className="text-sm text-gray-600">
                We typically respond within 24 hours. Live chat support is
                available Monday to Friday, 9 AM to 6 PM.
              </p>
            </div>
          </div>

          {selectedSupport === "chat" && (
            <div className="mt-4 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
              <h5 className="font-medium text-indigo-700 mb-2">
                Start Chat Support
              </h5>
              <p className="text-sm text-indigo-600 mb-3">
                Hours: Weekdays 9:00 AM - 6:00 PM
              </p>
              <button className="w-full px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-700 transition">
                Start Chat
              </button>
            </div>
          )}

          {selectedSupport === "email" && (
            <div className="mt-4 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
              <h5 className="font-medium text-indigo-700 mb-2">
                Email Support
              </h5>
              <p className="text-sm text-indigo-600 mb-1">
                General Inquiries: support@edutech.com
              </p>
              <p className="text-sm text-indigo-600 mb-3">
                Technical Support: tech@edutech.com
              </p>
              <p className="text-xs text-gray-500">
                We respond to email inquiries within 24 hours.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
