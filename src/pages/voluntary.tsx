import { useLocation, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import type { Position } from "../types/types";

// Import volunteer position data
import positionData from "../data/volunteer-positions.json";

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

export default function Voluntary() {
  const { volunteerName } = useParams();
  const location = useLocation();
  const position = location.state?.position as Position | undefined;
  const formattedPositionName = capitalizeWords(
    position?.title || volunteerName?.replace(/-/g, " ") || ""
  );

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

  const onSubmit = (data: FormData) => {
    if (!data.resume || !data.resume.length) {
      alert("Resume is required.");
      return;
    }
    console.log("Application Submitted:", {
      position: formattedPositionName,
      ...data,
    });
    alert("Application Submitted!");
  };

  return (
    <div className="max-w-[1440px] mx-auto my-5 md:flex space-y-5 md:space-y-0 px-6 md:px-0">
      {/* Left Section (70% - Job Description) */}
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

      {/* Right Section (30% - Application Form) */}
      <div className="md:w-5/12 p-6 border rounded-lg shadow-lg bg-white">
        <h2 className="text-xl font-semibold mb-4">
          Volunteer Application Form
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <label className="block">
            First Name:
            <input
              {...register("firstName", { required: "Required" })}
              className="border w-full p-2 rounded mt-1"
            />
          </label>

          <label className="block">
            Last Name:
            <input
              {...register("lastName", { required: "Required" })}
              className="border w-full p-2 rounded mt-1"
            />
          </label>

          <label className="block">
            Email:
            <input
              {...register("email", { required: "Required" })}
              className="border w-full p-2 rounded mt-1"
            />
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
