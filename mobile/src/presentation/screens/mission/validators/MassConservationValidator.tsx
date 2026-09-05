import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../../../components/Button';
import { colors, spacing, typography } from '../../../theme/tokens';
import {
  ChoiceRow,
  ExperimentValidatorProps,
  Feedback,
  NumberField,
} from './shared';

const num = (s: string): number | null => {
  const v = Number(s.replace(',', '.'));
  return s.trim() !== '' && Number.isFinite(v) ? v : null;
};

/** Notion : la masse totale se conserve ; en système ouvert, un gaz part. */
export function MassConservationValidator({
  phase,
  onValidated,
}: ExperimentValidatorProps) {
  if (phase === 'guided') return <Guided onValidated={onValidated} />;
  return <Autonomous onValidated={onValidated} />;
}

const OPEN_REASONS = [
  { value: 'gaz' as const, label: 'Un gaz s’est échappé' },
  { value: 'disparu' as const, label: 'La matière a disparu' },
  { value: 'balance' as const, label: 'Erreur de balance' },
];

function Guided({ onValidated }: { onValidated: () => void }) {
  const [closedBefore, setClosedBefore] = useState('');
  const [closedAfter, setClosedAfter] = useState('');
  const [openBefore, setOpenBefore] = useState('');
  const [openAfter, setOpenAfter] = useState('');
  const [reason, setReason] = useState<'gaz' | 'disparu' | 'balance' | null>(
    null,
  );
  const [checked, setChecked] = useState(false);

  const cb = num(closedBefore);
  const ca = num(closedAfter);
  const ob = num(openBefore);
  const oa = num(openAfter);

  const closedConserved =
    cb !== null && ca !== null && Math.abs(ca - cb) <= 0.5;
  const openDecreased = ob !== null && oa !== null && oa < ob;
  const reasonOk = reason === 'gaz';
  const complete =
    cb !== null && ca !== null && ob !== null && oa !== null && reason !== null;
  const ok = complete && closedConserved && openDecreased && reasonOk;

  return (
    <View style={styles.block}>
      <Text style={styles.sectionTitle}>Système fermé (bouteille + ballon)</Text>
      <NumberField
        label="Masse avant réaction m₁ (g)"
        value={closedBefore}
        onChangeText={setClosedBefore}
      />
      <NumberField
        label="Masse après réaction m₂ (g)"
        value={closedAfter}
        onChangeText={setClosedAfter}
      />
      {cb !== null && ca !== null && (
        <Text style={styles.delta}>Δ = {(ca - cb).toFixed(2)} g</Text>
      )}

      <Text style={styles.sectionTitle}>Système ouvert (verre sur balance)</Text>
      <NumberField
        label="Masse avant m₁ (g)"
        value={openBefore}
        onChangeText={setOpenBefore}
      />
      <NumberField
        label="Masse après m₂ (g)"
        value={openAfter}
        onChangeText={setOpenAfter}
      />
      <ChoiceRow
        label="Pourquoi la masse a-t-elle diminué ?"
        options={OPEN_REASONS}
        value={reason}
        onChange={setReason}
      />

      <Button label="Vérifier" onPress={() => setChecked(true)} />
      {checked && !complete && (
        <Feedback tone="warn">Remplis les quatre masses et la question.</Feedback>
      )}
      {checked && complete && (
        <Feedback tone={ok ? 'ok' : 'warn'}>
          {ok
            ? 'Parfait : en système fermé la masse ne bouge pas (Δ ≈ 0). En système ouvert elle baisse parce qu’un gaz s’échappe — mais ce gaz existe. C’est le principe de Lavoisier.'
            : [
                !closedConserved
                  ? 'Système fermé : Δ devrait être quasi nul (moins de 0,5 g). Le montage était-il étanche ?'
                  : null,
                !openDecreased
                  ? 'Système ouvert : la masse doit diminuer (m₂ < m₁).'
                  : null,
                !reasonOk
                  ? 'La matière ne disparaît jamais : c’est un gaz qui quitte le verre.'
                  : null,
              ]
                .filter(Boolean)
                .join(' ')}
        </Feedback>
      )}
      {ok && (
        <Button label="Notion validée — continuer" onPress={onValidated} />
      )}
    </View>
  );
}

const WOOL_REASONS = [
  { value: 'fixe-o2' as const, label: 'Fixe le dioxygène de l’air' },
  { value: 'cree' as const, label: 'Crée de la matière' },
];
const CANDLE_REASONS = [
  { value: 'libere-gaz' as const, label: 'Libère des gaz (CO₂, eau) qui partent' },
  { value: 'disparait' as const, label: 'La matière disparaît' },
];

function Autonomous({ onValidated }: { onValidated: () => void }) {
  const [wool, setWool] = useState<'fixe-o2' | 'cree' | null>(null);
  const [candle, setCandle] = useState<'libere-gaz' | 'disparait' | null>(null);
  const [checked, setChecked] = useState(false);

  const ok = wool === 'fixe-o2' && candle === 'libere-gaz';

  return (
    <View style={styles.block}>
      <Text style={styles.intro}>
        La laine d’acier qui brûle GAGNE de la masse, la bougie en PERD. Explique
        chaque cas par un échange de gaz avec l’air.
      </Text>
      <ChoiceRow
        label="Laine d’acier brûlée → gagne de la masse car…"
        options={WOOL_REASONS}
        value={wool}
        onChange={setWool}
      />
      <ChoiceRow
        label="Bougie qui brûle → perd de la masse car…"
        options={CANDLE_REASONS}
        value={candle}
        onChange={setCandle}
      />
      <Button label="Vérifier mon défi" onPress={() => setChecked(true)} />
      {checked && (
        <Feedback tone={ok ? 'ok' : 'warn'}>
          {ok
            ? 'Exact : le fer fixe le dioxygène de l’air (masse en plus), la bougie relâche du CO₂ et de l’eau qui s’échappent (masse en moins). Rien n’est créé ni détruit.'
            : 'Dans les deux cas, la masse totale se conserve : le fer capte un gaz de l’air, la bougie en libère. Aucune matière ne disparaît ni n’apparaît.'}
        </Feedback>
      )}
      {ok && <Button label="Défi réussi — continuer" onPress={onValidated} />}
    </View>
  );
}

const styles = StyleSheet.create({
  block: { gap: spacing.md },
  intro: {
    color: colors.text.secondary,
    fontSize: typography.fontSize.md,
    lineHeight: 22,
  },
  sectionTitle: {
    color: colors.text.primary,
    fontSize: typography.fontSize.md,
    fontWeight: '700',
    marginTop: spacing.xs,
  },
  delta: {
    color: colors.accent.secondary,
    fontSize: typography.fontSize.sm,
    fontWeight: '700',
  },
});
