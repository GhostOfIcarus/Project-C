// const sendNotification = async (registrationToken, notificationPayload) => {
//     const serverKey = 'AAAA_RQQP2U:APA91bELrUANGsk83bNroWxg__aw418NHa7yX74_RZyxlE3VdECP-yvhmMXL5kOTmT-bNXcv97DbQTTmWWgDELQUqNKZpkgRpbXbG1yQCtcSmnGsWkHCVsi8PDgBz9trLCix_3NI_gao';
//     const endpoint = 'https://fcm.googleapis.com/v1/projects/buurtboer-3d981/messages:send';
  
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
  
//   const getRegistrationToken = async () => {
//     try {
//       const messaging = getMessaging(app);
//       const token = await getToken(messaging);
//       console.log('Registration Token:', token);
  
//       // Call sendNotification with the obtained token
//       const notificationPayload = {
//         title: 'Hello',
//         body: 'This is a notification from your web app!',
//       };
//       sendNotification(token, notificationPayload);
  
//       return token;
//     } catch (error) {
//       console.error('Error getting registration token:', error);
//     }
//   };
  
//   // Call getRegistrationToken to get the registration token
//   getRegistrationToken();
  