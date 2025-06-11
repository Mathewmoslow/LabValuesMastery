// MenuComponent.js

import React from 'react';
import { Brain, Heart, Activity, Droplet, Trophy, Zap } from 'lucide-react';
import { labValues } from './labValuesData';

const iconMap = {
  Brain: Brain,
  Heart: Heart,
  Activity: Activity,
  Droplet: Droplet
};

const MenuComponent = ({ startQuiz, highScore }) => {
  return (
    <div className="game-container">
      <div className="menu-container">
        <div className="text-center mb-12">
          <h1 className="game-title">Lab Values Master</h1>
          <p className="game-subtitle">Learn and memorize important lab values through interactive games!</p>
        </div>

        <div className="categories-grid">
          {Object.entries(labValues).map(([key, category]) => {
            const IconComponent = iconMap[category.icon];
            return (
              <button
                key={key}
                onClick={() => startQuiz(key)}
                className={`category-button category-${category.color}`}
              >
                <IconComponent className="category-icon" />
                <h3 className="section-title">{category.name}</h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>{category.values.length} values to learn</p>
              </button>
            );
          })}
        </div>

        <div className="text-center">
          <button
            onClick={() => startQuiz(null)}
            className="start-button"
          >
            <Zap />
            Start Mixed Quiz
          </button>
        </div>

        <div className="mt-8 text-center">
          <div className="high-score">
            <Trophy className="high-score-icon" />
            <span className="high-score-text">High Score: {highScore}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuComponent;