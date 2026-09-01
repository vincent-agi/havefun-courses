import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSession } from '../../providers/SessionProvider';
import { container } from '../../../application/container';
import { Passion } from '../../../domain/entities/passion';
import {
  SchoolLevel,
  SCHOOL_LEVEL_LABELS,
} from '../../../domain/entities/school-level';
import { Button } from '../../components/Button';
import { PassionTag } from '../../components/PassionTag';
import { colors, spacing, typography } from '../../theme/tokens';

const SCHOOL_LEVELS = Object.values(SchoolLevel);

export function OnboardingScreen() {
  const { updateOnboarding } = useSession();
  const [step, setStep] = useState<1 | 2>(1);
  const [schoolLevel, setSchoolLevel] = useState<SchoolLevel | null>(null);
  const [passions, setPassions] = useState<Passion[]>([]);
  const [selectedPassionIds, setSelectedPassionIds] = useState<string[]>([]);
  const [loadingPassions, setLoadingPassions] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    container.listPassionsUseCase
      .execute()
      .then(setPassions)
      .finally(() => setLoadingPassions(false));
  }, []);

  const togglePassion = (id: string) => {
    setSelectedPassionIds(current =>
      current.includes(id) ? current.filter(p => p !== id) : [...current, id],
    );
  };

  const handleFinish = async () => {
    if (!schoolLevel || selectedPassionIds.length === 0) return;
    setSubmitting(true);
    try {
      await updateOnboarding({ schoolLevel, passionIds: selectedPassionIds });
    } finally {
      setSubmitting(false);
    }
  };

  if (step === 1) {
    return (
      <View style={styles.container}>
        <Text style={styles.step}>Étape 1/2</Text>
        <Text style={styles.title}>Quelle est ta classe ?</Text>

        <ScrollView contentContainerStyle={styles.levelGrid}>
          {SCHOOL_LEVELS.map(level => (
            <PassionTag
              key={level}
              label={SCHOOL_LEVEL_LABELS[level]}
              icon="🎓"
              selected={schoolLevel === level}
              onPress={() => setSchoolLevel(level)}
            />
          ))}
        </ScrollView>

        <Button
          label="Continuer"
          onPress={() => setStep(2)}
          disabled={!schoolLevel}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.step}>Étape 2/2</Text>
      <Text style={styles.title}>Choisis tes passions</Text>
      <Text style={styles.subtitle}>Plusieurs choix possibles</Text>

      {loadingPassions ? (
        <ActivityIndicator color={colors.accent.primary} />
      ) : (
        <ScrollView contentContainerStyle={styles.passionGrid}>
          {passions.map(passion => (
            <PassionTag
              key={passion.id}
              label={passion.label}
              icon={passion.icon}
              selected={selectedPassionIds.includes(passion.id)}
              onPress={() => togglePassion(passion.id)}
            />
          ))}
        </ScrollView>
      )}

      <Button
        label="Continuer"
        onPress={handleFinish}
        disabled={selectedPassionIds.length === 0}
        loading={submitting}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    padding: spacing.lg,
    gap: spacing.md,
  },
  step: {
    color: colors.text.secondary,
    fontSize: typography.fontSize.sm,
  },
  title: {
    color: colors.text.primary,
    fontSize: typography.fontSize.xl,
    fontWeight: '700',
  },
  subtitle: {
    color: colors.text.secondary,
    fontSize: typography.fontSize.sm,
    marginBottom: spacing.sm,
  },
  levelGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  passionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
});
