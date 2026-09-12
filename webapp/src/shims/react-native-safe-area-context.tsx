import React from 'react';
import { View } from 'react-native';

/**
 * Stub web de `react-native-safe-area-context`.
 *
 * Le paquet natif importe statiquement des specs codegen (Flow) que Vite ne sait
 * pas transformer. Sur un navigateur il n'y a pas d'encoche : des insets à zéro
 * suffisent. react-navigation fournit déjà ses propres fallbacks.
 */
const insets = { top: 0, right: 0, bottom: 0, left: 0 };
const frame = { x: 0, y: 0, width: 0, height: 0 };

export const SafeAreaInsetsContext = React.createContext(insets);
export const SafeAreaFrameContext = React.createContext(frame);
export const initialWindowMetrics = { insets, frame };
export const initialWindowSafeAreaInsets = insets;

export function SafeAreaProvider({ children, style }: any) {
  return <View style={[{ flex: 1 }, style]}>{children}</View>;
}

export function SafeAreaView({ children, style, ...rest }: any) {
  return (
    <View style={style} {...rest}>
      {children}
    </View>
  );
}

export const useSafeAreaInsets = () => insets;
export const useSafeAreaFrame = () => frame;
export const useSafeArea = () => insets;

export function withSafeAreaInsets<P>(Component: React.ComponentType<P>) {
  return (props: P) => <Component {...(props as any)} insets={insets} />;
}

export const SafeAreaConsumer = SafeAreaInsetsContext.Consumer;
export const SafeAreaContext = SafeAreaInsetsContext;
