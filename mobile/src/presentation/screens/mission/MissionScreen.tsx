import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { container } from '../../../application/container';
import { getCalculator } from '../../../application/calculators';
import { ChallengeDetail } from '../../../domain/entities/challenge';
import { Submission } from '../../../domain/entities/submission';
import { Button } from '../../components/Button';
import { StepIndicator } from '../../components/StepIndicator';
import { PhotoUploadField } from '../../components/PhotoUploadField';
import { XPBar } from '../../components/XPBar';
import { BadgeIcon } from '../../components/BadgeIcon';
import { colors, spacing, typography } from '../../theme/tokens';
import type { MainStackParamList } from '../../navigation/MainNavigator';

type Props = NativeStackScreenProps<MainStackParamList, 'Mission'>;

const STEP_COUNT = 4;

export function MissionScreen({ route, navigation }: Props) {
  const { challengeId } = route.params;

  const [challenge, setChallenge] = useState<ChallengeDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(0);
  const [measurements, setMeasurements] = useState<Record<string, string>>({});
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<Submission | null>(
    null,
  );
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    container.getChallengeDetailUseCase
      .execute(challengeId)
      .then(setChallenge)
      .finally(() => setLoading(false));
  }, [challengeId]);

  if (loading || !challenge) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={colors.accent.primary} />
      </View>
    );
  }

  const calculator = getCalculator(challenge.calculatorSchema.formula);
  const numericMeasurements = Object.fromEntries(
    Object.entries(measurements).map(([key, value]) => [key, Number(value)]),
  );
  const allFieldsValid = challenge.calculatorSchema.fields.every(field => {
    const value = numericMeasurements[field.key];
    return (
      typeof value === 'number' &&
      !Number.isNaN(value) &&
      value >= field.min &&
      value <= field.max
    );
  });
  const result =
    allFieldsValid && calculator ? calculator(numericMeasurements) : null;

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const submission = await container.submitProofUseCase.execute({
        challengeId,
        measurements: allFieldsValid ? numericMeasurements : undefined,
        result: result ?? undefined,
        photoUri: photoUri ?? undefined,
      });
      setSubmissionResult(submission);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Échec de l'envoi de la preuve. Réessaie.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submissionResult) {
    const totalXp = submissionResult.totalXp ?? 0;
    const xpBarMax = Math.max(500, Math.ceil(totalXp / 500) * 500);

    return (
      <View style={styles.center}>
        <Text style={styles.confirmationTitle}>Preuve envoyée !</Text>

        {submissionResult.xpAwarded !== undefined && (
          <Text style={styles.xpGained}>+ {submissionResult.xpAwarded} XP</Text>
        )}
        <XPBar
          current={totalXp}
          max={xpBarMax}
          label={`${totalXp} XP au total`}
        />

        {submissionResult.badgesAwarded &&
          submissionResult.badgesAwarded.length > 0 && (
            <View style={styles.badgeRow}>
              {submissionResult.badgesAwarded.map(badge => (
                <BadgeIcon key={badge.id} label={badge.label} earned />
              ))}
            </View>
          )}

        <Button
          label="Retour au catalogue"
          onPress={() => navigation.navigate('Catalogue')}
        />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StepIndicator totalSteps={STEP_COUNT} currentStep={step} />

      {step === 0 && (
        <View style={styles.stepBlock}>
          <Text style={styles.title}>{challenge.title}</Text>
          <Text style={styles.body}>{challenge.narrativeIntro}</Text>
          <Button label="Continuer" onPress={() => setStep(1)} />
        </View>
      )}

      {step === 1 && (
        <View style={styles.stepBlock}>
          <Text style={styles.title}>Pouvoir théorique</Text>
          <Text style={styles.body}>{challenge.theoryExplanation}</Text>
          <Button label="Passer au calcul" onPress={() => setStep(2)} />
        </View>
      )}

      {step === 2 && (
        <View style={styles.stepBlock}>
          <Text style={styles.title}>Calculateur de terrain</Text>
          {!calculator && (
            <Text style={styles.warning}>
              Cette formule n'est pas encore prise en charge dans l'application.
            </Text>
          )}
          {challenge.calculatorSchema.fields.map(field => (
            <View key={field.key} style={styles.field}>
              <Text style={styles.fieldLabel}>
                {field.unit ? `${field.label} (${field.unit})` : field.label}
              </Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder={`${field.min} - ${field.max}`}
                placeholderTextColor={colors.text.secondary}
                value={measurements[field.key] ?? ''}
                onChangeText={text =>
                  setMeasurements(current => ({
                    ...current,
                    [field.key]: text,
                  }))
                }
              />
            </View>
          ))}

          {result !== null && (
            <Text style={styles.result}>
              {challenge.calculatorSchema.resultLabel} : {result.toFixed(2)}
            </Text>
          )}

          <Button
            label="Continuer"
            onPress={() => setStep(3)}
            disabled={!allFieldsValid}
          />
        </View>
      )}

      {step === 3 && (
        <View style={styles.stepBlock}>
          <Text style={styles.title}>Preuve de terrain</Text>
          <PhotoUploadField photoUri={photoUri} onChange={setPhotoUri} />
          {submitError && <Text style={styles.warning}>{submitError}</Text>}
          <Button
            label="Envoyer ma preuve"
            onPress={handleSubmit}
            loading={submitting}
            disabled={!photoUri}
          />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background.primary,
    padding: spacing.lg,
    gap: spacing.lg,
  },
  center: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background.primary,
    padding: spacing.lg,
    gap: spacing.md,
  },
  stepBlock: {
    gap: spacing.md,
  },
  title: {
    color: colors.text.primary,
    fontSize: typography.fontSize.xl,
    fontWeight: '700',
  },
  body: {
    color: colors.text.secondary,
    fontSize: typography.fontSize.md,
    lineHeight: 22,
  },
  warning: {
    color: colors.accent.warning,
    fontSize: typography.fontSize.sm,
  },
  field: {
    gap: spacing.xs,
  },
  fieldLabel: {
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
  result: {
    color: colors.accent.secondary,
    fontSize: typography.fontSize.md,
    fontWeight: '700',
  },
  confirmationTitle: {
    color: colors.text.primary,
    fontSize: typography.fontSize.xl,
    fontWeight: '700',
  },
  xpGained: {
    color: colors.accent.secondary,
    fontSize: typography.fontSize.lg,
    fontWeight: '700',
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.md,
  },
});
