import { Injectable } from '@angular/core';

const TOKEN_KEY = 'jwt-token';
const USER_KEY = 'user-data';
const TEMP_KEY = 'temp-data';

@Injectable({
  providedIn: 'root'
})

export class StorageService {

  constructor() { }

  saveToken(token) {
    localStorage.setItem(TOKEN_KEY, token)
    console.log('Token Saved')
  }

  getToken() {
    return localStorage.getItem(TOKEN_KEY)
  }

  saveUser(user) {
    const jsonString = JSON.stringify(user)
    localStorage.setItem(USER_KEY, jsonString)
    console.log('User Saved')
  }

  getUser() {
    const userData = localStorage.getItem(USER_KEY)
    return JSON.parse(userData)
  }

  isTokenStored() {
    if (localStorage.getItem(TOKEN_KEY) == null) {
      return false
    }
    return true
  }

  isUserStored() {
    if (localStorage.getItem(USER_KEY) == null) {
      return false
    }
    return true
  }

  clearStorage() {
    localStorage.clear()
    console.log('Storage Cleared')
  }

  saveTemp(temp) {
    const jsonString = JSON.stringify(temp)
    localStorage.setItem(TEMP_KEY, jsonString)
    console.log('Temp Data Saved')
  }

  getTemp() {
    const tempData = localStorage.getItem(TEMP_KEY)
    return JSON.parse(tempData)
  }

  isTempStored() {
    if (localStorage.getItem(TEMP_KEY) == null) {
      return false
    }
    return true
  }

  clearTemp() {
    localStorage.removeItem(TEMP_KEY)
    console.log('Temp Data Cleared')
  }
}
