const API_BASE_URL = "https://stub.muindetuva.com/api";
const API_KEY = "27|mXD5DB5TPrTaa1hnljSN6aLv5jpUvZQJFJTBHBjre376f657";

// Helper function to get headers
const getHeaders = () => ({
  "Content-Type": "application/json",
  "Authorization": `Bearer ${API_KEY}`,
});

// ===== LOCAL STORAGE HELPERS =====

// Get IDs of items marked as found
export const getMarkedAsFoundIds = () => {
  try {
    return JSON.parse(localStorage.getItem('markedAsFoundIds') || '[]');
  } catch {
    return [];
  }
};

// Get all items marked as found
export const getLocalFoundItems = () => {
  try {
    return JSON.parse(localStorage.getItem('foundItems') || '[]');
  } catch {
    return [];
  }
};

// ===== LOST ITEMS API =====

// Fetch all lost items
export const fetchLostItems = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/LOST-ITEMS`, {
      method: "GET",
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch lost items: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching lost items:", error);
    throw error;
  }
};

// Post a lost item
export const postLostItem = async (itemData) => {
  try {
    const { name, item, location, date, description, phone, email } = itemData;
    
    const response = await fetch(`${API_BASE_URL}/LOST-ITEMS`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ name, item, location, date, description, phone, email }),
    });

    if (!response.ok) {
      throw new Error(`Failed to post lost item: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error posting lost item:", error);
    throw error;
  }
};

// ===== FOUND ITEMS API =====

// Fetch all found items (now uses localStorage - kept for compatibility)
export const fetchFoundItems = async () => {
  // Found items are now stored in localStorage, use getLocalFoundItems() instead
  return { data: getLocalFoundItems() };
};

// Post a found item (stores in localStorage since API doesn't support it)
export const postFoundItem = async (itemData) => {
  try {
    console.log("Storing found item report locally:", itemData);
    
    // Store in localStorage as a found item
    const foundItems = JSON.parse(localStorage.getItem('foundItems') || '[]');
    
    const newFoundItem = {
      ...itemData,
      id: Date.now(), // Generate a unique ID
      reportedAt: new Date().toISOString(),
    };
    
    foundItems.push(newFoundItem);
    localStorage.setItem('foundItems', JSON.stringify(foundItems));
    
    console.log("✅ Found item stored locally");
    return { data: newFoundItem };
  } catch (error) {
    console.error("Error posting found item:", error);
    throw error;
  }
};

// ===== MARK AS FOUND =====

// Mark a lost item as found (stores in localStorage since API doesn't support status field)
export const markAsFound = async (lostItem) => {
  try {
    console.log("Marking item as found locally:", lostItem);
    
    // Store found items in localStorage
    const foundItems = JSON.parse(localStorage.getItem('foundItems') || '[]');
    
    // Add this item to found items with timestamp
    const foundItem = {
      ...lostItem,
      markedFoundAt: new Date().toISOString(),
      originalId: lostItem.id,
    };
    
    foundItems.push(foundItem);
    localStorage.setItem('foundItems', JSON.stringify(foundItems));
    
    // Store the ID in a list of marked-as-found items
    const markedIds = JSON.parse(localStorage.getItem('markedAsFoundIds') || '[]');
    if (!markedIds.includes(lostItem.id)) {
      markedIds.push(lostItem.id);
      localStorage.setItem('markedAsFoundIds', JSON.stringify(markedIds));
    }
    
    console.log("✅ Successfully marked as found locally");
    return foundItem;
  } catch (error) {
    console.error("Error marking item as found:", error);
    throw error;
  }
};

// ===== HELPER FUNCTIONS =====

// Generate placeholder image based on item name (since API doesn't support images)
export const getPlaceholderImage = (itemName) => {
  const name = itemName.toLowerCase();
  
  // Map common items to appropriate Unsplash images
  if (name.includes("wallet") || name.includes("purse")) {
    return "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&h=500&fit=crop";
  } else if (name.includes("laptop") || name.includes("computer") || name.includes("macbook")) {
    return "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500&q=60";
  } else if (name.includes("watch")) {
    return "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=60";
  } else if (name.includes("backpack") || name.includes("bag")) {
    return "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop";
  } else if (name.includes("phone")) {
    return "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=60";
  } else if (name.includes("book") || name.includes("notebook")) {
    return "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=500&h=500&fit=crop";
  } else if (name.includes("umbrella")) {
    return "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=500&q=60";
  } else if (name.includes("charger") || name.includes("cable")) {
    return "https://images.unsplash.com/photo-1591290619762-c588f8e8e1f4?auto=format&fit=crop&w=500&q=60";
  } else if (name.includes("bottle") || name.includes("water")) {
    return "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop";
  } else if (name.includes("key")) {
    return "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=500&q=60";
  } else if (name.includes("glasses") || name.includes("sunglasses")) {
    return "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=500&q=60";
  } else if (name.includes("headphone") || name.includes("earphone") || name.includes("airpod")) {
    return "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=60";
  } else {
    // Default generic item image
    return "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=500&q=60";
  }
};
