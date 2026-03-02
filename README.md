# Hisab - হিসাব নিকাশ

<p align="center">
  <img src="./assets/icon.png" width="120" height="120" alt="Hisab App Logo">
</p>

<p align="center">
  <b>আপনার ব্যক্তিগত হিসাব নিকাশ অ্যাপ</b>
</p>

<p align="center">
  <a href="https://github.com/yourusername/hisab-app/actions">
    <img src="https://github.com/yourusername/hisab-app/workflows/Build%20Android%20App/badge.svg" alt="Build Status">
  </a>
  <a href="https://github.com/yourusername/hisab-app/releases">
    <img src="https://img.shields.io/github/v/release/yourusername/hisab-app" alt="Latest Release">
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License">
  </a>
</p>

---

## ✨ বৈশিষ্ট্যসমূহ

### 🔐 নিরাপত্তা
- **OAuth 2.0 Authentication** - গুগল সাইন-ইন সমর্থন
- **বায়োমেট্রিক অথেনটিকেশন** - ফিঙ্গারপ্রিন্ট/ফেস আইডি
- **সিকিউর স্টোরেজ** - এনক্রিপ্টেড ডেটা সংরক্ষণ

### 💰 হিসাব নিকাশ
- **আয় ও ব্যয় ট্র্যাকিং** - সহজে লেনদেন রেকর্ড করুন
- **ক্যাটাগরি ব্যবস্থাপনা** - কাস্টম ক্যাটাগরি তৈরি
- **মাসিক সারাংশ** - আয়-ব্যয়ের পরিসংখ্যান
- **চার্ট ও গ্রাফ** - ভিজ্যুয়াল রিপোর্ট

### ☁️ ব্যাকআপ
- **গুগল ড্রাইভ ব্যাকআপ** - অটোমেটিক ব্যাকআপ
- **ওয়ান-ক্লিক রিস্টোর** - সহজে ডেটা পুনরুদ্ধার
- **মাল্টিপল ব্যাকআপ** - ব্যাকআপ ইতিহাস

### 📎 মেমো সংযুক্তি
- **ছবি সংযুক্তি** - রসিদ/বিলের ছবি
- **ডকুমেন্ট আপলোড** - PDF, Word ফাইল
- **ক্যামেরা ক্যাপচার** - সরাসরি ছবি তোলা

### 🎨 প্রিমিয়াম ডিজাইন
- **ডার্ক থিম** - আধুনিক ডার্ক UI
- **গ্লাসমর্ফিজম** - প্রিমিয়াম ভিজ্যুয়াল এফেক্ট
- **স্মুথ অ্যানিমেশন** - ফ্লুইড ইন্টারঅ্যাকশন
- **বাংলা ইন্টারফেস** - বাংলা ভাষা সমর্থন

---

## 🚀 ইনস্টলেশন

### প্রয়োজনীয়তা
- Node.js 20+
- npm বা yarn
- Android Studio (Android বিল্ডের জন্য)
- Java 17

### সেটআপ

1. **রিপোজিটরি ক্লোন করুন**
```bash
git clone https://github.com/yourusername/hisab-app.git
cd hisab-app
```

2. **ডিপেন্ডেন্সি ইনস্টল করুন**
```bash
npm install
```

3. **এনভায়রনমেন্ট ভেরিয়েবল সেটআপ**
```bash
cp .env.example .env
```
`.env` ফাইলে আপনার কনফিগারেশন দিন:
```env
GOOGLE_WEB_CLIENT_ID=your_web_client_id
GOOGLE_IOS_CLIENT_ID=your_ios_client_id
EXPO_PROJECT_ID=your_expo_project_id
```

4. **Google Sign-In কনফিগার করুন**
   - [Google Cloud Console](https://console.cloud.google.com/) এ যান
   - একটি নতুন প্রোজেক্ট তৈরি করুন
   - OAuth 2.0 ক্রেডেনশিয়াল তৈরি করুন
   - Web Client ID এবং iOS Client ID কপি করুন
   - `app.json` এ আপডেট করুন

5. **অ্যাপ রান করুন**
```bash
# ডেভেলপমেন্ট মোড
npm start

# Android এমুলেটরে
npm run android

# iOS সিমুলেটরে (Mac only)
npm run ios
```

---

## 📱 স্ক্রিনশট

<p align="center">
  <img src="./screenshots/home.png" width="200" alt="Home Screen">
  <img src="./screenshots/add.png" width="200" alt="Add Transaction">
  <img src="./screenshots/backup.png" width="200" alt="Backup">
  <img src="./screenshots/profile.png" width="200" alt="Profile">
</p>

---

## 🏗️ প্রোজেক্ট স্ট্রাকচার

```
hisab-app/
├── .github/
│   └── workflows/          # GitHub Actions CI/CD
├── android/                # Android native code
├── assets/                 # Images, fonts, icons
├── ios/                    # iOS native code
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── BalanceCard.tsx
│   │   ├── GlassCard.tsx
│   │   ├── GradientButton.tsx
│   │   └── TransactionItem.tsx
│   ├── constants/          # App constants
│   ├── hooks/              # Custom React hooks
│   ├── navigation/         # Navigation setup
│   ├── screens/            # App screens
│   │   ├── AuthScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── AddTransactionScreen.tsx
│   │   ├── BackupRestoreScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── services/           # API services
│   │   ├── auth.ts         # OAuth 2.0 auth
│   │   ├── backup.ts       # Google Drive backup
│   │   └── memo.ts         # File upload
│   ├── store/              # Zustand state management
│   ├── theme/              # Colors, typography
│   ├── types/              # TypeScript types
│   └── utils/              # Helper functions
├── App.tsx                 # Entry point
├── app.json                # Expo config
├── babel.config.js         # Babel config
├── eas.json                # EAS build config
├── metro.config.js         # Metro bundler config
├── package.json            # Dependencies
└── tsconfig.json           # TypeScript config
```

---

## 🔧 GitHub Actions CI/CD

### স্বয়ংক্রিয় বিল্ড

প্রতি push এ অটোমেটিক:
- ✅ Linting ও TypeScript চেক
- ✅ Android APK বিল্ড
- ✅ Android AAB বিল্ড
- ✅ GitHub Release তৈরি

### ম্যানুয়াল ট্রিগার

GitHub Actions ট্যাবে গিয়ে "Run workflow" ক্লিক করুন:
- **Build Type**: APK বা AAB নির্বাচন করুন
- **Branch**: main বা develop

### সিক্রেট সেটআপ

GitHub Repository → Settings → Secrets এ যোগ করুন:

| Secret | Description |
|--------|-------------|
| `GOOGLE_SERVICES_JSON` | Base64 encoded google-services.json |
| `ANDROID_KEYSTORE` | Base64 encoded keystore.jks |
| `KEYSTORE_ALIAS` | Keystore alias |
| `KEYSTORE_PASSWORD` | Keystore password |
| `KEY_PASSWORD` | Key password |
| `EXPO_TOKEN` | Expo access token |

---

## 📦 বিল্ড কমান্ড

### লোকাল বিল্ড

```bash
# APK বিল্ড
npx expo prebuild --platform android
cd android && ./gradlew assembleRelease

# AAB বিল্ড
cd android && ./gradlew bundleRelease
```

### EAS বিল্ড

```bash
# Preview APK
eas build --platform android --profile preview

# Production AAB
eas build --platform android --profile production
```

---

## 🤝 অবদান রাখুন

1. Fork করুন
2. Feature branch তৈরি করুন (`git checkout -b feature/amazing-feature`)
3. Commit করুন (`git commit -m 'Add amazing feature'`)
4. Push করুন (`git push origin feature/amazing-feature`)
5. Pull Request তৈরি করুন

---

## 📄 লাইসেন্স

এই প্রোজেক্ট MIT লাইসেন্সের অধীনে লাইসেন্সকৃত। বিস্তারিত দেখুন [LICENSE](LICENSE) ফাইল।

---

## 👨‍💻 ডেভেলপার

**Your Name** - [@yourtwitter](https://twitter.com/yourtwitter) - email@example.com

প্রোজেক্ট লিংক: [https://github.com/yourusername/hisab-app](https://github.com/yourusername/hisab-app)

---

## 🙏 কৃতজ্ঞতা

- [Expo](https://expo.dev/) - React Native ডেভেলপমেন্ট প্ল্যাটফর্ম
- [React Navigation](https://reactnavigation.org/) - নেভিগেশন লাইব্রেরি
- [Zustand](https://github.com/pmndrs/zustand) - স্টেট ম্যানেজমেন্ট
- [Moti](https://moti.fyi/) - অ্যানিমেশন লাইব্রেরি
- [React Native Paper](https://reactnativepaper.com/) - UI কম্পোনেন্টস

---

<p align="center">
  <b>⭐ এই প্রোজেক্টটি ভালো লাগলে স্টার দিন!</b>
</p>
