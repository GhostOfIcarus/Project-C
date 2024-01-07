// const sendNotification = async (registrationToken, notificationPayload) => {
//     const serverKey = 'YOUR_FCM_SERVER_KEY';
//     const endpoint = 'https://fcm.googleapis.com/v1/projects/YOUR_PROJECT_ID/messages:send';
  
//     const response = await fetch(endpoint, {
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${serverKey}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         message: {
//           token: registrationToken,
//           notification: notificationPayload,
//         },
//       }),
//     });
  
//     const result = await response.json();
//     console.log('Notification sent:', result);
//   };
  
//   // Example usage
//   const registrationToken = 'YOUR_DEVICE_REGISTRATION_TOKEN';
//   const notificationPayload = {
//     title: 'Hello',
//     body: 'This is a notification from your web app!',
//   };
  
//   sendNotification(registrationToken, notificationPayload);