import { ToastDefaults } from "ng-snotify";

export const NotificationConfiguration = ToastDefaults;

NotificationConfiguration.toast.timeout = 3000;
NotificationConfiguration.toast.pauseOnHover = true;
NotificationConfiguration.toast.showProgressBar = false;
