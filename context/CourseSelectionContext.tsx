/**
 * CourseSelectionContext
 * Provides global state management for course selection
 * Used when adding new menu items to track which course is selected
 */
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CourseSelectionContextType {
  selectedCourse: string;
  setSelectedCourse: (course: string) => void;
  clearSelection: () => void;
}

const CourseSelectionContext = createContext<CourseSelectionContextType | undefined>(undefined);

/**
 * Custom hook to access course selection context
 * @returns CourseSelectionContextType with selected course and methods
 * @throws Error if used outside of CourseSelectionProvider
 */
export const useCourseSelection = () => {
  const context = useContext(CourseSelectionContext);
  if (!context) {
    throw new Error('useCourseSelection must be used within a CourseSelectionProvider');
  }
  return context;
};

interface CourseSelectionProviderProps {
  children: ReactNode;
}

/**
 * CourseSelectionProvider Component
 * Manages the selected course state for menu item creation
 * Provides methods to set and clear the selected course
 */
export const CourseSelectionProvider: React.FC<CourseSelectionProviderProps> = ({ children }) => {
  // State to store the currently selected course
  const [selectedCourse, setSelectedCourse] = useState('');

  /**
   * Clears the selected course (resets to empty string)
   */
  const clearSelection = () => {
    setSelectedCourse('');
  };

  return (
    <CourseSelectionContext.Provider
      value={{
        selectedCourse,
        setSelectedCourse,
        clearSelection,
      }}
    >
      {children}
    </CourseSelectionContext.Provider>
  );
};
