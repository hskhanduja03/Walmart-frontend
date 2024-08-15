import React, { useState } from "react";

function Contactus() {
  const [formStatus, setFormStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // State to manage the loading status
  const [errors, setErrors] = useState({}); // State to manage form errors

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission
    setIsLoading(true); // Show loader when form is being submitted

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    
    // Simple validation to check for empty fields
    let formErrors = {};
    if (!data.name) formErrors.name = "Name is required";
    if (!data.email) formErrors.email = "Email is required";
    if (!data.message) formErrors.message = "Message is required";

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setIsLoading(false);
      return; // Stop form submission if there are validation errors
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setFormStatus("Submitted successfully! We'll reach out to you soon");
        event.target.reset(); // Optionally reset the form fields
        setErrors({}); // Clear errors on successful submission
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
    <>
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 grid-cols-1 ">
            <div className="lg:mb-0 mb-10">
              <div className="group w-full h-full">
                <div className="relative h-full">
                  <img
                    src="https://pagedone.io/asset/uploads/1696488602.png"
                    alt="ContactUs tailwind section"
                    className="w-full h-full lg:rounded-l-2xl rounded-2xl bg-blend-multiply bg-indigo-700"
                  />
                  <h1 className="font-manrope text-white text-4xl font-bold leading-10 absolute top-11 left-11">
                    Contact us
                  </h1>
                  <div className="absolute bottom-0 w-full lg:p-11 p-5">
                    <div className="bg-white rounded-lg p-6 block">
                      <a href="/" className="flex items-center mb-6">
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 30 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M22.3092 18.3098C22.0157 18.198 21.8689 18.1421 21.7145 18.1287C21.56 18.1154 21.4058 18.1453 21.0975 18.205L17.8126 18.8416C17.4392 18.9139 17.2525 18.9501 17.0616 18.9206C16.8707 18.891 16.7141 18.8058 16.4008 18.6353C13.8644 17.2551 12.1853 15.6617 11.1192 13.3695C10.9964 13.1055 10.935 12.9735 10.9133 12.8017C10.8917 12.6298 10.9218 12.4684 10.982 12.1456L11.6196 8.72559C11.6759 8.42342 11.7041 8.27233 11.6908 8.12115C11.6775 7.96998 11.6234 7.82612 11.5153 7.5384L10.6314 5.18758C10.37 4.49217 10.2392 4.14447 9.95437 3.94723C9.6695 3.75 9.29804 3.75 8.5551 3.75H5.85778C4.58478 3.75 3.58264 4.8018 3.77336 6.06012C4.24735 9.20085 5.64674 14.8966 9.73544 18.9853C14.0295 23.2794 20.2151 25.1426 23.6187 25.884C24.9335 26.1696 26.0993 25.1448 26.0993 23.7985V21.2824C26.0993 20.5428 26.0993 20.173 25.9034 19.8888C25.7076 19.6046 25.362 19.4729 24.6708 19.2096L22.3092 18.3098Z"
                            stroke="#4F46E5"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <h5 className="text-black text-base font-normal leading-6 ml-5">
                          470-601-1911
                        </h5>
                      </a>
                      <a href="/" className="flex items-center mb-6">
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 30 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2.81501 8.75L10.1985 13.6191C12.8358 15.2015 14.1544 15.9927 15.6032 15.9582C17.0519 15.9237 18.3315 15.0707 20.8905 13.3647L27.185 8.75M12.5 25H17.5C22.214 25 24.5711 25 26.0355 23.5355C27.5 22.0711 27.5 19.714 27.5 15C27.5 10.286 27.5 7.92893 26.0355 6.46447C24.5711 5 22.214 5 17.5 5H12.5C7.78595 5 5.42893 5 3.96447 6.46447C2.5 7.92893 2.5 10.286 2.5 15C2.5 19.714 2.5 22.0711 3.96447 23.5355C5.42893 25 7.78595 25 12.5 25Z"
                            stroke="#4F46E5"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                        <h5 className="text-black text-base font-normal leading-6 ml-5">
                          walmart1234@gmail.com
                        </h5>
                      </a>
                      <a href="/" className="flex items-center">
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 30 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M25 12.9169C25 17.716 21.1939 21.5832 18.2779 24.9828C16.8385 26.6609 16.1188 27.5 15 27.5C13.8812 27.5 13.1615 26.6609 11.7221 24.9828C8.80612 21.5832 5 17.716 5 12.9169C5 10.1542 6.05357 7.5046 7.92893 5.55105C9.8043 3.5975 11.9152 2.5 14.3495 2.5C16.7839 2.5 18.8947 3.5975 20.7701 5.55105C22.6455 7.5046 23.6991 10.1542 23.6991 12.9169"
                            stroke="#4F46E5"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                        <h5 className="text-black text-base font-normal leading-6 ml-5">
                          12-21-1996
                        </h5>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:ml-10 lg:pt-0 pt-10 h-full">
              <div className="lg:relative lg:w-full h-full lg:max-w-full mx-auto">
                <form
                  onSubmit={handleSubmit}
                  className="relative flex w-full h-full justify-center flex-col rounded-lg bg-white p-6 shadow-lg sm:p-10"
                  >
                    <h2 className="text-blue-500 text-center text-2xl font-semibold absolute top-5 left-1/2 -translate-x-1/2">Send a Message</h2>
                    <input
                      type="hidden"
                      name="access_key"
                      value="ac7f9a03-0760-4921-a048-0b7dd269ab2e"
                    />
                  <div className="mb-6">
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-gray-900"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm">{errors.name}</p>
                    )}
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-gray-900"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="johndoe@company.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-medium text-gray-900"
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Your message here..."
                    ></textarea>
                    {errors.message && (
                      <p className="text-red-500 text-sm">{errors.message}</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-blue-500 py-3 px-5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                  >
                    {isLoading ? "Submitting..." : "Submit"}
                  </button>
                  {formStatus && (
                    <p
                      className={`mt-4 text-sm ${formStatus.includes("success") ? "text-green-600" : "text-red-600"}`}
                    >
                      {formStatus}
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contactus;
