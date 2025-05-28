import { io } from 'socket.io-client';

const socket = io('http://localhost:4000');

export const socketService = {
  // Connect to socket
  connect: () => {
    socket.connect();
  },

  // Disconnect from socket
  disconnect: () => {
    socket.disconnect();
  },

  // Listen for product changes
  onProductChange: (callback) => {
    socket.on('product_change', callback);
  },

  // Listen for new products
  onNewProduct: (callback) => {
    socket.on('new_product', callback);
  },

  // Listen for product removal
  onProductRemoved: (callback) => {
    socket.on('product_removed', callback);
  },

  // Listen for new messages
  onNewMessage: (callback) => {
    socket.on('receive_message', callback);
  },

  // Listen for message removal
  onMessageRemoved: (callback) => {
    socket.on('message_removed', callback);
  },

  // Listen for new orders
  onNewOrder: (callback) => {
    socket.on('new_order', callback);
  },

  // Listen for order removal
  onOrderRemoved: (callback) => {
    socket.on('order_removed', callback);
  },

  // Listen for user removal
  onUserRemoved: (callback) => {
    socket.on('user_removed', callback);
  },

  // Remove all listeners
  removeAllListeners: () => {
    socket.removeAllListeners();
  }
};

export default socket;