# GitHub Actions Setup Guide

এই গাইড আপনাকে GitHub Actions CI/CD পাইপলাইন সেটআপ করতে সাহায্য করবে।

## 📋 প্রয়োজনীয় স্টেপস

### 1. GitHub Secrets সেটআপ

আপনার GitHub রিপোজিটরিতে যান:
**Settings → Secrets and variables → Actions**

নিচের সিক্রেটগুলো যোগ করুন:

#### Google Services Configuration
```bash
# 1. আপনার google-services.json ফাইল Base64 এনকোড করুন
base64 -i android/app/google-services.json

# 2. আউটপুটটি GOOGLE_SERVICES_JSON হিসেবে সেভ করুন
```

#### Keystore Configuration
```bash
# 1. Keystore তৈরি করুন (যদি না থাকে)
keytool -genkey -v -keystore hisab.keystore -alias hisab -keyalg RSA -keysize 2048 -validity 10000

# 2. Keystore Base64 এনকোড করুন
base64 -i hisab.keystore

# 3. আউটপুটটি ANDROID_KEYSTORE হিসেবে সেভ করুন
```

#### Required Secrets

| Secret Name | Description | How to Get |
|-------------|-------------|------------|
| `GOOGLE_SERVICES_JSON` | Base64 encoded google-services.json | `base64 -i google-services.json` |
| `ANDROID_KEYSTORE` | Base64 encoded keystore file | `base64 -i keystore.jks` |
| `KEYSTORE_ALIAS` | Keystore alias | Your keystore alias |
| `KEYSTORE_PASSWORD` | Keystore password | Your keystore password |
| `KEY_PASSWORD` | Key password | Your key password |
| `EXPO_TOKEN` | Expo access token | [Expo Dashboard](https://expo.dev/settings/access-tokens) |
| `GITHUB_TOKEN` | Auto-generated | No setup needed |

### 2. Google Cloud Console Setup

#### OAuth 2.0 Credentials
1. [Google Cloud Console](https://console.cloud.google.com/) এ যান
2. নতুন প্রোজেক্ট তৈরি করুন
3. **APIs & Services → Credentials** এ যান
4. **Create Credentials → OAuth client ID** সিলেক্ট করুন
5. Application type: **Android** এবং **Web application** দুটিই তৈরি করুন

#### Enable APIs
- Google Drive API
- Google Sign-In API

#### Download Credentials
- `google-services.json` ডাউনলোড করুন
- Web Client ID এবং iOS Client ID নোট করুন

### 3. Expo Setup (Optional)

#### EAS Build ব্যবহার করতে:
1. [Expo](https://expo.dev/) এ অ্যাকাউন্ট তৈরি করুন
2. নতুন প্রোজেক্ট তৈরি করুন
3. **Settings → Access Tokens** এ যান
4. নতুন টোকেন তৈরি করুন
5. টোকেনটি `EXPO_TOKEN` হিসেবে GitHub Secrets এ যোগ করুন

### 4. Workflow Configuration

#### Build Types

**APK Build (Development)**
```yaml
workflow_dispatch:
  inputs:
    build_type:
      default: 'apk'
```

**AAB Build (Play Store)**
```yaml
workflow_dispatch:
  inputs:
    build_type:
      default: 'aab'
```

### 5. Automatic Builds

প্রতি push এ অটোমেটিক বিল্ড:
```yaml
on:
  push:
    branches: [main, develop]
```

### 6. Manual Trigger

GitHub Actions ট্যাবে গিয়ে:
1. **Build Android App** workflow সিলেক্ট করুন
2. **Run workflow** বাটনে ক্লিক করুন
3. **Build Type** নির্বাচন করুন (apk/aab)
4. **Branch** নির্বাচন করুন
5. **Run workflow** ক্লিক করুন

## 🔧 Troubleshooting

### Common Issues

#### Issue 1: Keystore Error
```
Error: Keystore file not found
```
**Solution:** নিশ্চিত করুন `ANDROID_KEYSTORE` সঠিকভাবে Base64 এনকোড করা আছে

#### Issue 2: Google Services Error
```
Error: File google-services.json is missing
```
**Solution:** `GOOGLE_SERVICES_JSON` সিক্রেট চেক করুন

#### Issue 3: Permission Denied
```
Error: Permission denied (publickey)
```
**Solution:** GitHub টোকেন পারমিশন চেক করুন

### Debug Steps

1. **Workflow Logs চেক করুন**
   - GitHub Actions → Build → Logs

2. **Secrets Verify করুন**
   ```bash
   # Local test
   echo "$GOOGLE_SERVICES_JSON" | base64 -d > test.json
   cat test.json
   ```

3. **Build Locally**
   ```bash
   cd android && ./gradlew assembleRelease --stacktrace
   ```

## 📊 Build Outputs

### Artifacts
সফল বিল্ডের পর:
- APK: `android/app/build/outputs/apk/release/`
- AAB: `android/app/build/outputs/bundle/release/`

### GitHub Releases
Main branch এ push করলে অটোমেটিক Release তৈরি হয়:
- Tag: `v{run_number}`
- APK attached

## 🚀 Deployment

### Play Store
1. AAB ফাইল ডাউনলোড করুন
2. [Google Play Console](https://play.google.com/console) এ যান
3. নতুন রিলিজ তৈরি করুন
4. AAB আপলোড করুন

### Internal Testing
```bash
# APK distribute
eas build --platform android --profile preview
```

## 📈 Monitoring

### Build Status Badge
README.md এ যোগ করুন:
```markdown
![Build Status](https://github.com/yourusername/hisab-app/workflows/Build%20Android%20App/badge.svg)
```

### Notifications
Slack/Discord integration:
```yaml
- name: Notify Slack
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    channel: '#builds'
```

## 🔒 Security Best Practices

1. **Never commit secrets**
   - সবসময় GitHub Secrets ব্যবহার করুন

2. **Rotate tokens regularly**
   - 90 দিন পর পর টোকেন রিনিউ করুন

3. **Use least privilege**
   - শুধু প্রয়োজনীয় পারমিশন দিন

4. **Enable branch protection**
   - Main branch প্রোটেক্ট করুন

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Expo EAS Build](https://docs.expo.dev/build/introduction/)
- [Android App Bundle](https://developer.android.com/guide/app-bundle)

---

**সাহায্যের জন্য:** [GitHub Discussions](https://github.com/yourusername/hisab-app/discussions)
