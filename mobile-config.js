// This section sets up some basic app metadata,
// the entire section is optional.
App.info({
  id: 'com.critical.futuristics.tf',
  version: '1.0',
  name: 'DnD Companion',
  description: 'Your DnD Companion App for Traverlers Fate',
  author: 'Critical Futuristics',
  email: 'info@criticalfuturistics.com',
  website: 'http://criticalfuturistics.com'
});
// Set up resources such as icons and launch screens.
App.icons({
  'android_mdpi': 'icons/android_mdpi.png',
  'android_hdpi': 'icons/android_hdpi.png',
  'android_xhdpi': 'icons/android_xhdpi.png',
  'android_xxhdpi': 'icons/android_xxhdpi.png',
  'android_xxxhdpi': 'icons/android_xxxhdpi.png',

  // ... more screen sizes and platforms ...
});
// App.launchScreens({
//   'iphone': 'splash/Default~iphone.png',
//   'iphone_2x': 'splash/Default@2x~iphone.png',
//   // ... more screen sizes and platforms ...
// });
// Set PhoneGap/Cordova preferences
App.setPreference('BackgroundColor', '0xff0000ff');
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('Orientation', 'default');
App.setPreference('Orientation', 'all', 'ios');

// Add custom tags for a particular PhoneGap/Cordova plugin
// to the end of generated config.xml.
// Universal Links is shown as an example here.
App.appendToConfig(`
  <universal-links>
    <host name="localhost:3000" />
  </universal-links>
`);