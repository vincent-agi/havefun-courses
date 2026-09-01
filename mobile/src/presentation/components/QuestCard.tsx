import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Challenge } from '../../domain/entities/challenge';
import { SCHOOL_LEVEL_LABELS } from '../../domain/entities/school-level';
import { colors, radius, spacing, typography } from '../theme/tokens';

type QuestCardProps = {
  challenge: Challenge;
  completed?: boolean;
  onPress: () => void;
};

export function QuestCard({
  challenge,
  completed = false,
  onPress,
}: QuestCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${challenge.title}${completed ? ', complété' : ''}`}
      onPress={onPress}
      style={({ pressed }) => [styles.base, pressed && styles.pressed]}
    >
      <View style={styles.header}>
        <Text style={styles.icon}>{challenge.passion.icon}</Text>
        <Text style={styles.title} numberOfLines={2}>
          {challenge.title}
        </Text>
        {completed && (
          <View style={styles.completedBadge}>
            <Text style={styles.completedText}>✓ Fait</Text>
          </View>
        )}
      </View>
      <Text style={styles.meta}>
        {SCHOOL_LEVEL_LABELS[challenge.schoolLevel]} ·{' '}
        {challenge.durationMinutes} min · {challenge.skill.label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.md,
    backgroundColor: colors.background.surface,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    padding: spacing.md,
    gap: spacing.xs,
  },
  pressed: {
    opacity: 0.85,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  icon: {
    fontSize: typography.fontSize.lg,
  },
  title: {
    flex: 1,
    color: colors.text.primary,
    fontSize: typography.fontSize.md,
    fontWeight: '600',
  },
  completedBadge: {
    borderRadius: radius.sm,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    backgroundColor: colors.accent.secondary,
  },
  completedText: {
    color: colors.background.primary,
    fontSize: typography.fontSize.sm,
    fontWeight: '700',
  },
  meta: {
    color: colors.text.secondary,
    fontSize: typography.fontSize.sm,
  },
});
