# Firebase Setup untuk User Management Backend

## 📋 Overview
Aplikasi ini menggunakan **Firebase** untuk user management backend, dengan **localStorage** sebagai fallback.

## 🚀 Setup Firebase

### **1. Create Firebase Project:**
1. **Buka** https://console.firebase.google.com/
2. **Click "Create a project"**
3. **Masukkan nama project:** `kpi-sistem-maiwp`
4. **Enable Google Analytics** (optional)
5. **Click "Create project"**

### **2. Enable Firestore Database:**
1. **Dalam Firebase Console, click "Firestore Database"**
2. **Click "Create database"**
3. **Pilih "Start in test mode"** (untuk development)
4. **Pilih location:** `asia-southeast1` (Singapore)
5. **Click "Done"**

### **3. Get Firebase Config:**
1. **Click gear icon (⚙️) → Project settings**
2. **Scroll ke "Your apps" section**
3. **Click "Add app" → Web app**
4. **Masukkan app nickname:** `kpi-sistem-web`
5. **Click "Register app"**
6. **Copy config object**

### **4. Update Firebase Config:**
1. **Buka file:** `src/firebase.js`
2. **Replace config object** dengan config dari Firebase Console:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

### **5. Set Firestore Rules:**
1. **Dalam Firestore Database, click "Rules"**
2. **Replace rules dengan:**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if true; // For development only
    }
  }
}
```

## 🔧 Features

### **✅ User Management:**
- **Add user** - Simpan ke Firebase + localStorage backup
- **Update user** - Update dalam Firebase + localStorage
- **Delete user** - Delete dari Firebase + localStorage
- **Get users** - Load dari Firebase, fallback ke localStorage

### **✅ Authentication:**
- **Login** - Check Firebase first, fallback ke localStorage
- **User roles** - admin, admin_bahagian, user
- **Department assignment** - Untuk admin_bahagian

### **✅ Data Persistence:**
- **Firebase primary** - Real-time sync across devices
- **localStorage backup** - Works offline
- **Hybrid approach** - Best of both worlds

## 📱 Testing

### **1. Test Firebase Connection:**
1. **Update config** dalam `src/firebase.js`
2. **Add user** dalam User Management
3. **Check message** - Should show "(Firebase)"
4. **Login** dengan user baru
5. **Test di PC lain** - User should be available

### **2. Test Fallback:**
1. **Disconnect internet**
2. **Add user** - Should show "(Local)"
3. **Login** - Should work with localStorage

## 🛠️ Troubleshooting

### **Error: "Firebase not available"**
- **Check config** dalam `src/firebase.js`
- **Verify project ID** matches Firebase Console
- **Check internet connection**

### **Error: "Permission denied"**
- **Check Firestore Rules** - Should allow read/write
- **Verify project settings** dalam Firebase Console

### **Users not syncing**
- **Check Firebase Console** - Users collection
- **Verify network connection**
- **Check browser console** untuk errors

## 📊 Benefits

### **✅ Cross-device Sync:**
- **User data** sync across all PCs
- **Real-time updates** - Changes appear immediately
- **Offline support** - Works without internet

### **✅ Data Security:**
- **Firebase security** - Built-in authentication
- **Backup system** - localStorage as fallback
- **No data loss** - Dual storage approach

### **✅ Scalability:**
- **Firebase scales** automatically
- **Free tier** generous untuk development
- **Easy migration** ke production

## 🎯 Next Steps

### **1. Production Setup:**
- **Update Firestore Rules** untuk security
- **Enable Firebase Authentication** untuk better security
- **Set up monitoring** dalam Firebase Console

### **2. Advanced Features:**
- **User activity tracking**
- **Password hashing**
- **Email verification**
- **Role-based permissions**

## 📞 Support

**Kalau ada masalah:**
1. **Check Firebase Console** untuk errors
2. **Verify config** dalam `src/firebase.js`
3. **Test dengan simple user** first
4. **Check browser console** untuk detailed errors 