importScripts('./ngsw-worker.js');

(function () {
    'use strict';

    const showNotification = function(title, notification) {
      return self.registration.showNotification(title, {
        ...notification,
        badge: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/34/AlthepalHappyface.svg/256px-AlthepalHappyface.svg.png',
        data: {
          link: notification.click_action
        }
      });
    };

    self.addEventListener('notificationclick', (event) => {
        console.log("This is custom service worker notificationclick method.");
        console.log('Notification details: ', event.notification);
        // Write the code to open
        if (clients.openWindow && event.notification.data.url) {
            event.waitUntil(clients.openWindow(event.notification.data.url));
        }
    });
    self.addEventListener('push', function(event) {
      const payload = event.data.json();
      console.log('push');
      console.log(payload.notification.title, payload.notification)
      event.waitUntil(
        showNotification(payload.notification.title, payload.notification)
      );
    });
    self.addEventListener('notificationclick', function(event) {
      event.notification.close();
      if(event.notification && event.notification.data && event.notification.data.link) {
        const notificationPage = event.notification.data.link;
        console.log('notificationclick');
        event.waitUntil(
          clients.openWindow(notificationPage)
        );
      }
    });
  }
());
