import { useMenu } from '@/context/MenuContext';
import { router } from 'expo-router';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/**
 * HomeScreen Component
 * Displays the main menu items in a grid layout, total count, and average price
 * Provides navigation to add items and view courses
 */
const { width } = Dimensions.get('window');
const CARD_GAP = 12;
const PADDING = 20;
const CARD_WIDTH = (width - (PADDING * 2) - CARD_GAP) / 2; // 2 columns with padding and gap

export default function HomeScreen() {
  const { menuItems, getTotalMenuItems, getAveragePrice } = useMenu();

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

  /**
   * Returns a background gradient color based on the course type
   * @param course - The course type (starter, main, dessert)
   * @returns Hex color code for the background
   */
  const getCourseBackground = (course: string): string => {
    switch (course) {
      case 'starter':
        return '#FFE5E5'; // Light coral red
      case 'main':
        return '#E0F7F5'; // Light teal
      case 'dessert':
        return '#FFF9E0'; // Light yellow
      default:
        return '#FFE5E5';
    }
  };

  return (
    <View style={styles.container}>
      {/* Statistics Header */}
      <View style={styles.statsHeader}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Total Items</Text>
          <Text style={styles.statValue}>{getTotalMenuItems()}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Avg Price</Text>
          <Text style={styles.statValue}>R{getAveragePrice().toFixed(2)}</Text>
        </View>
      </View>

      {/* Menu Grid Display Section */}
      <ScrollView 
        style={styles.menuContainer} 
        contentContainerStyle={styles.menuContent}
        showsVerticalScrollIndicator={false}
      >
        {menuItems.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No menu items yet.</Text>
            <Text style={styles.emptySubtext}>Add some items to get started!</Text>
          </View>
        ) : (
          <View style={styles.gridContainer}>
            {menuItems.map((item) => {
              const courseColor = getCourseColor(item.course);
              const courseBackground = getCourseBackground(item.course);
              
              return (
                <View 
                  key={item.id} 
                  style={[
                    styles.menuItem, 
                    { 
                      backgroundColor: courseBackground,
                      borderColor: courseColor,
                    }
                  ]}
                >
                  <View style={[styles.courseBadge, { backgroundColor: courseColor }]}>
                    <Text style={styles.courseText}>{item.course.charAt(0).toUpperCase() + item.course.slice(1)}</Text>
                  </View>
                  <Text style={styles.dishName} numberOfLines={2}>{item.dishName}</Text>
                  <Text style={styles.description} numberOfLines={3}>{item.description}</Text>
                  <View style={styles.priceContainer}>
                    <Text style={[styles.price, { color: courseColor }]}>R{item.price.toFixed(2)}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => router.push('/add-menu-item')}
        >
          <Text style={styles.buttonText}>➕ Add Menu Item</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.courseButton}
          onPress={() => router.push('/courses')}
        >
          <Text style={styles.courseButtonText}>📋 View Courses</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2937',
    paddingTop: 60,
  },
  statsHeader: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 12,
    backgroundColor: '#111827',
  },
  statCard: {
    flex: 1,
    backgroundColor: '#374151',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4B5563',
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#F9FAFB',
  },
  menuContainer: {
    flex: 1,
  },
  menuContent: {
    padding: 20,
    paddingBottom: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginHorizontal: -6, 
  },
  menuItem: {
    width: CARD_WIDTH,
    marginHorizontal: 6,
    marginBottom: 12, 
    padding: 16,
    borderRadius: 20,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    minHeight: 220,
    justifyContent: 'space-between',
  },
  courseBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 10,
  },
  courseText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  dishName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
    lineHeight: 20,
  },
  description: {
    fontSize: 12,
    color: '#4B5563',
    marginBottom: 12,
    lineHeight: 16,
    flex: 1,
  },
  priceContainer: {
    marginTop: 'auto',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  price: {
    fontSize: 20,
    fontWeight: '800',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 12,
    backgroundColor: '#111827',
    borderTopWidth: 2,
    borderTopColor: '#374151',
  },
  addButton: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#ff6b6b',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#e55555',
  },
  courseButton: {
    backgroundColor: '#10B981',
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#059669',
    alignItems: 'center',
    shadowColor: '#10B981',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  courseButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
});
