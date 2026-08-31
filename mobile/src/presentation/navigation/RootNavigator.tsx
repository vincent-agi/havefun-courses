import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { useSession } from '../providers/SessionProvider';
import { isOnboardingComplete } from '../../domain/entities/user';
import { AuthNavigator } from './AuthNavigator';
import { OnboardingScreen } from '../screens/onboarding/OnboardingScreen';
import { MainNavigator } from './MainNavigator';
import { colors } from '../theme/tokens';

const navigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.background.primary,
    card: colors.background.surface,
    text: colors.text.primary,
    border: colors.border.subtle,
    primary: colors.accent.primary,
  },
};

export function RootNavigator() {
  const { status, user } = useSession();

  if (status === 'loading') {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={colors.accent.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer theme={navigationTheme}>
      {status === 'signed-out' || !user ? (
        <AuthNavigator />
      ) : !isOnboardingComplete(user) ? (
        <OnboardingScreen />
      ) : (
        <MainNavigator />
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background.primary,
  },
});
