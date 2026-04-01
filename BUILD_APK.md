# Building an APK with Capacitor

This project is configured to build a native Android app using Capacitor. The Blazor WASM app runs inside a native Android shell.

## Prerequisites

1. **Java Development Kit (JDK) 17+**
   - Download from: https://www.oracle.com/java/technologies/downloads/
   - Verify: `java -version`

2. **Android SDK**
   - Install via **Android Studio** (easiest): https://developer.android.com/studio
   - During setup, ensure you install:
     - Android SDK (API level 34 recommended)
     - Android Emulator (optional, for testing)
     - Android SDK Build-tools

3. **Set environment variables** (macOS/Linux):
   ```bash
   export ANDROID_HOME=$HOME/Library/Android/sdk     # macOS
   # or
   export ANDROID_HOME=$HOME/Android/Sdk             # Linux
   export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
   ```

   **Windows**: Set via System Properties → Environment Variables

4. **Node.js 18+** and npm
   - Download from: https://nodejs.org/

## Build Steps

### 1. Clone and prepare
```bash
git clone https://github.com/BrokenMesh/TaskManager.git
cd TaskManager
npm install
```

### 2. Build the Blazor app and sync with Android
```bash
npm run build:android
```

This runs:
- `dotnet publish` (builds the Blazor WASM app)
- `npx cap sync android` (copies the output to the Android project)

### 3. Open in Android Studio
```bash
npm run open:android
```

This launches Android Studio with the Android project.

### 4. Build the APK in Android Studio

**For development (debug APK):**
1. Android Studio → **Build** → **Build Bundle(s) / APK(s)** → **Build APK**
2. Wait for the build to complete (appears in bottom status bar)
3. The APK appears in: `android/app/build/outputs/apk/debug/`

**For release (Play Store):**
1. **Build** → **Build Bundle(s) / APK(s)** → **Build App Bundle**
2. You'll need to sign it with a keystore (Android Studio will prompt you)

### 5. Install on your phone

**Via Android Studio:**
1. Plug in your phone (USB debugging enabled)
2. **Run** → **Run 'app'** → select your device

**Manual install:**
```bash
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

---

## Development Workflow

Make changes to the Blazor app normally:

```bash
# After code changes, rebuild and sync:
npm run build:android

# Then open Android Studio again:
npm run open:android
```

The `android/build.gradle` will rebuild the APK with the latest web assets.

---

## Troubleshooting

**Android SDK not found:**
```bash
# Set manually in Android Studio:
# File → Project Structure → SDK Location → Android SDK Location
# Point to: /path/to/Android/Sdk
```

**Build fails with "Java not found":**
- Ensure JDK 17+ is installed and `JAVA_HOME` is set

**APK won't install:**
```bash
# Check if already installed:
adb shell pm list packages | grep habittracker

# Uninstall first:
adb uninstall com.brokenmesh.habittracker

# Then install:
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

**Device not detected:**
```bash
# List connected devices:
adb devices

# Enable USB debugging on your phone:
# Settings → Developer Options → USB Debugging
```

---

## Notes

- The app uses your service worker, so it works offline
- IndexedDB (local storage) persists data on the device
- The app starts at `https://localhost` (served by Capacitor internally)
- You can access Chrome DevTools: `chrome://inspect/#devices`
