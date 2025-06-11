// App.js

import React, { useState, useEffect, useRef } from 'react';
import './LabValues.css';
import MenuComponent from './MenuComponent';
import QuizComponent from './QuizComponent';
import { labValues } from './labValuesData';
import { 
  parseRange, 
  generateNormalValue, 
  generateAbnormalValue, 
  generateWrongAnswers, 
  shuffleArray, 
  playSound 
} from './gameUtils';

const LabValuesGame = () => {
  const [currentMode, setCurrentMode] = useState('menu');
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [animations, setAnimations] = useState({});
  const audioContext = useRef(null);

  // Initialize audio context
  useEffect(() => {
    audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
    return () => {
      if (audioContext.current) {
        audioContext.current.close();
      }
    };
  }, []);

  // Generate quiz question
  const generateQuestion = () => {
    const categories = Object.keys(labValues);
    const randomCategory = selectedCategory || categories[Math.floor(Math.random() * categories.length)];
    const category = labValues[randomCategory];
    const randomValue = category.values[Math.floor(Math.random() * category.values.length)];

    const questionTypes = ['normal', 'identify'];
    const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];

    if (type === 'normal') {
      const correctAnswer = randomValue.normal;
      const wrongAnswers = generateWrongAnswers(randomValue);
      const options = shuffleArray([correctAnswer, ...wrongAnswers]);

      return {
        type: 'normal',
        category: randomCategory,
        labValue: randomValue,
        question: `What is the normal range for ${randomValue.name}?`,
        options,
        correct: correctAnswer
      };
    } else {
      const normalRange = parseRange(randomValue.normal);
      const hasDecimals = randomValue.normal.includes('.');
      const isNormal = Math.random() > 0.5;
      let testValue;

      if (isNormal) {
        testValue = generateNormalValue(normalRange, hasDecimals, randomValue.name);
      } else {
        testValue = generateAbnormalValue(normalRange, hasDecimals, randomValue.name);
      }

      return {
        type: 'identify',
        category: randomCategory,
        labValue: randomValue,
        question: `Is ${randomValue.name} = ${testValue} ${randomValue.unit} normal?`,
        testValue,
        normalRange: randomValue.normal,
        correct: isNormal
      };
    }
  };

  // Start quiz
  const startQuiz = (category = null) => {
    playSound('click', audioContext.current, soundEnabled);
    setSelectedCategory(category);
    setCurrentMode('quiz');
    setScore(0);
    setStreak(0);
    setCurrentQuestion(generateQuestion());
  };

  // Handle answer
  const handleAnswer = (answer) => {
    const isCorrect = answer === currentQuestion.correct;

    if (isCorrect) {
      playSound('correct', audioContext.current, soundEnabled);
      setScore(score + 10 + streak * 2);
      setStreak(streak + 1);
      
      let correctMessage = 'Correct! Great job!';
      if (currentQuestion.type === 'identify') {
        correctMessage = `Correct! ${currentQuestion.testValue} ${currentQuestion.labValue.unit} is ${currentQuestion.correct ? 'within' : 'outside'} the normal range (${currentQuestion.normalRange} ${currentQuestion.labValue.unit})`;
      }
      setFeedback({ type: 'correct', message: correctMessage });
      
      if (streak === 4) {
        playSound('achievement', audioContext.current, soundEnabled);
        setFeedback({ type: 'correct', message: 'Amazing! 5 in a row! 🔥' });
      }
    } else {
      playSound('incorrect', audioContext.current, soundEnabled);
      setStreak(0);
      let incorrectMessage = `Incorrect. `;
      if (currentQuestion.type === 'identify') {
        incorrectMessage += `${currentQuestion.testValue} ${currentQuestion.labValue.unit} is ${currentQuestion.correct ? 'within' : 'outside'} the normal range (${currentQuestion.normalRange} ${currentQuestion.labValue.unit})`;
      } else {
        incorrectMessage += `The correct answer is: ${currentQuestion.correct}`;
      }
      setFeedback({ 
        type: 'incorrect', 
        message: incorrectMessage
      });
      
      // Trigger shake animation
      setAnimations({ ...animations, shake: true });
      setTimeout(() => setAnimations({ ...animations, shake: false }), 500);
    }

    // Update high score
    if (score > highScore) {
      setHighScore(score);
    }

    // Generate next question after delay
    setTimeout(() => {
      setFeedback(null);
      setCurrentQuestion(generateQuestion());
    }, 2000);
  };

  return (
    <>
      {currentMode === 'menu' && (
        <MenuComponent startQuiz={startQuiz} highScore={highScore} />
      )}
      {currentMode === 'quiz' && (
        <QuizComponent
          currentQuestion={currentQuestion}
          score={score}
          streak={streak}
          soundEnabled={soundEnabled}
          setSoundEnabled={setSoundEnabled}
          handleAnswer={handleAnswer}
          feedback={feedback}
          setCurrentMode={setCurrentMode}
          animations={animations}
        />
      )}
    </>
  );
};

export default LabValuesGame;