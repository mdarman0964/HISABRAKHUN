# Contributing to Hisab

আপনার অবদানের জন্য ধন্যবাদ! 🎉

## ডেভেলপমেন্ট সেটআপ

### প্রয়োজনীয়তা
- Node.js 20+
- npm বা yarn
- Android Studio (Android বিল্ডের জন্য)
- Xcode (iOS বিল্ডের জন্য, Mac only)

### সেটআপ স্টেপস

1. **রিপোজিটরি ফোর্ক করুন**
```bash
git clone https://github.com/yourusername/hisab-app.git
cd hisab-app
```

2. **ডিপেন্ডেন্সি ইনস্টল করুন**
```bash
npm install
```

3. **ডেভেলপমেন্ট সার্ভার রান করুন**
```bash
npm start
```

## ব্রাঞ্চিং স্ট্র্যাটেজি

- `main` - স্টেবিল প্রোডাকশন কোড
- `develop` - ডেভেলপমেন্ট ব্রাঞ্চ
- `feature/*` - নতুন ফিচার
- `bugfix/*` - বাগ ফিক্স
- `hotfix/*` - জরুরি ফিক্স

## কোডিং স্ট্যান্ডার্ড

### TypeScript
- সব ফাইল `.ts` বা `.tsx` এক্সটেনশনে থাকবে
- সব ফাংশনে টাইপ ডিফাইন করুন
- `any` টাইপ এভয়ড করুন

### Component Structure
```tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  title: string;
  onPress: () => void;
}

export const MyComponent: React.FC<Props> = ({ title, onPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  text: {
    fontSize: 16,
  },
});
```

### Naming Conventions
- **Components**: PascalCase (e.g., `BalanceCard`)
- **Functions**: camelCase (e.g., `handleSubmit`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_FILE_SIZE`)
- **Files**: PascalCase for components, camelCase for utilities

## কমিট মেসেজ ফরম্যাট

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: নতুন ফিচার
- `fix`: বাগ ফিক্স
- `docs`: ডকুমেন্টেশন পরিবর্তন
- `style`: ফরম্যাটিং (স্পেসিং, সেমিকোলন, ইত্যাদি)
- `refactor`: কোড রিফ্যাক্টর
- `test`: টেস্ট যোগ বা পরিবর্তন
- `chore`: বিল্ড প্রসেস বা অক্সিলিয়ারি টুল

### Examples
```
feat(auth): add Google Sign-In support

fix(backup): resolve Google Drive upload issue

docs(readme): update installation instructions
```

## Pull Request প্রসেস

1. **ব্রাঞ্চ তৈরি করুন**
```bash
git checkout -b feature/your-feature-name
```

2. **চেঞ্জ করুন এবং কমিট করুন**
```bash
git add .
git commit -m "feat: add new feature"
```

3. **পুশ করুন**
```bash
git push origin feature/your-feature-name
```

4. **Pull Request তৈরি করুন**
   - GitHub এ PR তৈরি করুন
   - `develop` ব্রাঞ্চে মার্জ করুন
   - PR টেমপ্লেট পূরণ করুন

## PR চেকলিস্ট

- [ ] কোড কম্পাইল হয়
- [ ] লিন্টিং পাস করে
- [ ] টাইপScript এরর নেই
- [ ] নতুন ফিচারের জন্য টেস্ট যোগ করা হয়েছে
- [ ] ডকুমেন্টেশন আপডেট করা হয়েছে
- [ ] কোড রিভিউ করা হয়েছে

## টেস্টিং

### Unit Tests
```bash
npm test
```

### E2E Tests
```bash
npm run test:e2e
```

### Linting
```bash
npm run lint
```

### Type Checking
```bash
npx tsc --noEmit
```

## রিপোর্টিং ইস্যু

### বাগ রিপোর্ট
- ক্লিয়ার টাইটেল দিন
- স্টেপস টু রিপ্রোডিউস লিখুন
- এক্সপেক্টেড vs অ্যাকচুয়াল বিহেভিয়ার
- স্ক্রিনশট/ভিডিও যোগ করুন
- ডিভাইস/অপারেটিং সিস্টেম তথ্য

### ফিচার রিকোয়েস্ট
- ফিচারের বিস্তারিত বর্ণনা
- কেন এটি প্রয়োজন
- সম্ভাব্য ইমপ্লিমেন্টেশন

## কোড রিভিউ

সব PR রিভিউ করা হয়:
- কোড কোয়ালিটি
- পারফরম্যান্স
- সিকিউরিটি
- অ্যাক্সেসিবিলিটি

## কমিউনিকেশন

- GitHub Issues: বাগ রিপোর্ট ও ফিচার রিকোয়েস্ট
- GitHub Discussions: সাধারণ আলোচনা
- Email: dev@hisab.app

## লাইসেন্স

অবদান রাখার মাধ্যমে, আপনি সম্মত হন যে আপনার কোড MIT লাইসেন্সের অধীনে লাইসেন্সকৃত হবে।

---

**ধন্যবাদ!** 🙏
