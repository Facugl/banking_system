export const getInitials = (name: string): string => {
  if (!name.trim()) return '';
  const names = name.split(' ');
  return names
    .map((n) => n[0])
    .join('')
    .toUpperCase();
};
