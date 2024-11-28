import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NavigationContext } from '../contexts/NavigationContext';

const Card = () => {
    const { currentStep, setCurrentStep } = useContext(NavigationContext);
    const navigate = useNavigate();

    const handleStartQuiz = () => {
        if (currentStep === 1) {
            setCurrentStep(2); // Update to step 2
            navigate('/quiz-app/quiz'); // Navigate to the quiz page
        } else {
            alert('Please complete the steps in order!'); // Prevent improper navigation
        }
    };

    return (
        <div className="mx-8 max-w-5xl rounded-xl border border-gray-800 bg-gray-950 px-6 sm:px-8 md:px-12 py-6 sm:py-8 shadow-md shadow-gray-700">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white">
                AI Maturity Quiz
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-400 mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin id arcu a ipsum gravida consectetur. Sed euismod, ex vel dignissim pellentesque, arcu nunc pharetra ipsum, vitae malesuada est velit vel neque.
            </p>

            <button
                onClick={handleStartQuiz}
                className="w-full mt-8 bg-[#0064ff] hover:bg-[#004fff] text-white font-semibold py-4 px-8 rounded-xl transition-all"
            >
                Start Quiz
            </button>
        </div>
    );
};

export default Card;
