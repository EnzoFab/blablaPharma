import Push from "push.js";

export const request_permission = () => {
  if (!Push.Permission.has()) {
    Push.Permission.request();
  }
};

export const trigger_notification = async (
  title,
  body,
  link = "",
  onClick = null
) => {
  if (Push.Permission.has()) {
    await Push.create(title, {
      body,
      timeout: 6000,
      icon: "/favicons/favicon-32x32.png",
      onClick,
      link,
      requireInteraction: true,
      vibrate: [200, 100]
    });
  }
};
