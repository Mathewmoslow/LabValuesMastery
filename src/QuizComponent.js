// QuizComponent.js

import React from 'react';
import { Brain, Heart, Activity, Droplet, Volume2, VolumeX, CheckCircle, XCircle } from 'lucide-react';
import { labValues } from './labValuesData';

const iconMap = {
  Brain: Brain,
  Heart: Heart,
  Activity: Activity,
  Droplet: Droplet
};

const QuizComponent = ({ 
  currentQuestion, 
  score, 
  streak, 
  soundEnabled, 
  setSoundEnabled, 
  handleAnswer, 
  feedback, 
  setCurrentMode,
  animations 
}) => {
  if (!currentQuestion) return null;

  const IconComponent = iconMap[labValues[currentQuestion.category].icon];

  return (
    <div className={`quiz-container ${animations.shake ? 'animate-shake' : ''}`}>
      <div className="quiz-header">
        <button
          onClick={() => setCurrentMode('menu')}
          className="back-button"
        >
          ← Back to Menu
        </button>
        <div className="score-display">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="back-button"
            style={{ display: 'flex' }}
          >
            {soundEnabled ? <Volume2 /> : <VolumeX />}
          </button>
          <div>
            Score: <span className="score">{score}</span>
          </div>
          <div>
            Streak: <span className="streak">{streak}🔥</span>
          </div>
        </div>
      </div>

      <div className="question-card">
        <div className="text-center mb-8">
          <div className="question-icon-wrapper">
            <IconComponent className="category-icon" style={{ color: 'white' }} />
          </div>
          <h2 className="question-text">{currentQuestion.question}</h2>
        </div>

        {currentQuestion.type === 'normal' ? (
          <div className="options-grid">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                disabled={feedback !== null}
                className="option-button"
              >
                {option} {currentQuestion.labValue.unit}
              </button>
            ))}
          </div>
        ) : (
          <div className="identify-buttons">
            <button
              onClick={() => handleAnswer(true)}
              disabled={feedback !== null}
              className="normal-button"
            >
              <CheckCircle style={{ width: '32px', height: '32px' }} />
              Normal
            </button>
            <button
              onClick={() => handleAnswer(false)}
              disabled={feedback !== null}
              className="abnormal-button"
            >
              <XCircle style={{ width: '32px', height: '32px' }} />
              Abnormal
            </button>
          </div>
        )}

        {feedback && (
          <div className={`feedback-box ${feedback.type === 'correct' ? 'feedback-correct' : 'feedback-incorrect'}`}>
            {feedback.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizComponent;