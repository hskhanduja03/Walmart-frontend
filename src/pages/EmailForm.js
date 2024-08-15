import React, { useState } from "react";

function EmailForm() {
  const [formStatus, setFormStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State to manage the loading status

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission
    setIsLoading(true); // Show loader when form is being submitted

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setFormStatus("Form submitted successfully!");
        event.target.reset(); // Optionally reset the form fields
      } else {
        setFormStatus("Failed to submit the form.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormStatus("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false); // Hide loader when submission is done
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        id="form"
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <input
          type="hidden"
          name="access_key"
          value="ac7f9a03-0760-4921-a048-0b7dd269ab2e"
        />

        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            required
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="message"
            className="block text-gray-700 font-bold mb-2"
          >
            Message
          </label>
          <textarea
            name="message"
            required
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          ></textarea>
        </div>

        <input
          type="checkbox"
          name="botcheck"
          className="hidden"
          style={{ display: "none" }}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 flex items-center justify-center"
          disabled={isLoading} // Disable the button while loading
        >
          {isLoading ? (
            <svg
              className="animate-spin h-5 w-5 mr-3 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
          ) : (
            "Submit Form"
          )}
        </button>

        {formStatus && <p className="mt-4 text-center text-green-600">{formStatus}</p>}
      </form>
    </div>
  );
}

export default EmailForm;
