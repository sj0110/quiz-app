import React, {useContext, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { NavigationContext } from '../contexts/NavigationContext';
import { useState } from 'react';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { currentStep } = useContext(NavigationContext);

  const { score, selectedAnswers = [] } = location.state || {}; // Extract score and selected answers from location state
  const totalQuestions = selectedAnswers.length;
  const [hover, sethover] = useState(false);

  // Calculate the maximum possible score (assuming max score per question is 4)
  const maxScore = 4 * totalQuestions;

  // Determine the range for each category
  const categoryRange = maxScore / 4;

  // Map score to category
  let category;
  if (score >= 1 && score <= categoryRange) {
    category = 'D';
  } else if (score > categoryRange && score <= categoryRange * 2) {
    category = 'C';
  } else if (score > categoryRange * 2 && score <= categoryRange * 3) {
    category = 'B';
  } else if (score > categoryRange * 3 && score <= maxScore) {
    category = 'A';
  }

  // Handle the resubmit button click
  const handleResubmit = () => {
    navigate('/quiz-app/quiz'); // Assuming "/quiz" is the route to the quiz page
  };

  // Category images (placeholders or actual image URLs)
  const categoryImages = {
    A: 'https://via.placeholder.com/100x100/FF5733/ffffff?text=A', // Image for Category A
    B: 'https://via.placeholder.com/100x100/FFC300/ffffff?text=B', // Image for Category B
    C: 'https://via.placeholder.com/100x100/DAF7A6/ffffff?text=C', // Image for Category C
    D: 'https://via.placeholder.com/100x100/900C3F/ffffff?text=D', // Image for Category D
  };

  useEffect(() => {
    if (!location.state || !location.state.selectedAnswers || currentStep < 3) {
      navigate('/form'); // Redirect if state is missing or invalid
    }
  }, [location.state, currentStep, navigate]);

  return (
    <div className="relative mx-8 max-w-5xl rounded-xl border border-gray-800 bg-gray-950 px-6 sm:px-8 md:px-12 py-6 sm:py-8 shadow-md shadow-gray-700 flex flex-col sm:flex-row items-center mb-40">
      <div className="w-full sm:w-2/3">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-500 mb-8">
          Thanks for submitting the assessment!
        </h2>

        <div className="mt-4 space-y-3">
          {/* Display the category with highlighted section */}
          <div className="text-lg font-semibold text-white mb-4">
            You are in category:
          </div>

          <div className="flex flex-wrap justify-between sm:justify-center gap-6">
            {/* Display category images and names */}
            {['A', 'B', 'C', 'D'].map((cat) => (
              <div key={cat} className={`flex flex-col items-center ${category === cat ? 'opacity-100' : 'opacity-20'}`}>
                <img
                  src={categoryImages[cat]}
                  alt={`Category ${cat}`}
                  className={`w-24 h-24 sm:w-32 sm:h-32 rounded-xl shadow-md ${category === cat ? 'border-2 border-[#FFB414]' : ''}`}
                />
                <div className={`mt-2 text-lg font-medium ${category === cat ? 'text-[#FFB414]' : 'text-gray-400'}`}>{cat}</div>
              </div>
            ))}
          </div>

          {/* CTA to resubmit the assessment */}
          <div className="mt-8">
            <button
              className="w-full sm:w-auto bg-gray-700 hover:bg-[#0064FF] text-white font-medium py-3 px-6 rounded-xl transition-all"
              onClick={handleResubmit} onMouseEnter={() => sethover(true)} onMouseLeave={() => sethover(false)}
            >
              {hover && <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />}
              Retake the assessment
              {!hover && <FontAwesomeIcon icon={faQuestion} className="ml-2" />}
            </button>
          </div>
        </div>
      </div>

      <div className="w-full sm:w-1/3 mt-6 sm:mt-0 sm:ml-6 hidden sm:flex sm:justify-center">
        <img
          src="https://picsum.photos/400/400?random=5"
          alt="Results illustration"
          className="rounded-xl shadow-lg"
          width='400px'
          height='400px'
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default Results;
