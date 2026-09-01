import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CatalogueScreen } from '../screens/catalogue/CatalogueScreen';
import { MissionScreen } from '../screens/mission/MissionScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { colors } from '../theme/tokens';

export type MainStackParamList = {
  Catalogue: undefined;
  Mission: { challengeId: string };
  Profile: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

export function MainNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background.primary },
      }}
    >
      <Stack.Screen name="Catalogue" component={CatalogueScreen} />
      <Stack.Screen name="Mission" component={MissionScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}
