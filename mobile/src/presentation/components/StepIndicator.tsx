import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, spacing } from '../theme/tokens';

type StepIndicatorProps = {
  totalSteps: number;
  currentStep: number;
};

export function StepIndicator({ totalSteps, currentStep }: StepIndicatorProps) {
  return (
    <View
      style={styles.container}
      accessibilityLabel={`Étape ${currentStep + 1} sur ${totalSteps}`}
    >
      {Array.from({ length: totalSteps }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            index <= currentStep ? styles.dotActive : styles.dotInactive,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  dotActive: {
    backgroundColor: colors.accent.primary,
  },
  dotInactive: {
    backgroundColor: colors.border.subtle,
  },
});
