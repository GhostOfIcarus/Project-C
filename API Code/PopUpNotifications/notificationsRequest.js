// // Request permission to receive push notifications
// const requestPermission = async () => {
//     try {
//       const permission = await Notification.requestPermission();
//       if (permission === 'granted') {
//         console.log('Notification permission granted.');
//       } else {
//         console.error('Notification permission denied.');
//       }
//     } catch (error) {
//       console.error('Error requesting notification permission:', error);
//     }
//   };
  
//   // Handle incoming messages
//   onMessage(messaging, (payload) => {
//     console.log('Message received:', payload);
//     // Handle the incoming notification here
//   });
  
//   // Call requestPermission to request notification permission
//   requestPermission();
  