export const base64encode = (str: string): string => {
  return Buffer.from(str).toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export const base64decode = (str: string): string => {
  const base64 = str + Array(5 - str.length % 4).join('=');

  return Buffer.from(base64.replace(/\-/g, '+').replace(/\_/g, '/'), 'base64').toString();
}
