// utils/timezone.js
import moment from 'moment-timezone';

export function getJakartaTime() {
  return moment().tz('Asia/Jakarta').toDate();
}

export function formatJakartaTime(date) {
  return moment(date).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');
}

export function convertToJakarta(utcDate) {
  return moment(utcDate).tz('Asia/Jakarta');
}
