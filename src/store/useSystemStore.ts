import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { useI18n } from "vue-i18n";

interface SystemSetting {
  language: string;
  theme: "dark" | "light";
}

interface State {
  systemSetting: SystemSetting;
  currentItem: number;
}

export default defineStore(
  "system",
  () => {
    const state: Ref<State> = ref({
      systemSetting: {
        language: "zh",
        theme: "dark",
      },
      currentItem: 0,
    });

    function updateState(key: keyof State, value: any) {
      state.value[key] =
        typeof state.value[key] === "object"
          ? Object.assign(state.value[key], value)
          : value;
    }

    function updateTheme() {
      document.documentElement.setAttribute(
        "data-theme",
        state.value.systemSetting.theme,
      );
    }

    function init() {
      updateTheme();
      const { locale } = useI18n({ useScope: "global" });
      locale.value = state.value.systemSetting.language;
    }

    return {
      state,
      init,
      updateState,
      updateTheme,
    };
  },
  {
    persist: true, // 开启数据持久化
  },
);
