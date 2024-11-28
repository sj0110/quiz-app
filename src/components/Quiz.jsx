import React, { useState, useEffect, useContext } from 'react';
import { NavigationContext } from '../contexts/NavigationContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);
  const { currentStep, setCurrentStep } = useContext(NavigationContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentStep < 1) {
      navigate('/quiz-app'); // Redirect if user skips navigation
    } else {
      setCurrentStep(2); // Update step on valid entry
    }
  }, [currentStep, navigate, setCurrentStep]);

  useEffect(() => {
    fetch('/quiz-app/questions.json')
      .then(response => response.json())
      .then(data => setQuestions(data))
      .catch(error => console.error('Error fetching questions:', error));
  }, []);

  const handleAnswerSelect = (option, index) => {
    const updatedAnswers = [...selectedAnswers];
    if (updatedAnswers[index] === option.label) {
      updatedAnswers[index] = null;
      setIsAnswerSelected(false);
    } else {
      updatedAnswers[index] = option.label;
      setIsAnswerSelected(true);
    }
    setSelectedAnswers(updatedAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      if (selectedAnswers[currentQuestionIndex + 1] === undefined) setIsAnswerSelected(false);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const score = calculateScore();
      navigate('/quiz-app/form', { state: { score, selectedAnswers } });
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateScore = () => {
    let score = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer) {
        const selectedOption = questions[index].options.find(
          option => option.label === answer
        );
        score += selectedOption?.weight || 0;
      }
    });
    return score;
  };

  const variants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const fillValue = (currentQuestion + 1) / questions.length;

  return (
    <div className="relative mx-8 max-w-5xl rounded-xl border border-gray-800 bg-gray-950 px-6 sm:px-8 md:px-12 py-6 sm:py-8 shadow-md shadow-gray-700 flex flex-col sm:flex-row items-center mb-40">
      <AnimatePresence>
        {currentQuestion && (
          <motion.div
            key={currentQuestionIndex}
            variants={variants}
            initial="hidden"
            animate="visible"
            // exit="visible"
            transition={{ duration: 0.7, ease: 'easeInOut' }} // Improved timing and easing
            className="w-full sm:w-2/3"
          >
            <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-8">
              {currentQuestion.question}
            </h2>
            <div className="mt-4 space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  className={`w-full ${selectedAnswers[currentQuestionIndex] === option.label ? 'bg-[#0064ff]' : 'bg-gray-800'} hover:border-[#0064ff] border-[1px] border-gray-800 text-white font-medium py-3 px-6 rounded-xl text-left transition-all duration-300 ease-in-out`}
                  onClick={() => handleAnswerSelect(option, currentQuestionIndex)}
                >
                  {option.label}
                </button>
              ))}

              <div className="flex justify-between gap-3">
                <button
                  className={`w-full bg-gray-700 border-[1px] ${currentQuestionIndex === 0 ? 'bg-gray-900 border-gray-900 cursor-not-allowed' : 'border-gray-700 hover:border-[#ffb414] hover:bg-[#ffb414] hover:text-black'} text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 ease-in-out`}
                  onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}
                  title={`${currentQuestionIndex === 0 ? 'You are already on first question' : 'Click to move to previous question'}`}
                >
                  <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                  Previous Question
                </button>
                <button
                  className={`w-full 
                  ${!isAnswerSelected ?
                      'bg-gray-900 text-white cursor-not-allowed' :
                      `${currentQuestionIndex === questions.length - 1 ?
                        'bg-gray-700 border-[#00DC96] hover:bg-[#00DC96] hover:text-black' :
                        'bg-gray-700 border-[#0064ff] hover:bg-[#0064ff]'}`
                    } 
              text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 ease-in-out 
              border-[1px] 
              ${isAnswerSelected ? (currentQuestionIndex === questions.length - 1 ? 'border-[#00DC96]' : 'border-[#0064ff]') : 'border-gray-900'}`}
                  onClick={handleNextQuestion}
                  disabled={!isAnswerSelected}
                  title={!isAnswerSelected ? 'Please select an option to continue' : 'Click to continue'}
                >
                  {currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Continue'}
                  <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                </button>
              </div>
            </div>
            <div className='mt-8'>
              <span className='font-extrabold'>{currentQuestionIndex + 1}</span><span> out of {questions.length}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {currentQuestion && (
          <motion.div
            key={`image-${currentQuestionIndex}`}
            variants={variants}
            initial="hidden"
            animate="visible"
            // exit="visible"
            transition={{ duration: 0.7, ease: 'easeInOut' }} // Same easing for the image
            className="w-full sm:w-1/3 mt-6 sm:mt-0 sm:ml-6 hidden sm:flex justify-center"
          >
            <img
              src={currentQuestion.url}
              srcSet={`
              ${currentQuestion.url}?w=320 320w,
              ${currentQuestion.url}?w=480 480w,
              ${currentQuestion.url}?w=600 600w,
              ${currentQuestion.url}?w=768 768w,
              ${currentQuestion.url}?w=1024 1024w,
              ${currentQuestion.url}?w=1280 1280w,
              ${currentQuestion.url}?w=1440 1440w,
              ${currentQuestion.url}?w=1600 1600w,
              ${currentQuestion.url}?w=1920 1920w,
              ${currentQuestion.url}?w=2560 2560w,
              ${currentQuestion.url}?w=3840 3840w`
              }
              sizes={`
              (max-width: 320px) 320px,
              (max-width: 480px) 480px,
              (max-width: 600px) 600px,
              (max-width: 768px) 768px,
              (max-width: 1024px) 1024px,
              (max-width: 1280px) 1280px,
              (max-width: 1440px) 1440px,
              (max-width: 1600px) 1600px,
              (max-width: 1920px) 1920px,
              (max-width: 2560px) 2560px,
              3840px`
              }
              alt={`Question ${currentQuestionIndex + 1} illustration`}
              className="rounded-xl shadow-lg"
              width="400px"
              height="400px"
              loading="lazy"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-4 w-[91%] bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
        <div
          className="bg-blue-600 h-1.5 rounded-full transition-all"
          style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 99}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Quiz;
