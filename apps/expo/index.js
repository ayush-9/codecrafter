import { Platform } from 'react-native'
import 'text-encoding-polyfill'
import ('./shim.js') 
navigator.userAgent = Platform.OS
import * as WebAssembly from 'react-native-webassembly'
global.WebAssembly = WebAssembly
import 'expo-router/entry'

