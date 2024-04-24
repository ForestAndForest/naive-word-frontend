import { computed } from "vue";
import {
  ConfigProviderProps,
  lightTheme,
  darkTheme,
  createDiscreteApi,
} from "naive-ui";

const setJson = window.localStorage.getItem("system");
let theme = "light";
if (setJson && setJson !== "") {
  theme = JSON.parse(setJson).state.systemSetting.theme;
}
const configProviderPropsRef = computed<ConfigProviderProps>(() => ({
  theme: theme === "light" ? lightTheme : darkTheme,
}));

export const { message, notification, dialog, loadingBar, modal } =
  createDiscreteApi(
    ["message", "dialog", "notification", "loadingBar", "modal"],
    {
      configProviderProps: configProviderPropsRef,
    },
  );

export function timestampToDateTime(timestamp: number) {
  return formatTimestamp(timestamp, "yyyy-MM-dd hh:mm");
}

export function betterFormatTimestamp(timestamp: number) {
  const now = new Date().getTime();
  timestamp = timestamp ?? now;
  if (now - timestamp < 60 * 1000) {
    return "刚刚";
  } else if (now - timestamp < 60 * 60 * 1000) {
    return formatTimestamp(timestamp, "hh:mm");
  } else if (now - timestamp < 24 * 60 * 60 * 1000) {
    return formatTimestamp(timestamp, "dd-hh");
  } else if (now - timestamp < 30 * 24 * 60 * 60 * 1000) {
    return formatTimestamp(timestamp, "MM-dd");
  } else if (now - timestamp < 12 * 30 * 24 * 60 * 60 * 1000) {
    return formatTimestamp(timestamp, "yyyy-MM-dd");
  }
}

export function formatTimestamp(timestamp: number, format: string) {
  const date = new Date(timestamp);

  // 获取年月日时分秒
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 月份从0开始，需要加1
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  // 返回格式化后的日期时间字符串
  return format
    .replace(/yyyy/, String(year))
    .replace(/MM/, String(month))
    .replace(/dd/, String(day))
    .replace(/hh/, String(hours))
    .replace(/mm/, String(minutes))
    .replace(/ss/, String(seconds));
}
