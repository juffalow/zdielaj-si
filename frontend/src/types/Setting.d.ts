type NotificationType =
  'login' |
  'product' |
  'register';

interface Setting {
  notification: NotificationType,
  isEnabled: boolean,
}