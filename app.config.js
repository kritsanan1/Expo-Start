
module.exports = {
  expo: {
    name: "LoveMatch Thailand",
    slug: "lovematch-thailand",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "lovematch",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    privacy: "unlisted",
    
    // Mobile-first optimization
    splash: {
      image: "./assets/images/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#FF6B6B"
    },
    
    // iOS optimizations
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.lovematch.thailand",
      buildNumber: "1.0.0",
      infoPlist: {
        NSCameraUsageDescription: "This app uses camera for video profile creation",
        NSMicrophoneUsageDescription: "This app uses microphone for video profiles and calls",
        NSPhotoLibraryUsageDescription: "This app accesses photo library for profile pictures"
      }
    },
    
    // Android optimizations
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#FF6B6B"
      },
      package: "com.lovematch.thailand",
      versionCode: 1,
      permissions: [
        "CAMERA",
        "RECORD_AUDIO",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE"
      ]
    },
    
    // Web configuration with security headers
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
      meta: {
        viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
        "theme-color": "#FF6B6B",
        "mobile-web-app-capable": "yes",
        "apple-mobile-web-app-capable": "yes",
        "apple-mobile-web-app-status-bar-style": "default"
      }
    },
    
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#FF6B6B"
        }
      ]
    ],
    
    experiments: {
      typedRoutes: true
    },
    
    // Security and performance
    assetBundlePatterns: [
      "**/*"
    ]
  }
};
