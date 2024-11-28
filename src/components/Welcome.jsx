import React, { useContext, useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import { NavigationContext } from '../contexts/NavigationContext';

const Welcome = () => {
    const { currentStep, setCurrentStep } = useContext(NavigationContext);

    useEffect(() => {
        if (currentStep === 0) {
            setCurrentStep(1); // Set step to 1 when user visits this page
        }
    }, [currentStep, setCurrentStep]);

    const baseCSS =
        'text-[#0064ff] font-semibold tracking-tight text-white text-2xl sm:text-3xl md:text-5xl lg:text-6xl 2xl:text-8xl';
    const strings = [
        'AI Maturity Quiz',
        'Lorem Ipsum 1',
        'Lorem Ipsum 2',
        'Lorem Ipsum 3',
    ];

    return (
        <div className="mx-8 flex flex-col justify-center items-center text-center">
            <Typewriter
                options={{
                    autoStart: true,
                    delay: 150,
                    strings: strings.map((text) => `<span class="${baseCSS}">${text}</span>`),
                    cursor: `<span class="${baseCSS}">|</span>`,
                    deleteSpeed: 0,
                    loop: true,
                    pauseFor: 1000,
                }}
            />
            <p className="my-4 text-xs sm:text-base md:text-lg lg:text-xl xl:text-2xl font-light text-gray-500 w-full max-w-4xl">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
            </p>
        </div>
    );
};

export default Welcome;
