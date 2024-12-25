"use client";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineClose } from "react-icons/ai";
import DatePicker from "react-datepicker";
import { FaCalendarAlt } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import "./components/custom-datepicker.css";

const Home = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [dob, setDob] = useState(null);
  const [verificationType, setVerificationType] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const setFunctionMap = {
      firstName: setFirstName,
      lastName: setLastName,
      email: setEmail,
      mobile: setMobile,
    };
    setFunctionMap[name](value);
  };

  const handleDateChange = (date) => {
    // Calculate today's date minus 18 years
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 18);

    if (date > minDate) {
      toast.error("You must be at least 18 years old to register.");
      setDob(null); // Reset the date to null
    } else {
      setDob(date);
    }
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleMobileInput = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setMobile(value);
  };

  const generateOtp = (length) => {
    let otp = "";
    for (let i = 0; i < length; i++) otp += Math.floor(Math.random() * 10);
    return otp;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!firstName) return toast.error("Please enter your first name.");
    if (!lastName) return toast.error("Please enter your last name.");
    if (!email) return toast.error("Please enter your email address.");
    if (!validateEmail(email)) return toast.error("Invalid email address.");
    if (!mobile) return toast.error("Please enter your mobile number.");
    if (!dob) return toast.error("Please enter your date of birth.");
    if (!verificationType)
      return toast.error("Please select a verification type.");

    const otpLength = verificationType === "email" ? 6 : 4;
    const newOtp = generateOtp(otpLength);
    setGeneratedOtp(newOtp);

    console.log(`Generated OTP: ${newOtp}`); // Debugging: Log OTP
    setOtp("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setOtp("");
  };

  const handleVerifyOtp = () => {
    if (otp === generatedOtp) {
      toast.success("OTP verified successfully!");
      closeModal();
    } else {
      toast.error("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 relative p-4">
      <div className="bg-white rounded-3xl shadow-lg border border-indigo-500 max-w-md w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4">
        <h2 className="text-2xl font-semibold  text-center bg-indigo-500 p-3 text-white rounded-t-3xl">
          User Information
        </h2>
        <div className="p-8">
          <form>
            <div className="mb-4">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name Test
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={firstName}
                onChange={handleInputChange}
                required
                className="mt-1 p-3 w-full border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={handleInputChange}
                required
                className="mt-1 p-3 w-full border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleInputChange}
                required
                className="mt-1 p-3 w-full border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="mobile"
                className="block text-sm font-medium text-gray-700"
              >
                Mobile
              </label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                value={mobile}
                onChange={handleMobileInput}
                maxLength="10"
                required
                className="mt-1 p-3 w-full border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="dob"
                className="block text-sm font-medium text-gray-700"
              >
                Date of Birth
              </label>
              <div className="relative mt-1">
                <DatePicker
                  selected={dob}
                  onChange={handleDateChange}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Select your date of birth"
                  required
                  className="w-full p-3 pl-10 pr-4 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  calendarClassName="custom-calendar"
                />
                <FaCalendarAlt
                  className="absolute left-3 top-2 text-gray-500 mt-1"
                  size={20}
                />
              </div>
            </div>

            <div className="mb-4 mt-5">
  <p className="block text-sm font-medium text-gray-700">
    Verification Type
  </p>
  <div className="flex gap-4 mt-2">
    <label className="flex items-center">
      <input
        type="radio"
        name="verificationType"
        value="email"
        onChange={() => setVerificationType("email")}
        className="mr-2 w-5 h-5 text-indigo-500 focus:ring-indigo-500"
      />
      Email Verification
    </label>
    <label className="flex items-center">
      <input
        type="radio"
        name="verificationType"
        value="mobile"
        onChange={() => setVerificationType("mobile")}
        className="mr-2 w-5 h-5 text-indigo-500 focus:ring-indigo-500"
      />
      Mobile Verification
    </label>
  </div>
</div>


            <div className="flex justify-center mt-5">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg border border-indigo-500 w-full relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl"
            >
              <AiOutlineClose />
            </button>
            <header className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-center">
                {verificationType === "email" ? "Email" : "Mobile"} OTP
                Verification
              </h2>
              <p className="text-sm text-slate-500 text-center">
                Enter the {verificationType === "email" ? "6" : "4"}-digit
                verification code sent to your{" "}
                {verificationType === "email"
                  ? "email address"
                  : "phone number"}
                .
              </p>
            </header>

            <div className="flex items-center justify-center gap-3 mb-6">
              {[...Array(verificationType === "email" ? 6 : 4)].map(
                (_, index) => (
                  <input
                    key={index}
                    type="text"
                    className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                    pattern="\d*"
                    maxLength="1"
                    value={otp[index] || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      const newOtp = otp.split("");
                      newOtp[index] = value;
                      setOtp(newOtp.join(""));
                      if (value && index < otp.length - 1) {
                        const nextInput = document.getElementById(
                          `otp-${index + 1}`
                        );
                        if (nextInput) nextInput.focus();
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace" && index > 0) {
                        const prevInput = document.getElementById(
                          `otp-${index - 1}`
                        );
                        if (prevInput) prevInput.focus();
                      }
                    }}
                    id={`otp-${index}`}
                    placeholder="—"
                  />
                )
              )}
            </div>

            <div className="mt-4 flex justify-center">
              <button
                onClick={handleVerifyOtp}
                className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Verify OTP
              </button>
            </div>

            <div className="text-sm text-slate-500 mt-4 text-center">
              Didn't receive code?{" "}
              <a
                className="font-medium text-indigo-500 hover:text-indigo-600"
                href="#0"
              >
                Resend
              </a>
            </div>
          </div>
        </div>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Home;
