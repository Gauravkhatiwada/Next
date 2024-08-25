// OtpModal.tsx

import React, { useState } from "react";

interface OtpModalProps {
  isOpen: boolean;
  toggleModal: () => void;
  handleVerifyOtp: (code: string) => void;
}

const OtpModal: React.FC<OtpModalProps> = ({
  isOpen,
  toggleModal,
  handleVerifyOtp,
}) => {
  const [code, setCode] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    handleVerifyOtp(code);
  };

  return (
    <div
      id="otp-modal"
      tabIndex={-1}
      aria-hidden="true"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-auto"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow overflow-y-auto max-h-[90vh]">
          <div className="flex justify-end px-4 md:px-5 rounded-t dark:border-gray-600">
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={toggleModal}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="text-xl font-semibold">Enter OTP</div>
          </div>
          <div className="p-4 md:p-5">
            <form className="space-y-4">
              <div className="relative cb-shadow">
                <input
                  type="text"
                  name="otp"
                  id="otp-input"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-10 p-2.5"
                  placeholder="Enter OTP"
                  required
                />
                <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <i className="fa-regular fa-key text-gray-400"></i>
                </span>
              </div>
              <button
                type="button"
                className="primary-orangebg rounded-sm px-3 py-2 text-white transition-transform duration-300 ease-in-out hover:bg-orange-700 hover:scale-105 w-full"
                onClick={handleSubmit}
              >
                Verify OTP
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpModal;
