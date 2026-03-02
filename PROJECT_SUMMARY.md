# Hisab App - Project Summary

## 📱 অ্যাপ ওভারভিউ

**Hisab** একটি সম্পূর্ণ অ্যান্ড্রয়িড হিসাব নিকাশ অ্যাপ যা React Native Expo দিয়ে তৈরি।

### মূল বৈশিষ্ট্যসমূহ

| ফিচার | বিবরণ |
|--------|--------|
| 🔐 OAuth 2.0 | Google Sign-In অথেনটিকেশন |
| 💰 হিসাব নিকাশ | আয় ও ব্যয় ট্র্যাকিং |
| ☁️ ব্যাকআপ | Google Drive এ অটোমেটিক ব্যাকআপ |
| 📎 মেমো | ছবি ও ডকুমেন্ট সংযুক্তি |
| 🎨 ডিজাইন | প্রিমিয়াম ডার্ক থিম |
| 🤖 CI/CD | GitHub Actions অটোমেশন |

---

## 🏗️ আর্কিটেকচার

### Tech Stack

```
Frontend: React Native + TypeScript
State Management: Zustand
Navigation: React Navigation v6
UI Library: React Native Paper + Custom Components
Animations: Moti + Reanimated
Storage: AsyncStorage + SQLite
Auth: Google Sign-In (OAuth 2.0)
Backup: Google Drive API
```

### Folder Structure

```
hisab-app/
├── src/
│   ├── components/     # UI Components
│   ├── screens/        # App Screens
│   ├── navigation/     # Navigation Config
│   ├── services/       # API Services
│   ├── store/          # State Management
│   ├── hooks/          # Custom Hooks
│   ├── theme/          # Colors & Typography
│   ├── types/          # TypeScript Types
│   ├── constants/      # App Constants
│   └── utils/          # Helper Functions
├── .github/workflows/  # CI/CD Pipelines
├── assets/             # Images & Icons
└── android/            # Native Android Code
```

---

## 🔐 অথেনটিকেশন ফ্লো

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   User      │────▶│ Google      │────▶│   App       │
│   Request   │     │ Sign-In     │     │   Store     │
└─────────────┘     └─────────────┘     └─────────────┘
                                              │
                                              ▼
                                        ┌─────────────┐
                                        │  Secure     │
                                        │  Storage    │
                                        └─────────────┘
```

### OAuth 2.0 Flow
1. User clicks "Sign in with Google"
2. Google Sign-In SDK opens
3. User grants permission
4. App receives access token
5. Token stored in SecureStore
6. User state updated in Zustand

---

## 💾 ডেটা ফ্লো

### Local Storage
```
User Input → Zustand Store → AsyncStorage
                  ↑
            App State
                  ↓
UI Components ← Selectors
```

### Backup Flow
```
Local Data → JSON Export → Google Drive API
                               ↓
                        Backup Folder
                               ↓
                        File: hisab_backup_YYYY-MM-DD.json
```

### Restore Flow
```
Google Drive → List Backups → Select Backup
                                   ↓
                            Download JSON
                                   ↓
                            Parse & Restore
                                   ↓
                            Update Zustand Store
```

---

## 🎨 UI/UX ডিজাইন

### Color Palette
```
Primary:    #6366f1 (Indigo)
Secondary:  #ec4899 (Pink)
Success:    #22c55e (Green)
Error:      #ef4444 (Red)
Warning:    #f59e0b (Amber)
Background: #0f0f1a (Dark)
Surface:    #1a1a2e (Card)
Text:       #ffffff (White)
```

### Design Principles
- **Glassmorphism**: Translucent cards with blur
- **Gradient Accents**: Smooth color transitions
- **Smooth Animations**: Spring-based transitions
- **Consistent Spacing**: 4px grid system
- **Dark First**: Optimized for dark mode

---

## 🤖 CI/CD Pipeline

### GitHub Actions Workflows

#### 1. Build Android App (`build-android.yml`)
```yaml
Triggers:
  - Push to main/develop
  - Pull request to main
  - Manual dispatch

Jobs:
  1. lint-and-test
     - ESLint check
     - TypeScript check
  
  2. build-android
     - Setup environment
     - Decode secrets
     - Build APK/AAB
     - Upload artifacts
     - Create release
  
  3. build-with-eas
     - Expo cloud build
  
  4. notify
     - Status notification
```

#### 2. Simple Build (`simple-build.yml`)
```yaml
Jobs:
  1. build
     - Install dependencies
     - Run tests
     - Build project
  
  2. code-quality
     - ESLint
     - Prettier check
```

### Build Outputs

| Type | Format | Purpose |
|------|--------|---------|
| APK | .apk | Direct install |
| AAB | .aab | Play Store upload |
| EAS | .apk | Preview builds |

---

## 📦 ইনস্টলেশন গাইড

### Step 1: Clone Repository
```bash
git clone https://github.com/yourusername/hisab-app.git
cd hisab-app
```

### Step 2: Run Setup Script
```bash
./setup.sh
```

### Step 3: Configure Environment
```bash
cp .env.example .env
# Edit .env with your credentials
```

### Step 4: Start Development
```bash
npm start
# Press 'a' for Android
# Press 'i' for iOS
```

---

## 🔧 কনফিগারেশন

### Required Configurations

#### 1. Google OAuth
```json
// app.json
{
  "expo": {
    "plugins": [
      ["@react-native-google-signin/google-signin", {
        "iosUrlScheme": "com.googleusercontent.apps.YOUR_IOS_CLIENT_ID"
      }]
    ]
  }
}
```

#### 2. Environment Variables
```env
GOOGLE_WEB_CLIENT_ID=your_web_client_id
GOOGLE_IOS_CLIENT_ID=your_ios_client_id
EXPO_PROJECT_ID=your_expo_project_id
```

#### 3. GitHub Secrets
- `GOOGLE_SERVICES_JSON`
- `ANDROID_KEYSTORE`
- `KEYSTORE_ALIAS`
- `KEYSTORE_PASSWORD`
- `EXPO_TOKEN`

---

## 🧪 টেস্টিং

### Unit Tests
```bash
npm test
```

### Linting
```bash
npm run lint
```

### Type Checking
```bash
npx tsc --noEmit
```

### E2E Tests
```bash
npm run test:e2e
```

---

## 📱 স্ক্রিন ডিটেইলস

### 1. Auth Screen
- App logo and branding
- Feature highlights
- Google Sign-In button

### 2. Home Screen
- Balance card with gradient
- Quick action buttons
- Recent transactions list
- Monthly summary

### 3. Add Transaction Screen
- Income/Expense toggle
- Amount input with currency
- Category selector
- Date picker
- Memo attachment

### 4. Backup/Restore Screen
- Backup statistics
- One-click backup
- Restore from Google Drive
- Backup history

### 5. Profile Screen
- User info card
- Settings menu
- Sign out option

---

## 🔒 সিকিউরিটি

### Data Protection
- ✅ OAuth 2.0 for authentication
- ✅ SecureStore for sensitive data
- ✅ Encrypted local storage
- ✅ Biometric authentication support

### Best Practices
- No hardcoded secrets
- Environment variables
- Certificate pinning
- Input validation

---

## 📈 পারফরম্যান্স

### Optimizations
- Lazy loading screens
- Image compression
- Memoization
- FlatList for long lists
- Animation optimization

### Metrics
- App size: ~25MB
- Launch time: <2s
- Smooth 60fps animations

---

## 🚀 ডিপ্লয়মেন্ট

### Development
```bash
npm start
```

### Preview
```bash
eas build --profile preview
```

### Production
```bash
eas build --profile production
```

### Play Store
1. Build AAB: `eas build --profile production`
2. Download AAB from Expo
3. Upload to Google Play Console

---

## 📝 কোডিং স্ট্যান্ডার্ড

### TypeScript
- Strict mode enabled
- No `any` types
- Interface-driven development

### Component Pattern
```tsx
interface Props {
  // Props definition
}

export const Component: React.FC<Props> = (props) => {
  // Implementation
};
```

### Naming Conventions
- Components: PascalCase
- Functions: camelCase
- Constants: UPPER_SNAKE_CASE

---

## 🐛 ডিবাগিং

### Common Issues

| Issue | Solution |
|-------|----------|
| Metro bundler error | `npm start -- --reset-cache` |
| Gradle build fail | `cd android && ./gradlew clean` |
| Sign-in fail | Check Google OAuth credentials |
| Backup fail | Verify Google Drive API enabled |

### Debug Tools
- React Native Debugger
- Flipper
- Chrome DevTools
- Android Studio Profiler

---

## 📚 লার্নিং রিসোর্স

### Documentation
- [React Native](https://reactnative.dev/)
- [Expo](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Zustand](https://github.com/pmndrs/zustand)

### Tutorials
- OAuth 2.0 with React Native
- Google Drive API Integration
- CI/CD with GitHub Actions

---

## 🤝 কন্ট্রিবিউশন

### How to Contribute
1. Fork the repository
2. Create feature branch
3. Make changes
4. Submit PR

### Code Review
- All PRs reviewed
- CI checks must pass
- Approval required

---

## 📄 লাইসেন্স

MIT License - See [LICENSE](LICENSE) file

---

## 👥 টিম

- **Developer**: Your Name
- **Designer**: Your Designer
- **Tester**: Your Tester

---

## 📞 সাপোর্ট

- Email: support@hisab.app
- GitHub Issues: [Create Issue](https://github.com/yourusername/hisab-app/issues)
- Discussions: [GitHub Discussions](https://github.com/yourusername/hisab-app/discussions)

---

**Thank you for using Hisab!** 🎉
