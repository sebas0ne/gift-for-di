// src/utils/handlingDates.js

export const subtractDatesInDays = (dateStr1, dateStr2) => {
    const [y1, m1, d1] = dateStr1.split('-').map(Number);
    const [y2, m2, d2] = dateStr2.split('-').map(Number);
  
    const date1 = new Date(y1, m1 - 1, d1);
    const date2 = new Date(y2, m2 - 1, d2);
  
    const diffMs = date1 - date2;
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  
    return diffDays;
}

export const getTodayKey = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};
