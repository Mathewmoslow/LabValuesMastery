// labValuesData.js

export const labValues = {
  metabolic: {
    name: "Metabolic Panel",
    icon: "Brain",
    color: "metabolic",
    values: [
      { name: "K (Potassium)", normal: "3.5-5.3", unit: "mEq/L" },
      { name: "Na (Sodium)", normal: "135-145", unit: "mEq/L" },
      { name: "Mg (Magnesium)", normal: "1.5-2.5", unit: "mg/dL" },
      { name: "Ca (Calcium)", normal: "9-11", unit: "mg/dL" },
      { name: "Phosphorus", normal: "2.8-4.5", unit: "mg/dL" },
      { name: "Protein", normal: "6-8", unit: "g/dL" },
      { name: "Glucose", normal: "60-100", unit: "mg/dL" },
      { name: "BUN", normal: "10-30", unit: "mg/dL" },
      { name: "Creatinine", normal: "0.5-1.5", unit: "mg/dL" }
    ]
  },
  blood: {
    name: "Blood Count",
    icon: "Heart",
    color: "blood",
    values: [
      { name: "WBC", normal: "4-11", unit: "× 1,000/μL" },
      { name: "Hgb (Hemoglobin)", normal: "12-18", unit: "g/dL" },
      { name: "Hct (Hematocrit)", normal: "36-54", unit: "%" },
      { name: "RBC", normal: "4-6", unit: "× 10⁶/μL" },
      { name: "Platelets", normal: "150-400", unit: "× 1,000/μL" }
    ]
  },
  bleeding: {
    name: "Bleeding Studies",
    icon: "Activity",
    color: "bleeding",
    values: [
      { name: "PTT (APTT)", normal: "30-40", unit: "seconds" },
      { name: "PT", normal: "12-15", unit: "seconds" },
      { name: "INR", normal: "0.8-1.2", unit: "ratio" },
      { name: "Therapeutic INR", normal: "2-3", unit: "ratio" }
    ]
  },
  urine: {
    name: "Urine",
    icon: "Droplet",
    color: "urine",
    values: [
      { name: "Specific Gravity", normal: "1.010-1.026", unit: "" }
    ]
  }
};

// Realistic wrong answers for each lab value
export const realisticWrongAnswers = {
  // Metabolic Panel
  'glucose': ['70-110', '50-90', '80-120'],
  'na (sodium)': ['130-140', '140-150', '133-143'],
  'k (potassium)': ['3.0-5.0', '3.8-5.5', '3.3-4.8'],
  'ca (calcium)': ['8-10', '9.5-11.5', '8.5-10.5'],
  'mg (magnesium)': ['1.3-2.3', '1.7-2.7', '1.4-2.4'],
  'phosphorus': ['2.5-4.0', '3.0-4.8', '2.6-4.3'],
  'protein': ['5-7', '6.5-8.5', '5.5-7.5'],
  'bun': ['8-25', '15-35', '12-32'],
  'creatinine': ['0.6-1.4', '0.4-1.3', '0.7-1.6'],
  
  // Blood Count
  'hgb (hemoglobin)': ['11-17', '13-19', '10-16'],
  'hct (hematocrit)': ['33-51', '38-56', '34-52'],
  'wbc': ['5-12', '3-10', '4.5-11.5'],
  'rbc': ['3-5', '4.5-6.5', '3.5-5.5'],
  'platelets': ['100-350', '200-450', '125-375'],
  
  // Bleeding Studies
  'ptt (aptt)': ['25-35', '35-45', '28-38'],
  'pt': ['10-13', '13-16', '11-14'],
  'inr': ['0.9-1.3', '0.7-1.1', '1.0-1.4'],
  'therapeutic inr': ['2.5-3.5', '1.5-2.5', '1.8-2.8'],
  
  // Urine
  'specific gravity': ['1.005-1.020', '1.015-1.030', '1.008-1.025']
};