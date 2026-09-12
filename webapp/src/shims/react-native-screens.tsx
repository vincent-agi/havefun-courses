import React from 'react';
import { View } from 'react-native';

/**
 * Stub web de `react-native-screens`.
 *
 * Le paquet est natif only (specs Fabric en Flow). Sur le web,
 * `@react-navigation/native-stack` utilise son implémentation JS
 * (`NativeStackView.tsx`) et n'a pas besoin des vraies primitives : on expose
 * des passe-plats et des drapeaux « désactivé ».
 */
type AnyProps = Record<string, unknown> & { children?: React.ReactNode };

const Passthrough = ({ children, ...props }: AnyProps) => (
  <View {...(props as any)}>{children}</View>
);
const Empty = () => null;

export const enableScreens = () => {};
export const enableFreeze = () => {};
export const screensEnabled = () => false;
export const shouldUseActivityState = false;
export const isSearchBarAvailableForCurrentPlatform = false;
export const isNewBackTitleImplementation = false;
export const compatibilityFlags = {};

export const Screen = Passthrough;
export const NativeScreen = Passthrough;
export const InnerScreen = Passthrough;
export const ScreenContainer = Passthrough;
export const ScreenContext = React.createContext(Screen);
export const ScreenStack = Passthrough;
export const ScreenStackItem = Passthrough;
export const ScreenStackHeaderConfig = Empty;
export const ScreenStackHeaderSubview = Passthrough;
export const ScreenStackHeaderCenterView = Passthrough;
export const ScreenStackHeaderLeftView = Passthrough;
export const ScreenStackHeaderRightView = Passthrough;
export const ScreenStackHeaderSearchBarView = Passthrough;
export const ScreenStackHeaderBackButtonImage = Empty;
export const SearchBar = Empty;
export const ScreenFooter = Passthrough;
export const FullWindowOverlay = Passthrough;

export default {
  enableScreens,
  enableFreeze,
  screensEnabled,
  Screen,
  ScreenContainer,
  ScreenStack,
};
