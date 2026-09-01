import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../theme/tokens';

type BadgeIconProps = {
  label: string;
  earned: boolean;
};

export function BadgeIcon({ label, earned }: BadgeIconProps) {
  return (
    <View
      style={styles.container}
      accessibilityLabel={`${label}${earned ? '' : ', verrouillé'}`}
    >
      <View
        style={[
          styles.circle,
          earned ? styles.circleEarned : styles.circleLocked,
        ]}
      >
        <Text style={styles.emoji}>{earned ? '🏅' : '🔒'}</Text>
      </View>
      <Text
        style={[styles.label, !earned && styles.labelLocked]}
        numberOfLines={2}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 88,
    alignItems: 'center',
    gap: spacing.xs,
  },
  circle: {
    width: 56,
    height: 56,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  circleEarned: {
    backgroundColor: colors.background.elevated,
    borderColor: colors.accent.secondary,
  },
  circleLocked: {
    backgroundColor: colors.background.surface,
    borderColor: colors.border.subtle,
  },
  emoji: {
    fontSize: 24,
  },
  label: {
    color: colors.text.primary,
    fontSize: typography.fontSize.sm,
    textAlign: 'center',
  },
  labelLocked: {
    color: colors.text.secondary,
  },
});
