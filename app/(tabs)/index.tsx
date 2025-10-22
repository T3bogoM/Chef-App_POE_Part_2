import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useMenu } from '@/context/MenuContext';
import { router } from 'expo-router';

export default function HomeScreen() {
  const { menuItems, getTotalMenuItems } = useMenu();

  // Hardcoded dishes for immediate display
  const displayItems = [
    {
      id: '1',
      dishName: 'Truffle Arancini',
      description: 'Crispy risotto balls filled with truffle cream and parmesan',
      course: 'starter',
      price: 18.50,
    },
    {
      id: '2',
      dishName: 'Wagyu Beef Tenderloin',
      description: '8oz premium wagyu beef with roasted vegetables',
      course: 'main',
      price: 65.00,
    },
    {
      id: '3',
      dishName: 'Chocolate Lava Cake',
      description: 'Warm chocolate cake with molten center and vanilla ice cream',
      course: 'dessert',
      price: 14.00,
    },
  ];

  return (
    <View style={styles.container}>
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <View style={styles.logoBox}>
          <Text style={styles.logoText}>Logo</Text>
        </View>
      </View>

      {/* Menu Display Section */}
      <ScrollView style={styles.menuContainer} contentContainerStyle={styles.menuContent}>
        {displayItems.map((item) => (
          <View key={item.id} style={styles.menuItem}>
            <Text style={styles.dishName}>{item.dishName}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.course}>{item.course}</Text>
            <Text style={styles.price}>${item.price.toFixed(2)}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => router.push('/add-menu-item')}
        >
          <Text style={styles.buttonText}>Add to Menu</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.courseButton}
          onPress={() => router.push('/courses')}
        >
          <Text style={styles.courseButtonText}>Course Screen Button</Text>
        </TouchableOpacity>
      </View>

      {/* Total Count Display */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total Menu Items: 3</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 30,
  },
  logoBox: {
    width: 100,
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#e9ecef',
  },
  logoText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2c3e50',
    letterSpacing: 1,
  },
  menuContainer: {
    flex: 1,
    marginVertical: 20,
  },
  menuContent: {
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
  course: {
    fontSize: 12,
    color: '#fff',
    backgroundColor: '#ff6b6b',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    textTransform: 'capitalize',
    fontWeight: '600',
    alignSelf: 'flex-start',
    marginBottom: 10,
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
  },
  buttonContainer: {
    paddingVertical: 20,
    gap: 15,
  },
  addButton: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#ff6b6b',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  courseButton: {
    backgroundColor: '#fff',
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ff6b6b',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.5,
  },
  courseButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ff6b6b',
    letterSpacing: 0.5,
  },
  totalContainer: {
    alignItems: 'center',
    paddingBottom: 30,
    backgroundColor: '#fff',
    marginHorizontal: -20,
    paddingVertical: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  totalText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
    backgroundColor: '#e9ecef',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
});
