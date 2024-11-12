# MAST FINAL
Key Changes: 

Menu Structure: I added an array called menuItems with objects containing the item name, course, and price. 

Price Calculation: The calculateAveragePrice function calculates the average price for each course by filtering the menu items based on their course and computing the average. 

HomeScreen Update: The Home Screen now displays the average price for appetizers, mains, sides, and desserts. 

This setup will show the average prices for each course on the Home Screen. You can adjust the courses and items as needed based on your actual menu. 

Changes: 

HomeScreen now takes menuItems as a prop and shows the menu with pricing. 

ManageMenuScreen allows the chef to add and remove items from the menu. 

State Management: menuItems is stored in the App component and passed down to both screens using initialParams. This allows both screens to update and reflect changes in the menu. 

Navigation: The chef can navigate between the HomeScreen and the ManageMenuScreen. 

Now, the chef can add or remove items in the ManageMenuScreen, and the changes will be reflected on the HomeScreen. 

 

Changes/Improvements: 

Ensure the addItem function correctly adds new items to the menuItems state. You already have this in your ManageMenuScreen component, where the new item is added to the array using setMenuItems([...menuItems, newItem]);. 

Ensure the removeItem function correctly removes items from the menu. You are already using the filter() method to create a new array excluding the item at the provided index. 

Key Points: 

addItem: Adds a new item to the menuItems array by updating the state with a new array that includes the new item. 

removeItem: Removes an item based on its index from the menuItems array using the filter() method. 

This solution ensures that items are saved in the state when added and allows the chef to remove items from the menu as needed. 

 
 
