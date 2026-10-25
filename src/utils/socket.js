import io from 'socket.io-client';

// Export individual socket connections
export const socketServer = io(`${process.env.REACT_APP_API_URL}`);

// Export all socket connections 
export const sockets = [socketServer];

// Authenticate websocket connections
export const authenticateSockets = (token) => {
    console.log('[WS] Authenticating...');

    // Emit auth event for all sockets
    sockets.forEach((socket) => socket.emit('auth', token));
};
