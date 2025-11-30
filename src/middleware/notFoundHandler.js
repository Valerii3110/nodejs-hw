// src/middleware/notFoundHandler.js
//* Обробник для невідомих маршрутів
export const notFoundHandler = (req, res) => {
  res.status(404).json({ message: 'Route not found' });
};
