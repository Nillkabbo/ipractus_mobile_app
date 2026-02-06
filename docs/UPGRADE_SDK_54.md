# Expo SDK 52 → 54 আপগ্রেড নোট

## করা হয়েছে
- `expo@^54.0.0` ও সংশ্লিষ্ট প্যাকেজ আপডেট
- React 19.1.0, React Native 0.81.5, Reanimated v4, babel-preset-expo ~54
- `app.json` এ `sdkVersion: "54.0.0"`
- Node minimum: **20.19.4** (SDK 54 রিকোয়ারমেন্ট)
- `.npmrc` এ `legacy-peer-deps=true` (পিয়ার কনফ্লিক্ট এড়াতে)

## Node ভার্সন
SDK 54 চালাতে **Node 20.19.4+** লাগে। nvm ব্যবহার করলে:
```bash
nvm install 20.19
nvm use 20.19
```

## গুরুত্বপূর্ণ পরিবর্তন (SDK 54)
- **React Native 0.81**, **React 19.1**
- **react-native-reanimated v4**: শুধু New Architecture। কোডে Reanimated ব্যবহার থাকলে [Reanimated 3→4 মাইগ্রেশন](https://docs.swmansion.com/react-native-reanimated/docs/guides/migration-from-3.x/) দেখুন।
- **expo-file-system**: নতুন API ডিফল্ট; পুরনো API এর জন্য `expo-file-system/legacy`। (এই প্রজেক্টে ব্যবহার নেই।)
- Android: edge-to-edge ডিফল্ট; iOS: Xcode 16.1 মিনিমাম (Xcode 26 রিকমেন্ডেড)।

## আপগ্রেড পর চেক
```bash
npx expo-doctor
```
প্রি-বিল্ড ব্যবহার করলে একবার `android` ও `ios` ফোল্ডার ডিলিট করে আবার বিল্ড নিন।
