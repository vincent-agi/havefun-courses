import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { colors, spacing, typography } from '../../../theme/tokens';

/** Contrat commun à tous les validateurs d'expérience (un par notion). */
export interface ExperimentValidatorProps {
  phase: 'guided' | 'autonomous';
  /** À appeler quand le raisonnement de l'élève est validé. */
  onValidated: () => void;
}

export function NumberField({
  label,
  value,
  onChangeText,
  placeholder,
}: {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.text.secondary}
      />
    </View>
  );
}

export function ChoiceRow<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly { value: T; label: string }[];
  value: T | null;
  onChange: (value: T) => void;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.choiceRow}>
        {options.map(option => {
          const selected = option.value === value;
          return (
            <Pressable
              key={option.value}
              accessibilityRole="button"
              onPress={() => onChange(option.value)}
              style={[styles.chip, selected && styles.chipSelected]}
            >
              <Text
                style={[
                  styles.chipText,
                  selected && styles.chipTextSelected,
                ]}
              >
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export function Feedback({
  tone,
  children,
}: {
  tone: 'ok' | 'warn' | 'info';
  children: React.ReactNode;
}) {
  const color =
    tone === 'ok'
      ? colors.accent.secondary
      : tone === 'warn'
        ? colors.accent.warning
        : colors.text.secondary;
  return <Text style={[styles.feedback, { color }]}>{children}</Text>;
}

const styles = StyleSheet.create({
  field: { gap: spacing.xs },
  label: {
    color: colors.text.primary,
    fontSize: typography.fontSize.sm,
  },
  input: {
    minHeight: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    backgroundColor: colors.background.surface,
    color: colors.text.primary,
    paddingHorizontal: spacing.md,
  },
  choiceRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  chip: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    backgroundColor: colors.background.surface,
  },
  chipSelected: {
    borderColor: colors.accent.primary,
    backgroundColor: colors.accent.primary,
  },
  chipText: {
    color: colors.text.secondary,
    fontSize: typography.fontSize.sm,
  },
  chipTextSelected: {
    color: colors.text.primary,
    fontWeight: '700',
  },
  feedback: {
    fontSize: typography.fontSize.sm,
    lineHeight: 20,
  },
});
