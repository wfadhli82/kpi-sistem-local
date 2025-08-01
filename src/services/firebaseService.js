import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc,
  query,
  where 
} from 'firebase/firestore';
import { db } from '../firebase';

// User management functions
export const firebaseService = {
  // Add new user
  async addUser(userData) {
    try {
      const docRef = await addDoc(collection(db, 'users'), {
        email: userData.email,
        password: userData.password || '',
        role: userData.role,
        department: userData.department,
        createdAt: new Date(),
        createdBy: userData.createdBy || 'admin'
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Error adding user:', error);
      return { success: false, error: error.message };
    }
  },

  // Get all users
  async getUsers() {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const users = [];
      querySnapshot.forEach((doc) => {
        users.push({
          id: doc.id,
          ...doc.data()
        });
      });
      return { success: true, users };
    } catch (error) {
      console.error('Error getting users:', error);
      return { success: false, error: error.message };
    }
  },

  // Get user by email
  async getUserByEmail(email) {
    try {
      const q = query(collection(db, 'users'), where('email', '==', email));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return { 
          success: true, 
          user: { id: doc.id, ...doc.data() } 
        };
      }
      return { success: false, user: null };
    } catch (error) {
      console.error('Error getting user by email:', error);
      return { success: false, error: error.message };
    }
  },

  // Update user
  async updateUser(userId, userData) {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        ...userData,
        updatedAt: new Date()
      });
      return { success: true };
    } catch (error) {
      console.error('Error updating user:', error);
      return { success: false, error: error.message };
    }
  },

  // Delete user
  async deleteUser(userId) {
    try {
      await deleteDoc(doc(db, 'users', userId));
      return { success: true };
    } catch (error) {
      console.error('Error deleting user:', error);
      return { success: false, error: error.message };
    }
  },

  // Authenticate user
  async authenticateUser(email, password) {
    try {
      const result = await this.getUserByEmail(email);
      if (result.success && result.user) {
        const user = result.user;
        // Simple password check (in production, use proper hashing)
        if (user.password === password || !user.password) {
          return { 
            success: true, 
            user: {
              email: user.email,
              role: user.role,
              department: user.department
            }
          };
        }
      }
      return { success: false, error: 'Invalid credentials' };
    } catch (error) {
      console.error('Error authenticating user:', error);
      return { success: false, error: error.message };
    }
  }
}; 