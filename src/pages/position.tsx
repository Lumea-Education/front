import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import type { Position } from "../types/types";
import positionData from "../data/positions.json";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  resume: FileList;
  coverLetter?: FileList;
  linkedIn?: string;
  github?: string;
  portfolio?: string;
  workAuthorization: string;
  visaSponsorship: string;
  referral: string;
  referralName?: string;
  school: string;
  degree: string;
  contactPreferences: string[];
}

const capitalizeWords = (str: string) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default function Position() {
  const { positionName } = useParams();
  const location = useLocation();
  const position = location.state?.position as Position | undefined;
  const formattedPositionName = capitalizeWords(
    position?.title || positionName?.replace(/-/g, " ") || ""
  );
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const [resumeFileName, setResumeFileName] =
    useState<string>("No file chosen");
  const [coverLetterFileName, setCoverLetterFileName] =
    useState<string>("No file chosen");

  const jobData = positionData.default;

  const visaSponsorship = watch("visaSponsorship", "Please choose");
  const referral = watch("referral", "Please choose");

  const isDeveloperOrEngineer =
    formattedPositionName.toLowerCase().includes("developer") ||
    formattedPositionName.toLowerCase().includes("engineer");

  const isDesignerOrResearcher =
    formattedPositionName.toLowerCase().includes("designer") ||
    formattedPositionName.toLowerCase().includes("researcher");

  const isCoordinatorOrHRorPM =
    formattedPositionName.toLowerCase().includes("coordinator") ||
    formattedPositionName.toLowerCase().includes("human resource") ||
    formattedPositionName.toLowerCase().includes("project manager");

  useEffect(() => {
    if (visaSponsorship !== "Please choose") {
      setValue("visaSponsorship", visaSponsorship);
    }
    if (referral !== "Please choose") {
      setValue("referral", referral);
    }
  }, [visaSponsorship, referral, setValue]);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "resume" | "coverLetter"
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    if (type === "resume") {
      setResumeFileName(files[0].name);
      setValue("resume", files);
    } else {
      setCoverLetterFileName(files[0].name);
      setValue("coverLetter", files);
    }
  };

  const onSubmit = async (data: FormData) => {
    if (!data.resume || !data.resume.length) {
      alert("Resume is required.");
      return;
    }

    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (data[key as keyof FormData] !== undefined) {
          formData.append(key, data[key as keyof FormData] as string | Blob);
        }
      });

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/careers`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Application submission failed");
      }

      const responseData = await response.json();
      console.log(responseData);

      navigate("/sending", { state: { data } });
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("There was an error submitting your application.");
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto my-5 md:flex space-y-5 md:space-y-0 px-6 md:px-0">
      <div className="md:w-7/12 md:pr-8 space-y-6">
        <h1 className="text-3xl font-bold mb-6">{formattedPositionName}</h1>

        <section>
          <h2 className="text-xl font-semibold">About Us</h2>
          <p className="text-gray-700">{jobData.aboutUs}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Job Description</h2>
          <p className="text-gray-700">
            {jobData.jobDescription.replace(
              "{position}",
              formattedPositionName
            )}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Key Responsibilities</h2>
          <ul className="list-disc ml-6 text-gray-700 space-y-1">
            {jobData.keyResponsibilities.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Qualifications</h2>
          <ul className="list-disc ml-6 text-gray-700 space-y-1">
            {jobData.qualifications.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Special Note</h2>
          <p>{jobData.specialNote}</p>
        </section>
      </div>

      <div className="md:w-5/12 p-6 border rounded-lg shadow-lg bg-white">
        <h2 className="text-xl font-semibold mb-4">Application Form</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <label className="block">
            First Name:
            <input
              {...register("firstName", { required: "Required" })}
              className="border w-full p-2 rounded mt-1"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}
          </label>

          <label className="block">
            Last Name:
            <input
              {...register("lastName", { required: "Required" })}
              className="border w-full p-2 rounded mt-1"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
            )}
          </label>

          <label className="block">
            Email:
            <input
              {...register("email", { required: "Required" })}
              className="border w-full p-2 rounded mt-1"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </label>

          <label className="block">
            Resume (PDF, DOCX):
            <div className="flex items-center mt-1">
              <label className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded cursor-pointer">
                Upload Resume
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileChange(e, "resume")}
                  className="hidden"
                />
              </label>
              <span className="ml-2 text-sm text-gray-600">
                {resumeFileName}
              </span>
            </div>
            {errors.resume && (
              <p className="text-red-500 text-sm">{errors.resume.message}</p>
            )}
          </label>

          {isCoordinatorOrHRorPM && (
            <label className="block">
              Cover Letter (PDF, DOCX):
              <div className="flex items-center mt-1">
                <label className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded cursor-pointer">
                  Upload Cover Letter
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileChange(e, "coverLetter")}
                    className="hidden"
                  />
                </label>
                <span className="ml-2 text-sm text-gray-600">
                  {coverLetterFileName}
                </span>
              </div>
            </label>
          )}

          {isDeveloperOrEngineer && (
            <label className="block">
              Github Profile:
              <input
                {...register("github", { required: "Github is required" })}
                className="border w-full p-2 rounded mt-1"
              />
              {errors.github && (
                <p className="text-red-500 text-sm">{errors.github.message}</p>
              )}
            </label>
          )}

          {isDesignerOrResearcher && (
            <label className="block">
              Portfolio Link:
              <input
                {...register("portfolio", {
                  required: "Portfolio is required",
                })}
                className="border w-full p-2 rounded mt-1"
              />
              {errors.portfolio && (
                <p className="text-red-500 text-sm">
                  {errors.portfolio.message}
                </p>
              )}
            </label>
          )}

          <label className="block">
            Do you require visa sponsorship?
            <select
              {...register("visaSponsorship")}
              className="border w-full p-2 rounded mt-1"
            >
              {visaSponsorship === "Please choose" && (
                <option value="Please choose">Please choose</option>
              )}
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </label>

          <label className="block">
            Referral:
            <select
              {...register("referral")}
              className="border w-full p-2 rounded mt-1"
            >
              {referral === "Please choose" && (
                <option value="Please choose">Please choose</option>
              )}
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </label>

          {referral === "Yes" && (
            <label className="block">
              Referral Name:
              <input
                {...register("referralName", { required: "Required" })}
                className="border w-full p-2 rounded mt-1"
              />
              {errors.referralName && (
                <p className="text-red-500 text-sm">
                  {errors.referralName.message}
                </p>
              )}
            </label>
          )}

          <button
            type="submit"
            className="bg-green-600 text-white p-2 rounded w-full mt-4"
          >
            Apply
          </button>
        </form>
      </div>
    </div>
  );
}
