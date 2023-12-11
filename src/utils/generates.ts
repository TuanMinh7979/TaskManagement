export const generateId = () => {
  // Use current timestamp to ensure uniqueness
  const timestamp = new Date().getTime();

  // Use Math.random() to add some randomness
  const random = Math.random().toString(36).substring(2, 10);

  // Combine timestamp and random number
  const id = `${timestamp}${random}`;

  return id;
};
