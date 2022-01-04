export function getQueryParameter(name: string, defaultValue = ''): string {
  const urlParams = new URLSearchParams(window.location.search);
  const value = urlParams.get(name);
  return value || defaultValue;
}
