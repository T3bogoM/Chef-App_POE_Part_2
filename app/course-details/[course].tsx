/**
 * CourseDetailsScreen Component
 * Displays all menu items for a specific course (filtered view)
 * Allows users to remove items from the menu with confirmation
 */
import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useMenu } from '@/context/MenuContext';
import { useLocalSearchParams } from 'expo-router';

export default function CourseDetailsScreen() {
  const { getMenuItemsByCourse, removeMenuItem } = useMenu();
  const { course } = useLocalSearchParams<{ course: string }>();
  
  // Get filtered menu items for the selected course
  const items = course ? getMenuItemsByCourse(course) : [];

  /**
   * Returns a color code based on the course type
   * @param courseType - The course type (starter, main, dessert)
   * @returns Hex color code for the course
   */
  const getCourseColor = (courseType: string): string => {
    switch (courseType) {
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

  /**
   * Handles the removal of a menu item with confirmation dialog
   * Prevents accidental deletions by requiring user confirmation
   * @param itemId - The unique identifier of the item to remove
   * @param itemName - The name of the item for the confirmation message
   */
  const handleRemoveItem = (itemId: string, itemName: string) => {
    Alert.alert(
      'Remove Item',
      `Are you sure you want to remove "${itemName}" from the menu?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            removeMenuItem(itemId);
            Alert.alert('Success', 'Item removed from menu');
          },
        },
      ]
    );
  };

  const courseColor = course ? getCourseColor(course) : '#ff6b6b';

  return (
    <View style={styles.container}>
      <View style={[styles.titleContainer, { borderLeftColor: courseColor }]}>
        <Text style={styles.title}>
          {course?.charAt(0).toUpperCase() + course?.slice(1)} Course
        </Text>
        <Text style={styles.itemCountText}>{items.length} item{items.length !== 1 ? 's' : ''}</Text>
      </View>
      
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.content}>
        {items.length === 0 ? (
          <Text style={styles.emptyText}>No items in this course yet.</Text>
        ) : (
          items.map((item) => (
            <View key={item.id} style={[styles.menuItem, { borderLeftColor: courseColor }]}>
              <View style={styles.itemContent}>
                <Text style={styles.dishName}>{item.dishName}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.price}>R{item.price.toFixed(2)}</Text>
              </View>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoveItem(item.id, item.dishName)}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
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
    backgroundColor: '#e8f4f8',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  titleContainer: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 16,
    marginBottom: 30,
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
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 5,
  },
  itemCountText: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
    fontWeight: '500',
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
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    borderLeftWidth: 5,
    borderLeftColor: '#ff6b6b',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemContent: {
    flex: 1,
  },
  removeButton: {
    backgroundColor: '#e74c3c',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    marginLeft: 15,
    shadowColor: '#e74c3c',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
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
