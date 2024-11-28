import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Welcome from './components/Welcome';
import Card from './components/Card';
import Quiz from './components/Quiz';
import Form from './components/Form';
import Results from './components/Results';
import PageNotFound from './components/PageNotFound';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import { useState } from 'react';
import { NavigationContext } from './contexts/NavigationContext';

// https://docs.google.com/spreadsheets/d/1mWBN9BTwSJYgHeHPFfC5aBbnsnsGbkA_NIIf0n_G9Zk/edit?gid=0#gid=0

function App() {
  const [currentStep, setCurrentStep] = useState(0); // Track navigation step

  const containerClass = "flex-grow flex items-center justify-center";

  const router = createBrowserRouter([
    {
      path: '/quiz-app',
      element: (
        <>
          <Navbar />
          <div className="flex flex-col justify-center items-center flex-grow mb-40 gap-8">
            <Welcome />
            <Card />
          </div>
          <Footer />
        </>
      ),
    },
    {
      path: '/quiz-app/quiz',
      element: (
        <>
          <Navbar />
          <div className={containerClass}>
            <Quiz />
          </div>
          <Footer />
        </>
      ),
    },
    {
      path: '/quiz-app/form',
      element: (
        <>
          <Navbar />
          <div className={containerClass}>
            <Form />
          </div>
          <Footer />
        </>
      ),
    },
    {
      path: '/quiz-app/result',
      element: (
        <>
          <Navbar />
          <div className={containerClass}>
            <Results />
          </div>
          <Footer />
        </>
      ),
    },
    {
      path: '*',
      element: (
        <>
          <Navbar />
          <div className={containerClass}>
            <PageNotFound />
          </div>
          <Footer />
        </>
      ),
    },
  ]);

  return (
    <NavigationContext.Provider value={{ currentStep, setCurrentStep }}>
      <div className="h-screen bg-gradient-to-b from-slate-950 via-black to-slate-950 flex flex-col overflow-y-scroll">
        <RouterProvider router={router} />
      </div>
    </NavigationContext.Provider>
  );
}

export default App;
