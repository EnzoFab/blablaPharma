import { request_permission, trigger_notification } from "./push";
import wrapper from "./socketWrapper";
import io from "./io";
import helperMethods from "./helperMethods";

export const SailSocketWrapper = wrapper(io);
export const toFormData = helperMethods.toFormData;
export const toBase64 = helperMethods.toBase64;
export const FILE_MAXIMUM_SIZE = 2100000;
export const FILE_SIZE_MESSAGE = 1100000;

export const requestPermission = request_permission;
export const triggerNotification = trigger_notification;
