import { useEffect } from 'react';

export const useNotifications = () => {
  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('Notification permission granted');
        }
      });
    }
  }, []);

  const sendNotification = (title: string, options?: NotificationOptions) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, options);
    }
  };

  return { sendNotification };
};

export const scheduleSurveyNotification = (surveyTitle: string, dueDate: Date) => {
  const now = new Date();
  const timeUntilDue = dueDate.getTime() - now.getTime();

  if (timeUntilDue > 0) {
    setTimeout(() => {
      sendNotification(`Survey Reminder: ${surveyTitle}`, {
        body: 'Please complete the survey before it expires.',
        icon: '/path/to/survey-icon.png',
      });
    }, timeUntilDue);
  }
};

const sendNotification = (title: string, options?: NotificationOptions) => {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, options);
  }
};