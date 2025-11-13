/**
 * CoursesScreen Component
 * Displays all available courses with item counts
 * Allows navigation to course detail pages for filtering menu items
 */
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useMenu } from '@/context/MenuContext';
import { router } from 'expo-router';
import { COURSES } from '@/types/MenuItem';

export default function CoursesScreen() {
  const { getMenuItemsByCourse } = useMenu();

  /**
   * Returns a color code based on the course type
   * @param course - The course type (starter, main, dessert)
   * @returns Hex color code for the course
   */
  const getCourseColor = (course: string): string => {
    switch (course) {
      case 'starter':
        return '#ff6b6b'; // Coral red
      case 'main':
        return '#4ecdc4'; // Teal
      case 'dessert':
        return '#ffe66d'; // Yellow
      default:
        return '#ff6b6b';
    }
  };

  return (
    <View style={styles.container}>
      {/* Courses Button */}
      <TouchableOpacity style={styles.coursesButton}>
        <Text style={styles.buttonText}>Courses</Text>
      </TouchableOpacity>

      {/* Course Options */}
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.courseList}>
        {COURSES.map((course) => {
          const items = getMenuItemsByCourse(course);
          const courseColor = getCourseColor(course);
          
          return (
            <TouchableOpacity
              key={course}
              style={[styles.courseButton, { borderLeftColor: courseColor }]}
              onPress={() => router.push(`/course-details/${course}`)}
            >
              <Text style={styles.buttonText}>
                {course.charAt(0).toUpperCase() + course.slice(1)}
              </Text>
              <Text style={styles.itemCount}>({items.length} items)</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f4f8',
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
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 2,
    borderColor: '#ff6b6b',
  },
  scrollContainer: {
    flex: 1,
  },
  courseList: {
    gap: 20,
    paddingBottom: 20,
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
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    borderLeftWidth: 5,
    borderLeftColor: '#ff6b6b',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
    letterSpacing: 0.5,
  },
  itemCount: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 5,
    fontWeight: '500',
  },
});
