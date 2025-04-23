import { SWRConfiguration } from "swr";
export { default as useBasicSWR } from "./use-basic-swr";

interface defaultHookConfigsI {
  runHook?: boolean;
  hookOptions?: SWRConfiguration;
}
export const defaultHookConfigs: defaultHookConfigsI = {
  runHook: true,
  hookOptions: {},
};
