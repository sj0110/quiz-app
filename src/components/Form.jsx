import React, { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { NavigationContext } from '../contexts/NavigationContext';

const Form = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const { currentStep, setCurrentStep } = useContext(NavigationContext);

  // Destructure score and selectedAnswers from location.state
  const { score, selectedAnswers } = location.state || {};

  const [loading, setLoading] = useState(false); // Track loading state

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Function to handle form submission
  const onSubmit = async (data) => {
    const payload = {
      name: data.name,
      email: data.email,
      company: data.company,
      score,
      selectedAnswers,  // Array of selected options
    };

    setLoading(true); // Set loading to true when submission starts

    try {
      // console.log("Web App URL:", import.meta.env.VITE_WEB_APP_URL);
      const response = await fetch(import.meta.env.VITE_WEB_APP_URL, {  // Replace with your web app URL
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Assuming the response will be successful, reset the form and navigate to Result
      reset();

      // Navigate to the Result page, passing score and selectedAnswers as state
      navigate('/quiz-app/result', { state: { score, selectedAnswers } });
      
    } catch (error) {
      console.error('Network error:', error);
    } finally {
      setLoading(false); // Set loading to false when done
    }
  };
  
  useEffect(() => {
    if (currentStep < 2) {
      navigate('/quiz-app/quiz'); // Redirect if user skips navigation
    } else {
      setCurrentStep(3); // Update step on valid entry
    }
  }, [currentStep, navigate, setCurrentStep]);

  return (
    <div className="relative mx-8 max-w-5xl rounded-xl border border-gray-800 bg-gray-950 px-6 sm:px-8 md:px-12 py-6 sm:py-8 shadow-md shadow-gray-700 flex flex-col sm:flex-row items-center mb-40">
      <div className="w-full">
        <div className='mt-8'>
          <h2 className="text-white text-xl sm:text-3xl font-semibold text-center">
            Hurray! You completed the assessment
          </h2> <br />
          <h3 className="text-gray-500 text-lg sm:text-2xl mb-8 text-center">
            Kindly fill the details to check your <span className='text-[#0064FF]'>AI maturity score</span> and <span className='text-[#0064FF]'>Category.</span>
          </h3>
        </div>

        {/* Show loader if the form is submitting */}
        {loading && (
          <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="animate-spin border-t-4 border-b-4 border-white rounded-full w-16 h-16"></div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 relative z-10">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="text-white text-sm">Name</label>
            <input
              {...register('name', { 
                required: 'Name is required', 
                minLength: {
                  value: 3,
                  message: 'Name must be at least 3 characters long',
                },
              })}
              id="name"
              placeholder='Enter your name'
              className="w-full mt-2 px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="text-white text-sm">Company Email ID</label>
            <input
              {...register('email', { 
                required: 'Email is required', 
                pattern: {
                  value: /^[A-Z0-9._%+-]+@(?!gmail\.com|yahoo\.com|hotmail\.com)[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'Please use a business email address (no Gmail, Yahoo, or Hotmail)',
                },
              })}
              id="email"
              placeholder='Enter your business email address'
              type="email"
              className="w-full mt-2 px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          {/* Company Name Field */}
          <div>
            <label htmlFor="company" className="text-white text-sm">Company Name</label>
            <input
              {...register('company', { 
                required: 'Company name is required',
                minLength: {
                  value: 2,
                  message: 'Company name must be at least 2 characters long',
                },
              })}
              id="company"
              placeholder='Enter your company name'
              className="w-full mt-2 px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600"
            />
            {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company.message}</p>}
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full my-8 py-2 px-4 bg-[#0064ff] text-white rounded-lg hover:bg-[#004fff] focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
