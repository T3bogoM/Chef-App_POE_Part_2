import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CourseSelectionContextType {
  selectedCourse: string;
  setSelectedCourse: (course: string) => void;
  clearSelection: () => void;
}

const CourseSelectionContext = createContext<CourseSelectionContextType | undefined>(undefined);

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

export const CourseSelectionProvider: React.FC<CourseSelectionProviderProps> = ({ children }) => {
  const [selectedCourse, setSelectedCourse] = useState('');

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
