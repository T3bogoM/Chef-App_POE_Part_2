import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useMenu } from '@/context/MenuContext';
import { useLocalSearchParams } from 'expo-router';

export default function CourseDetailsScreen() {
  const { getMenuItemsByCourse } = useMenu();
  const { course } = useLocalSearchParams<{ course: string }>();
  
  const items = course ? getMenuItemsByCourse(course) : [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{course?.charAt(0).toUpperCase() + course?.slice(1)}</Text>
      
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.content}>
        {items.length === 0 ? (
          <Text style={styles.emptyText}>No items in this course yet.</Text>
        ) : (
          items.map((item) => (
            <View key={item.id} style={styles.menuItem}>
              <Text style={styles.dishName}>{item.dishName}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.price}>${item.price.toFixed(2)}</Text>
            </View>
          ))
        )}
      </ScrollView>
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
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 30,
    backgroundColor: '#fff',
    paddingVertical: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  scrollContainer: {
    flex: 1,
  },
  content: {
    paddingBottom: 20,
  },
  menuItem: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 15,
    borderRadius: 16,
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
  dishName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    color: '#6c757d',
    marginBottom: 10,
    lineHeight: 22,
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#27ae60',
  },
  emptyText: {
    fontSize: 18,
    color: '#6c757d',
    textAlign: 'center',
    marginTop: 50,
    fontStyle: 'italic',
    backgroundColor: '#fff',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
});
