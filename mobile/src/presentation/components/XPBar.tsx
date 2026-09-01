import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../theme/tokens';

type XPBarProps = {
  current: number;
  max: number;
  label?: string;
};

export function XPBar({ current, max, label }: XPBarProps) {
  const ratio = max > 0 ? Math.min(current / max, 1) : 0;

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={styles.track}
        accessibilityLabel={`${current} sur ${max} XP`}
      >
        <View style={[styles.fill, { width: `${ratio * 100}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    gap: spacing.xs,
  },
  label: {
    color: colors.text.secondary,
    fontSize: typography.fontSize.sm,
  },
  track: {
    height: 10,
    borderRadius: radius.sm,
    backgroundColor: colors.background.surface,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: radius.sm,
    backgroundColor: colors.accent.secondary,
  },
});
