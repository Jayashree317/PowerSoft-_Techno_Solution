
export const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

export const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toISOString().split('T')[0];
};

// Shorten text
export const truncateText = (text, limit = 100) => {
  return text.length > limit ? text.slice(0, limit) + '...' : text;
};
