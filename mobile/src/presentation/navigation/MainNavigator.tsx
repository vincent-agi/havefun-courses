import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CatalogueScreen } from '../screens/catalogue/CatalogueScreen';
import { colors } from '../theme/tokens';

export type MainStackParamList = {
  Catalogue: undefined;
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
    </Stack.Navigator>
  );
}
