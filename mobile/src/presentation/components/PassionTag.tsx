import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, radius, spacing, typography } from '../theme/tokens';

type PassionTagProps = {
  label: string;
  icon: string;
  selected: boolean;
  onPress: () => void;
};

export function PassionTag({
  label,
  icon,
  selected,
  onPress,
}: PassionTagProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={`${label}${selected ? ', sélectionné' : ''}`}
      onPress={onPress}
      style={[styles.base, selected && styles.selected]}
    >
      <Text style={styles.icon}>{icon}</Text>
      <Text style={[styles.label, selected && styles.labelSelected]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    backgroundColor: colors.background.surface,
  },
  selected: {
    borderColor: colors.accent.primary,
    backgroundColor: colors.background.elevated,
  },
  icon: {
    fontSize: typography.fontSize.lg,
  },
  label: {
    color: colors.text.secondary,
    fontSize: typography.fontSize.md,
  },
  labelSelected: {
    color: colors.text.primary,
    fontWeight: '600',
  },
});
