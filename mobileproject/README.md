# 📱 Mobile Automation Framework (Playwright + Appium + TypeScript)

A complete guide to setting up and running **mobile automation** tests using **Playwright**, **Appium**, and **TypeScript** — both **locally** and on **Sauce Labs**.

---

## 🧩 Overview

This repository helps you:

- Set up local mobile automation on Android emulators or real devices.
- Write and run Playwright + Appium tests.
- Integrate with Sauce Labs for cloud execution.

---

## 🧱 Prerequisites

| Tool                          | Description                         | Download / Install                                                                             |
| ----------------------------- | ----------------------------------- | ---------------------------------------------------------------------------------------------- |
| **Node.js (v23.5.0)** used    | Required to run Playwright + Appium | company portal                                                                                 |
| **Android Studio 2025.1.4.8** | Provides SDK, Emulator, ADB         | Company portal                                                                                 |
| **Appium 2.4.1**              | Mobile automation framework         | via `npm install -g appium`                                                                    |
| **WebdriverIO**               | Playwright and Appium Connection    | install via command                                                                            |
| **uiautomator2**              | Android automation                  | via `appium driver install uiautomator2`                                                       |
| **Appium Inspector**          | GUI tool for locating XPaths, IDs   | Pls refer the link `https://appium.github.io/appium-inspector/latest/quickstart/installation/` |

---

## 🧩 How to run in local device

**Android Studio**

- Install app in emulator `adb install <path\app\SauceDemo.apk>`
- Open android studio and in Device Manager - Click on Start for a device
- After the device is turned on
- run command `adb devices`
  List of devices attached
  emulator-5554 device
- You can see the above message, If emulator is successfully launched.

---

- Also you can see the appPackage and appActivity in AndroidStudio
  -Android studio -> Main menu -> Build -> Analyze APK -> upload your app -> There will be a file `AndroidManifest.xml` -> inside that you can search for appActivity and appPackage.

---

## ⚙️ 1. Environment Variables (Windows)

Add these in **System Properties → Environment Variables → User Variables**:

| Variable                                                                               | Example Path                                |
| -------------------------------------------------------------------------------------- | ------------------------------------------- |
| `ANDROID_SDK_ROOT`                                                                     | `C:\Users\<User>\AppData\Local\Android\Sdk` |
| `ANDROID_HOME`                                                                         | `C:\Users\<User>\AppData\Local\Android\Sdk` |
| `PATH` edit path then click new and add all 3                                          |
| Add:`%ANDROID_HOME%\platform-tools`, `%ANDROID_HOME%\tools`, `%ANDROID_HOME%\emulator` |

Verify setup:

```
appium -v
adb version

```

## 🧩 How to run Appium Inspector locally

- Emulator should be turned on in Android studio : `adb devices`
- After installing the plugins
  Install the plugin:
  For Appium 3: `appium plugin install inspector`
  For Appium 2 (last compatible version): `appium plugin install --source=npm appium-inspector-plugin@2025.7.3`

- Launch the Appium server with the plugin activated: `appium --use-plugins=inspector --allow-cors`
- Open the Inspector URL in your web browser: `http://localhost:4723/inspector`
- Then give the capabilities and start session.
- Close appium inspector before running npx appium (appium server).

## 🧩 How to run test

- run command `npx appium` -> to start appium server
- run command `npx playwright test` -> to run playwright script

- run command `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` -> Got any error in Execution policy

## 🧩 How to run test in cloud

- run command `npx appium` -> to start appium server
- run command `npx playwright test` -> to run playwright script

- npx : File C:\Program Files\nodejs\npx.ps1 cannot be loaded
  because running scripts is disabled on this system. For more
  information, see about_Execution_Policies at ...
- run command `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` -> Got any error in Execution policy
