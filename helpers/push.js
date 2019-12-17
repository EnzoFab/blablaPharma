import Push from "push.js";

export const request_permission = () => {
  if (!Push.Permission.has()) {
    Push.Permission.request();
  }
};

export const trigger_notification = async (
  title,
  body,
  url = "",
  onClick = null
) => {
  if (Push.Permission.has()) {
    const link = `https://blablapharma.fr/${url}`;
    await Push.create(title, {
      body,
      icon: "/favicons/favicon-32x32.png",
      onClick,
      link,
      requireInteraction: true,
      vibrate: [200, 100]
    });
  }
};
