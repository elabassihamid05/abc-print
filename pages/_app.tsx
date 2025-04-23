import { useEffect } from "react";
import { ToastContainer, cssTransition } from "react-toastify";
import {
  createEmotionCache,
  MantineProvider,
  MantineThemeColors,
  DEFAULT_THEME,
} from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import { LayoutTree } from "@moxy/next-layout";
import { SessionProvider } from "next-auth/react";

// i18n
import "../i18n";

import "@/styles/globals.css";
import "@/styles/nprogress.css";
import "@/styles/currency-flag.css";
import "@/styles/quill-text-editor.css";

import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
// Grid layout
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import { useRouter } from "next/router";

const PRIMARY_COLOR = "blue";

const COLORS: MantineThemeColors = {
  ...DEFAULT_THEME.colors,
  blue: [
    "#eff6ff",
    "#dbeafe",
    "#bfdbfe",
    "#93c5fd",
    "#60a5fa",
    "#3b82f6",
    "#2563eb",
    "#1d4ed8",
    "#1e40af",
    "#1e3a8a",
  ],
  indigo: [
    "#eef2ff",
    "#e0e7ff",
    "#c7d2fe",
    "#a5b4fc",
    "#818cf8",
    "#6366f1",
    "#4f46e5",
    "#4338ca",
    "#3730a3",
    "#312e81",
  ],
  orange: [
    "#FFFAEB",
    "#FEFOC7",
    "#FEDF89",
    "#FEC84B",
    "#FDB022",
    "#F79009",
    "#DC6803",
    "#B54708",
    "#93370D",
    "#7A2E0E",
  ],
  green: [
    "#f0fdf4",
    "#dcfce7",
    "#bbf7d0",
    "#86efac",
    "#4ade80",
    "#22c55e",
    "#16a34a",
    "#15803d",
    "#166534",
    "#14532d",
  ],
  purple: [
    "#faf5ff",
    "#f3e8ff",
    "#e9d5ff",
    "#d8b4fe",
    "#c084fc",
    "#a855f7",
    "#9333ea",
    "#7e22ce",
    "#6b21a8",
    "#581c87",
  ],
  emerald: [
    "#ecfdf5",
    "#d1fae5",
    "#a7f3d0",
    "#6ee7b7",
    "#34d399",
    "#10b981",
    "#059669",
    "#047857",
    "#065f46",
    "#064e3b",
  ],
  dark: [
    "#fafafa",
    "#f5f5f5",
    "#e5e5e5",
    "#d4d4d4",
    "#a3a3a3",
    "#737373",
    "#525252",
    "#404040",
    "#262626",
    "#171717",
  ],
  cyan: [
    "#ecfeff",
    "#cffafe",
    "#a5f3fc",
    "#67e8f9",
    "#22d3ee",
    "#06b6d4",
    "#0891b2",
    "#0e7490",
    "#155e75",
    "#164e63",
  ],
  amber: [
    "#fffbeb",
    "#fef3c7",
    "#fde68a",
    "#fcd34d",
    "#fbbf24",
    "#f59e0b",
    "#d97706",
    "#b45309",
    "#92400e",
    "#78350f",
  ],
  slate: [
    "#f8fafc",
    "#f1f5f9",
    "#e2e8f0",
    "#cbd5e1",
    "#94a3b8",
    "#64748b",
    "#475569",
    "#334155",
    "#1e293b",
    "#0f172a",
  ],
  gray: [
    "#f9fafb",
    "#f3f4f6",
    "#e5e7eb",
    "#d1d5db",
    "#9ca3af",
    "#6b7280",
    "#4b5563",
    "#374151",
    "#1f2937",
    "#111827",
  ],
};

const setDocumentPrimaryColor = (color = "blue") => {
  const _colorsLists =
    Array.isArray(COLORS?.[color]) && Object.keys(COLORS)?.includes(color)
      ? COLORS?.[color]
      : COLORS?.[PRIMARY_COLOR];
  _colorsLists?.forEach((color, i) => {
    document.documentElement.style.setProperty(
      `--color-primary-${i === 0 ? "50" : i * 100}`,
      color
    );
  });
};

// declare global {
//   interface Window {
//     ___store: any;
//   }
// }

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  useEffect(() => {
    setDocumentPrimaryColor(PRIMARY_COLOR);
  }, []);

  // const store = useStore(pageProps.initialReduxState);

  // try {
  //   window.___store = store;
  // } catch (error) {}

  return (
    <SessionProvider session={session}>
      {/* <ReduxProvider store={store}> */}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop
        closeOnClick
        draggable
        pauseOnHover
        transition={cssTransition({
          enter: `Toastify--animate Toastify__slide-enter`,
          exit: `Toastify--animate Toastify__slide-exit`,
          appendPosition: true,
        })}
      />
      <Wrapper>
        <LayoutTree Component={Component} pageProps={pageProps} />
      </Wrapper>
      {/* </ReduxProvider> */}
    </SessionProvider>
  );
}

function Wrapper({ children }) {
  const { query } = useRouter();
  const organizationName = query?.organizationName as string;



  

  return (
    <MantineProvider
      // withGlobalStyles
      // withNormalizeCSS
      emotionCache={createEmotionCache({ key: "mantine", prepend: false })}
      theme={{
        /** Put your mantine theme override here */
        colors: COLORS,
        colorScheme: "light",
        primaryColor: "blue",
        components: {
          InputWrapper: {
            classNames: {
              label: "!text-slate-600 !mb-0.5",
            },
          },
          Input: {
            classNames: {
              input:
                "!border-slate-300 max-[639px]:!text-[16px] focus:!border-primary-500 focus:!ring-[0.5px]",
              disabled: "!text-slate-500 !border-slate-400",
            },
          },
          Avatar: {
            classNames: {
              placeholder: "!font-medium",
            },
          },
          Menu: {
            classNames: {
              itemLabel: "!text-[13px]",
            },
          },
          Button: {
            classNames: {
              root: "!font-medium",
            },
          },
        },
      }}
    >
      <NotificationsProvider>
        <ModalsProvider>{children}</ModalsProvider>
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default MyApp;
