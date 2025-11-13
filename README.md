# 📱 MoodLog – Minimal Mobile Mood Tracker (Expo React Native)

A clean, modern **mobile app** built with **Expo + React Native** that lets you quickly log your mood with an optional note and see your recent entries in a filtered list.

---

## ✨ Features

- Pick a mood from presets: 😄 Great, 😊 Good, 😐 Meh, 😔 Bad, 😭 Terrible
- Add an optional note (e.g. "Coffee with friends", "Midterm today")
- Recent entries list with:
  - Mood badge
  - Timestamp
  - Note text
- Filter entries by:
  - All moods
  - Specific mood (only show Great / Good / etc.)
- Clean dark UI, card-based layout, responsive on both iOS & Android

Data is stored **in-memory** for simplicity (no backend required).

---

## 🛠 Tech Stack

- **React Native**
- **Expo**
- **JavaScript (ES6+)**
- Functional components + Hooks (`useState`, `useMemo`)
- Styled using `StyleSheet` and Flexbox

---

## ▶️ How to Run (Local Device or Simulator)

### 1. Install Dependencies

Make sure you have **Node.js** installed, then:

```bash
npm install -g expo-cli
```

Inside the project folder:

```bash
npm install
```

### 2. Start the App

```bash
npm start
```

This runs the Expo dev server.

You’ll see a QR code in your terminal / browser.

---

## 📱 View on Your Phone (Recommended)

1. Install the **Expo Go** app:
   - iOS: App Store
   - Android: Google Play
2. Scan the QR code from `npm start` with the Expo Go app.
3. The **MoodLog** app will open on your phone.

---

## 💻 Run on Emulator / Simulator

From the Expo dev tools UI or terminal:

```bash
npm run android
# or
npm run ios
# (iOS requires Xcode and a Mac)
```

---

## 📂 Project Structure

```text
moodlog-mobile/
├─ App.js          # Main app UI & logic
├─ package.json    # Dependencies and scripts
├─ app.json        # Expo configuration
└─ babel.config.js # Babel config for Expo
```
