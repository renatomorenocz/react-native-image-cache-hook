# React Native Image Cache hook

[![CircleCI](https://circleci.com/gh/renatomorenocz/react-native-image-cache-hook.svg?style=svg)](https://circleci.com/gh/renatomorenocz/react-native-image-cache-hook/)

React Native image cache hook for iOS and Android is a simple hook to do cache in file system of images from network.

## Installation

```
yarn add react-native-expo-image-cache
```

We use [rn-fetch-blob](https://github.com/joltup/rn-fetch-blob) to handle file system access in this package and it requires an extra step during the installation.

Install rn-fetch-blob

```sh
yarn install --save rn-fetch-blob
```

Or if using CocoaPods, add the pod to your `Podfile`

```
pod 'rn-fetch-blob',
    :path => '../node_modules/rn-fetch-blob'
```

**Manually Link Native Modules**

If automatically linking doesn't work for you, see instructions on [manually linking](https://github.com/joltup/rn-fetch-blob/wiki/Manually-Link-Package#index).

**Automatically Link Native Modules**

For 0.29.2+ projects, simply link native packages via the following command (note: rnpm has been merged into react-native)

```
react-native link rn-fetch-blob
```

As for projects < 0.29 you need `rnpm` to link native packages

```sh
npm link
```

Optionally, use the following command to add Android permissions to `AndroidManifest.xml` automatically

```sh
RNFB_ANDROID_PERMISSIONS=true react-native link rn-fetch-blob
```

pre 0.29 projects

```sh
RNFB_ANDROID_PERMISSIONS=true rnpm link
```

The link script might not take effect if you have non-default project structure, please visit [the wiki](https://github.com/joltup/rn-fetch-blob/wiki/Manually-Link-Package) to link the package manually.

**Grant Permission to External storage for Android 5.0 or lower**

The mechanism for granting Android permissions has slightly different since Android 6.0 released, please refer to [Official Document](https://developer.android.com/training/permissions/requesting.html).

If you're going to access external storage (say, SD card storage) for `Android 5.0` (or lower) devices, you might have to add the following line to `AndroidManifest.xml`.

```diff
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.rnfetchblobtest"
    android:versionCode="1"
    android:versionName="1.0">

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW"/>
+   <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
+   <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
+   <uses-permission android:name="android.permission.DOWNLOAD_WITHOUT_NOTIFICATION" />
    ...

```

Also, if you're going to use `Android Download Manager` you have to add this to `AndroidManifest.xml`

```diff
    <intent-filter>
            <action android:name="android.intent.action.MAIN" />
            <category android:name="android.intent.category.LAUNCHER" />
+           <action android:name="android.intent.action.DOWNLOAD_COMPLETE"/>
    </intent-filter>
```

If you are going to use the `wifiOnly` flag, you need to add this to `AndroidManifest.xml`

```diff
+   <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    ...

```

**Grant Access Permission for Android 6.0**

Beginning in Android 6.0 (API level 23), users grant permissions to apps while the app is running, not when they install the app. So adding permissions in `AndroidManifest.xml` won't work for Android 6.0+ devices. To grant permissions in runtime, you might use [PermissionAndroid API](https://facebook.github.io/react-native/docs/permissionsandroid.html).

## Usage

### Props

| Props    | Default  |          Options |
| -------- | :------: | ---------------: |
| uri      |          |        image uri |
| cacheDir | /images/ | custom cache dir |

### <Image>

```js
import useImageCache from 'react-native-image-cache-hook';

const path = useImageCache('https://via.placeholder.com/400');

<Image source={{uri: path}} style={{width: 400, height: 400}} />;
```
