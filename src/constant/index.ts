import { GlobalThemeOverrides } from "naive-ui";

export const SPARE_BASE_REQUEST_URL = "http://127.0.0.1:8080";
export const BASE_REQUEST_URL = "http://192.168.254.118:8080";
export const DEFAULT_ARTICLE_COVER =
  "http://127.0.0.1:8080/img/defaultCover.jpg";
export const NO_COVER = "noCover";

export const ARTICLE_TYPE_OPTIONS = [
  {
    label: "原创",
    value: "original",
  },
  {
    label: "转载",
    value: "reprint",
  },
  {
    label: "翻译",
    value: "translation",
  },
];

export const ARTICLE_CATEGORY = [
  {
    label: "前端",
    value: "1",
  },
];

export const lightThemeOverrides: GlobalThemeOverrides = {
  common: {
    fontWeightStrong: "600",
  },
  Layout: {
    color: "#f2f3f5",
  },
  Divider: {
    color: "#e2e4e8",
  },
  FloatButton: {
    textColorPrimary: "#515457",
    colorPrimary: "#fff",
    colorPrimaryHover: "rgba(46, 51, 56, .09)",
    colorPrimaryPressed: "#00000000",
  },
};

export const darkThemeOverrides: GlobalThemeOverrides = {
  common: {
    fontWeightStrong: "600",
  },
  FloatButton: {
    textColorPrimary: "#fff",
    colorPrimary: "#515457",
    colorPrimaryHover: "rgba(46, 51, 56, .09)",
    colorPrimaryPressed: "#00000000",
  },
  Layout: {
    // color:"#f2f3f5"
  },
};
