## Cheatsheet for Sandy-Search
as of 10 Feb 2020

NOTE: Currently using (and working with):
Ionic:
 - Ionic CLI          : 5.4.16
 - Ionic Framework    : ionic-angular 3.9.2
 - @ionic/app-scripts : 3.1.9

Cordova:
 - Cordova CLI       : 8.1.2 (cordova-lib@8.1.1) - Note: 9.0.0 has module loading issue
 - Cordova Platforms : android 8.1.0
 - no cordova-ios yet
 - Cordova Plugins   : cordova-plugin-ionic-keyboard 2.2.0, cordova-plugin-ionic-webview 2.2.0, (and 6 other plugins)
 - cordova-res : 0.8.1 - Note: 0.9.0 install fails
 - native-run  : 0.3.0

System:
 - Android SDK Tools : 26.1.1 (C:\Users\dbadmin\AppData\Local\Android\Sdk)
 - NodeJS            : v8.11.2 (C:\Program Files\nodejs\node.exe)
 - npm               : 5.10.0
 - OS                : Windows 10

### How to Build & Run (for web)

Due to grpc limitations, Node 8.11.2 must be used (with npm 5.x)

```
nvm use 8.11.2
npm install
npm run ionic:serve
```

### How to build for Android (debug)

May need to rm/add android first
```
npm run buildenv
```

```
npx ionic cordova build android
```

This will leave the target APK at platforms\android\app\build\outputs\apk\debug

### How to run on Android emulator (debug)

View list of emulators available
```
npx ionic cordova run android --list --emulator
```

Check requirements for Android
```
npx ionic cordova requirements
```

```
npx ionic cordova emulate android
```
or
```
npx ionic cordova run android --emulator
```

Currently emulator runs OK, but needs location to be set manually
- set point to Norwalk, CT
- set location mode to high accuracy
- set location scan to wifi: on
- be sure to enable location for app

### How to run on Android via USB (debug)

View list of Devices available (enable MTP)
```
npx ionic cordova run android --list --target
```

```
npx ionic cordova run android --target
or
npx ionic cordova run android --device=DEVICE
```


### How to build for Android (production/release)

```
npx ionic cordova build android --prod --release
```

This will leave the target APK at platforms\android\app\build\outputs\apk\release

This will then need to be jarsign-ed and zipalign-ed before being uploaded to the Google Play Store.

### How to build for iOS
TBD

### Other actions

```
Lifecycle scripts included in SandySearch:
  start
    ng serve
  test
    ng build && ng test

available via `npm run-script`:
  clean2
    ionic-app-scripts clean
  build
    firebase use sandy-search && ng build --env=dev
  lint2
    ionic-app-scripts lint
  ionic:build
    ionic-app-scripts build
  ionic:serve
    ionic-app-scripts serve
  build-demo
    firebase use sandy-demo && ng build --env=dev
  build-prod
    firebase use ssearch-prod && ng build --env=prod
  clean
    rimraf dist/* && npm run clean2
  lintold
    ng lint
  lint
    npm run lintjs && npm run lintmd
  lintfix
    standard --fix --verbose "src/**/*.ts" | snazzy
  lintjs
    standard --verbose "src/**/*.ts" | snazzy
  lintmd
    standard --plugin markdown --verbose '**/*.md' | snazzy
  e2e
    ng e2e
  _format
    https://github.com/beautify-web/js-beautify/issues/1162
  formatcss
    glob-run css-beautify -r src/app/**/*.css
  formatcss2
    glob-run css-beautify -r src/*.css
  formathtml
    glob-run html-beautify -r src/**/*.html
  format
    npm run formathtml && npm run formatcss & npm run formatcss2
  retire
    retire --package
  security
    npm run retire && npm run snyk
  snyk
    snyk test
  commitlint-travis
    commitlint-travis
  semantic-release
    semantic-release
  travis-deploy-once
    travis-deploy-once
  fbserve
    npm run lint && npm run build && firebase serve
  fbserve-demo
    npm run lint && npm run build-demo && firebase serve
  fbserve-prod
    npm run lint && npm run build-prod && firebase serve
  fbdeploy
    npm run build && firebase use sandy-search && firebase deploy
  fbdeploy-demo
    npm run build && firebase use sandy-demo && firebase deploy
  fbdeploy-prod
    npm run build-prod && firebase use ssearch-prod && firebase deploy --only hosting
  fbusedev
    firebase use sandy-search
  fbusedemo
    firebase use sandy-demo
  fbuseprod
    firebase use ssearch-prod
```

## Links

https://github.com/firebase/geofire-js/issues/173

https://github.com/angular/angular-cli/issues/7329

https://stackoverflow.com/questions/50348643/typeerror-object-is-not-a-function

https://stackoverflow.com/questions/50374194/error-typeerror-object-is-not-a-function-using-angularfirestore-and-fire

https://github.com/angular/angular-cli/issues/10019
