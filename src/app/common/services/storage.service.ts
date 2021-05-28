import { Injectable } from '@angular/core';
import { Day } from 'src/app/mood/common/models/day.model';

const TOKEN_KEY = 'jwt-token';
const USER_KEY = 'user-data';
const DAY_KEY = 'day-data';
const TEMP_KEY = 'temp-data';
const CACHE_DAY_KEY = 'cache-day-data';
const CACHE_JOURNAL_KEY = 'cache-journal-data';
const CACHE_REVIEW_KEY = 'cache-review-data';

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

  deleteToken() {
    localStorage.removeItem(TOKEN_KEY)
    console.log('Token Removed')
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

  deleteUser() {
    localStorage.removeItem(USER_KEY)
    console.log('User Removed')
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

  saveDay(day: Day) {
    const jsonString = JSON.stringify(day)
    localStorage.setItem(DAY_KEY, jsonString)
    console.log('Day Saved')
  }

  getDay() {
    let day = localStorage.getItem(DAY_KEY)
    return JSON.parse(day)
  }

  deleteDay() {
    localStorage.removeItem(DAY_KEY)
    console.log('Day Removed')
  }

  isDayStored() {
    if (localStorage.getItem(DAY_KEY) == null) {
      return false
    }
    return true
  }

  saveCacheDay(cacheDay) {
    const jsonString = JSON.stringify(cacheDay)
    localStorage.setItem(CACHE_DAY_KEY, jsonString)
    console.log('Cache Day Saved')
  }

  getCacheDay() {
    let cacheDay = localStorage.getItem(CACHE_DAY_KEY)
    return JSON.parse(cacheDay)
  }

  saveCacheJournal(cacheJournal) {
    const jsonString = JSON.stringify(cacheJournal)
    localStorage.setItem(CACHE_JOURNAL_KEY, jsonString)
    console.log('Cache Journal Saved')
  }

  getCacheJournal() {
    let cacheJournal = localStorage.getItem(CACHE_JOURNAL_KEY)
    return JSON.parse(cacheJournal)
  }

  saveCacheReviewData(reviewData) {
    const jsonString = JSON.stringify(reviewData)
    localStorage.setItem(CACHE_REVIEW_KEY, jsonString)
    console.log('Review Data Saved')
  }

  getCacheReviewData() {
    let reviewData = localStorage.getItem(CACHE_REVIEW_KEY)
    return JSON.parse(reviewData)
  }

  deleteCache() {
    localStorage.removeItem(CACHE_DAY_KEY)
    localStorage.removeItem(CACHE_JOURNAL_KEY)
    localStorage.removeItem(CACHE_REVIEW_KEY)
    console.log('Cache Removed')
  }
}
