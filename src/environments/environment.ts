// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  defaultauth: 'fackbackend',
  domain:'http://192.168.0.120:5019/api/',
  url:'http://192.168.0.120:5019/',
  // // domain:'https://ERP.afaqci.com/api/',
  // // url:'https://ERP.afaqci.com/',
  // domain:'http://192.168.0.102:44385/api/',
  // url:'http://192.168.0.102:44385/',
  // domain:'https://erp.afaqci.com/api/',
  // url:'https://erp.afaqci.com/',
  firebaseConfig: {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    measurementId: ''
  }
};



/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
