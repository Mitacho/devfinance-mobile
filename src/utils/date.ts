export function formatDate(date: string): string {
  return date.replace(/\,/g, "/").replace(/\./g, "/").replace(/\-/g, "/");
};