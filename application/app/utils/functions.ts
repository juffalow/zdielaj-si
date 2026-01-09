export function getQueryParameter(name: string, defaultValue = ''): string {
  if (typeof window === 'undefined') {
    return defaultValue;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const value = urlParams.get(name);
  return value || defaultValue;
}

export function formatDate(date: Date | string, format = 'YYYY-MM-dd HH:mm:ss'): string {
  if (typeof date !== 'object') {
    date = new Date(Date.parse(date));
  }

  const year: string = date.getFullYear().toString();
  const month: string = (date.getMonth() + 1).toString();
  const day: string = date.getDate().toString();
  const hours: string = date.getHours().toString();
  const minutes: string = date.getMinutes().toString();
  const seconds: string = date.getSeconds().toString();

  format = format.replace('YYYY', year);
  format = format.replace('MM', ('0' + month).slice(-2));
  format = format.replace('dd', ('0' + day).slice(-2));
  format = format.replace('HH', ('0' + hours).slice(-2));
  format = format.replace('mm', ('0' + minutes).slice(-2));
  format = format.replace('ss', ('0' + seconds).slice(-2));

  return format;
}

export function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return '0 Bytes';

  const k = 1000;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
