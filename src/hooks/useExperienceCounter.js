import { useState, useEffect } from 'react';
import { 
  differenceInYears, 
  differenceInMonths, 
  differenceInDays, 
  differenceInHours, 
  differenceInMinutes, 
  differenceInSeconds,
  addYears,
  addMonths,
  addDays,
  addHours,
  addMinutes
} from 'date-fns';

/**
 * Custom hook that calculates and updates experience duration every second
 * @param {string} joinDateStr - Join date in format "YYYY-MM-DD HH:mm:ss"
 * @returns {{ years: number, months: number, days: number, hours: number, minutes: number, seconds: number }}
 */
export function useExperienceCounter(joinDateStr) {
  const [experience, setExperience] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const joinDate = new Date(joinDateStr);

    const calculateExperience = () => {
      const now = new Date();
      
      // Calculate years first
      const years = differenceInYears(now, joinDate);
      const afterYears = addYears(joinDate, years);
      
      // Calculate remaining months
      const months = differenceInMonths(now, afterYears);
      const afterMonths = addMonths(afterYears, months);
      
      // Calculate remaining days
      const days = differenceInDays(now, afterMonths);
      const afterDays = addDays(afterMonths, days);
      
      // Calculate remaining hours
      const hours = differenceInHours(now, afterDays);
      const afterHours = addHours(afterDays, hours);
      
      // Calculate remaining minutes
      const minutes = differenceInMinutes(now, afterHours);
      const afterMinutes = addMinutes(afterHours, minutes);
      
      // Calculate remaining seconds
      const seconds = differenceInSeconds(now, afterMinutes);

      setExperience({
        years,
        months,
        days,
        hours,
        minutes,
        seconds
      });
    };

    // Calculate immediately
    calculateExperience();

    // Update every second
    const interval = setInterval(calculateExperience, 1000);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, [joinDateStr]);

  return experience;
}
