import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';

// Define the type for menu items
interface MenuItem {
  name: string;
  course: string;
  price: number;
}

// Update RootStackParamList to include both menuItems and setMenuItems
type RootStackParamList = {
  Welcome: undefined;
  SignUp: undefined;
  Home: { menuItems: MenuItem[]; setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>> }; // Pass menuItems and setMenuItems
  ManageMenu: { menuItems: MenuItem[]; setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>> }; // Pass menuItems and setMenuItems
  AddToCart: undefined;
  Checkout: undefined;
};

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

interface WelcomeScreenProps {
  navigation: WelcomeScreenNavigationProp;
}

// Define the initial menu items
const initialMenuItems: MenuItem[] = [
  { name: 'Cheese Burger', course: 'Main', price: 12.99 },
  { name: 'French Fries', course: 'Side', price: 4.99 },
  { name: 'Apple Pie', course: 'Dessert', price: 3.49 },
  { name: 'Caesar Salad', course: 'Appetizer', price: 6.99 },
  { name: 'Steak', course: 'Main', price: 19.99 },
  { name: 'Ice Cream', course: 'Dessert', price: 2.49 },
];

// HomeScreen component to display the menu
const HomeScreen: React.FC<{ route: any }> = ({ route }) => {
  const { menuItems, setMenuItems } = route.params;

  // Function to calculate average price by course
  const calculateAveragePrice = (course: string) => {
    const filteredItems = menuItems.filter((item: MenuItem) => item.course === course);
    const total = filteredItems.reduce((sum: number, item: MenuItem) => sum + item.price, 0);
    return (filteredItems.length > 0) ? (total / filteredItems.length).toFixed(2) : '0.00';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Flavorscape!</Text>

      <View style={styles.averagePriceContainer}>
        <Text style={styles.subtitle}>Average Price by Course:</Text>
        <View style={styles.priceItem}>
          <Text style={styles.priceText}>Appetizers: ${calculateAveragePrice('Appetizer')}</Text>
        </View>
        <View style={styles.priceItem}>
          <Text style={styles.priceText}>Mains: ${calculateAveragePrice('Main')}</Text>
        </View>
        <View style={styles.priceItem}>
          <Text style={styles.priceText}>Sides: ${calculateAveragePrice('Side')}</Text>
        </View>
        <View style={styles.priceItem}>
          <Text style={styles.priceText}>Desserts: ${calculateAveragePrice('Dessert')}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => route.navigation.navigate('ManageMenu', { menuItems, setMenuItems })}
      >
        <Text style={styles.buttonText}>Manage Menu</Text>
      </TouchableOpacity>
    </View>
  );
};

// ManageMenuScreen component to add or remove menu items
const ManageMenuScreen: React.FC<{ route: any }> = ({ route }) => {
  const { menuItems, setMenuItems } = route.params;

  const [itemName, setItemName] = useState('');
  const [itemCourse, setItemCourse] = useState('');
  const [itemPrice, setItemPrice] = useState('');

  const addItem = () => {
    const newItem: MenuItem = {
      name: itemName,
      course: itemCourse,
      price: parseFloat(itemPrice),
    };
    setMenuItems([...menuItems, newItem]);
  };

  const removeItem = (index: number) => {
    const updatedItems = menuItems.filter((_: unknown, index: number) => {});
    setMenuItems(updatedItems);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Menu</Text>

      <TextInput
        style={styles.input}
        placeholder="Item Name"
        value={itemName}
        onChangeText={setItemName}
      />
      <TextInput
        style={styles.input}
        placeholder="Course (Main, Side, Dessert, etc.)"
        value={itemCourse}
        onChangeText={setItemCourse}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        keyboardType="numeric"
        value={itemPrice}
        onChangeText={setItemPrice}
      />

      <Button title="Add Item" onPress={addItem} />

      <View style={styles.menuContainer}>
        {menuItems.map((item: MenuItem, index: number) => (
          <View key={index} style={styles.menuItem}>
            <Text style={styles.menuText}>{item.name} - ${item.price}</Text>
            <Button title="Remove" onPress={() => removeItem(index)} />
          </View>
        ))}
      </View>
    </View>
  );
};

// Stack navigation setup
const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Welcome" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Home' }}
          initialParams={{ menuItems, setMenuItems }}
        />
        <Stack.Screen
          name="ManageMenu"
          component={ManageMenuScreen}
          options={{ title: 'Manage Menu' }}
          initialParams={{ menuItems, setMenuItems }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34495e',
    marginBottom: 10,
  },
  averagePriceContainer: {
    marginBottom: 30,
  },
  priceItem: {
    marginBottom: 5,
  },
  priceText: {
    fontSize: 16,
    color: '#555',
  },
  button: {
    backgroundColor: '#e74c3c',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    borderRadius: 5,
  },
  menuContainer: {
    marginTop: 20,
    width: '100%',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  menuText: {
    fontSize: 16,
    color: '#555',
  },
});

export default App;
