import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import type { Position } from "../types/types";
import positionData from "../data/volunteer-positions.json";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: {
    countryCode: string;
    areaCode: string;
    number: string;
  };
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
  const navigate = useNavigate();
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
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);

      formData.append("countryCode", data.phone.countryCode);
      formData.append("areaCode", data.phone.areaCode);
      formData.append("number", data.phone.number);

      formData.append("resume", data.resume[0]);
      if (data.coverLetter) formData.append("coverLetter", data.coverLetter[0]);
      if (data.linkedIn) formData.append("linkedIn", data.linkedIn);
      if (data.github) formData.append("github", data.github);
      if (data.portfolio) formData.append("portfolio", data.portfolio);
      formData.append("workAuthorization", data.workAuthorization);
      formData.append("visaSponsorship", data.visaSponsorship);
      formData.append("referral", data.referral);
      if (data.referralName) formData.append("referralName", data.referralName);
      formData.append("school", data.school);
      formData.append("degree", data.degree);
      formData.append(
        "contactPreferences",
        JSON.stringify(data.contactPreferences)
      );

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/volunteer`,
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
            Phone:
            <div className="md:flex md:space-x-2 mt-1 space-y-2">
              <input
                {...register("phone.countryCode", {
                  required: "Country code is required",
                })}
                placeholder="Country Code (e.g., +1)"
                className="border w-full p-2 rounded"
              />
              <input
                {...register("phone.areaCode", {
                  required: "Area code is required",
                })}
                placeholder="Area Code (e.g., 212)"
                className="border w-full p-2 rounded"
              />
              <input
                {...register("phone.number", {
                  required: "Phone number is required",
                })}
                placeholder="Phone Number (e.g., 5551234)"
                className="border w-full p-2 rounded"
              />
            </div>
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
