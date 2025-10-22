import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { COURSES } from '@/types/MenuItem';
import { useCourseSelection } from '@/context/CourseSelectionContext';

export default function CourseSelectionScreen() {
  const { setSelectedCourse } = useCourseSelection();

  const handleCourseSelect = (course: string) => {
    setSelectedCourse(course);
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Courses Button */}
      <TouchableOpacity style={styles.coursesButton}>
        <Text style={styles.buttonText}>Courses</Text>
      </TouchableOpacity>

      {/* Course Options */}
      <View style={styles.courseList}>
        {COURSES.map((course) => (
          <TouchableOpacity
            key={course}
            style={styles.courseButton}
            onPress={() => handleCourseSelect(course)}
          >
            <Text style={styles.buttonText}>{course.charAt(0).toUpperCase() + course.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  coursesButton: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 2,
    borderColor: '#ff6b6b',
  },
  courseList: {
    gap: 20,
  },
  courseButton: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    borderLeftWidth: 4,
    borderLeftColor: '#ff6b6b',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
    letterSpacing: 0.5,
  },
});
