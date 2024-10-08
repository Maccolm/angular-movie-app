declare const require: {
	context(path: string, deep?: boolean, filter?: RegExp): {
	  keys: () => string[];
	  <T>(id: string): T;
	};
 };
 
 import 'zone.js/testing';
 import { getTestBed } from '@angular/core/testing';
 import {
	BrowserDynamicTestingModule,
	platformBrowserDynamicTesting
 } from '@angular/platform-browser-dynamic/testing';
 
 // First, initialize the Angular testing environment.
 getTestBed().initTestEnvironment(
	BrowserDynamicTestingModule,
	platformBrowserDynamicTesting()
 );
 
 // Then we find all the tests.
 const context = require.context('./', true, /\.spec\.ts$/);
 // And load the modules.
 context.keys().map(context);
 
 