// gameUtils.js

import { realisticWrongAnswers } from './labValuesData';

export const parseRange = (range) => {
  const parts = range.split('-');
  return {
    min: parseFloat(parts[0]),
    max: parseFloat(parts[1])
  };
};

export const generateNormalValue = (range, hasDecimals = true, labValueName = '') => {
  // Special handling for specific gravity
  if (labValueName.toLowerCase().includes('specific gravity')) {
    const value = 1.010 + Math.random() * 0.016; // Range from 1.010 to 1.026
    return value.toFixed(3);
  }
  
  const value = range.min + Math.random() * (range.max - range.min);
  return hasDecimals ? value.toFixed(1) : Math.round(value).toString();
};

export const generateAbnormalValue = (range, hasDecimals = true, labValueName = '') => {
  // Special handling for specific gravity
  if (labValueName.toLowerCase().includes('specific gravity')) {
    const isHigh = Math.random() > 0.5;
    let value;
    if (isHigh) {
      value = 1.026 + Math.random() * 0.014; // 1.026 to 1.040
    } else {
      value = 1.001 + Math.random() * 0.009; // 1.001 to 1.010
    }
    return value.toFixed(3);
  }
  
  const isHigh = Math.random() > 0.5;
  let value;
  if (isHigh) {
    value = range.max + Math.random() * range.max * 0.5;
  } else {
    value = Math.max(0, range.min - Math.random() * range.min * 0.5);
  }
  return hasDecimals ? value.toFixed(1) : Math.round(value).toString();
};

export const getRealisticWrongAnswers = (labValue) => {
  const key = labValue.name.toLowerCase();
  return realisticWrongAnswers[key] || null;
};

export const generateWrongAnswers = (labValue) => {
  // Check for special realistic wrong answers first
  const realisticAnswers = getRealisticWrongAnswers(labValue);
  if (realisticAnswers) {
    // Filter out the correct answer and ensure we have 3 wrong answers
    const filtered = realisticAnswers.filter(answer => answer !== labValue.normal);
    if (filtered.length >= 3) {
      return filtered.slice(0, 3);
    }
  }
  
  const range = parseRange(labValue.normal);
  const wrongAnswers = [];
  
  // Check if original uses decimals
  const hasDecimals = labValue.normal.includes('.');
  
  // Generate 3 plausible wrong answers
  for (let i = 0; i < 3; i++) {
    let newMin, newMax;
    
    // Create variations that are close to the real values
    const variation = Math.random() * 0.4 + 0.1; // 10-50% variation
    const direction = Math.random() > 0.5 ? 1 : -1;
    
    if (Math.random() > 0.5) {
      // Shift both values
      const shift = range.min * variation * direction;
      newMin = Math.max(0, range.min + shift);
      newMax = range.max + shift;
    } else {
      // Change the range width
      const widthChange = (range.max - range.min) * variation * direction;
      newMin = Math.max(0, range.min - widthChange/2);
      newMax = range.max + widthChange/2;
    }
    
    // Format based on original
    if (hasDecimals) {
      wrongAnswers.push(`${newMin.toFixed(1)}-${newMax.toFixed(1)}`);
    } else {
      wrongAnswers.push(`${Math.round(newMin)}-${Math.round(newMax)}`);
    }
  }
  
  // Make sure wrong answers are unique and different from correct answer
  const uniqueWrongAnswers = [...new Set(wrongAnswers)];
  while (uniqueWrongAnswers.length < 3 || uniqueWrongAnswers.includes(labValue.normal)) {
    const variation = Math.random() * 0.3 + 0.2;
    const shift = range.min * variation * (Math.random() > 0.5 ? 1 : -1);
    const newMin = Math.max(0, range.min + shift);
    const newMax = range.max + shift;
    
    const newAnswer = hasDecimals 
      ? `${newMin.toFixed(1)}-${newMax.toFixed(1)}`
      : `${Math.round(newMin)}-${Math.round(newMax)}`;
    
    if (!uniqueWrongAnswers.includes(newAnswer) && newAnswer !== labValue.normal) {
      uniqueWrongAnswers.push(newAnswer);
    }
  }
  
  return uniqueWrongAnswers.slice(0, 3);
};

export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const playSound = (type, audioContext, soundEnabled) => {
  if (!soundEnabled || !audioContext) return;

  const ctx = audioContext;
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  switch (type) {
    case 'correct':
      oscillator.frequency.setValueAtTime(523.25, ctx.currentTime);
      oscillator.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1);
      oscillator.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2);
      gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      break;
    case 'incorrect':
      oscillator.frequency.setValueAtTime(293.66, ctx.currentTime);
      oscillator.frequency.setValueAtTime(277.18, ctx.currentTime + 0.1);
      gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      break;
    case 'click':
      oscillator.frequency.setValueAtTime(1000, ctx.currentTime);
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
      break;
    case 'achievement':
      oscillator.frequency.setValueAtTime(523.25, ctx.currentTime);
      oscillator.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1);
      oscillator.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2);
      oscillator.frequency.setValueAtTime(1046.50, ctx.currentTime + 0.3);
      gainNode.gain.setValueAtTime(0.4, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);
      break;
    default:
      break;
  }

  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + 0.8);
};