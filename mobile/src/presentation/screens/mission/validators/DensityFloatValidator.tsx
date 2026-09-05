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

type FloatState = 'flotte' | 'coule';
const FLOAT_OPTIONS = [
  { value: 'flotte' as const, label: 'Flotte' },
  { value: 'coule' as const, label: 'Coule' },
];

/** Notion : un corps flotte si sa masse volumique est inférieure à celle de l'eau. */
export function DensityFloatValidator({
  phase,
  onValidated,
}: ExperimentValidatorProps) {
  if (phase === 'guided') return <Guided onValidated={onValidated} />;
  return <Autonomous onValidated={onValidated} />;
}

interface Row {
  mass: string;
  volume: string;
  prediction: FloatState | null;
  observation: FloatState | null;
}
const emptyRow: Row = {
  mass: '',
  volume: '',
  prediction: null,
  observation: null,
};

function Guided({ onValidated }: { onValidated: () => void }) {
  const [rows, setRows] = useState<Row[]>([
    { ...emptyRow },
    { ...emptyRow },
    { ...emptyRow },
  ]);
  const [checked, setChecked] = useState(false);

  const evaluated = rows.map(row => {
    const m = num(row.mass);
    const v = num(row.volume);
    const rho = m !== null && v !== null && v > 0 ? m / v : null;
    const expected: FloatState | null =
      rho === null ? null : rho < 1 ? 'flotte' : 'coule';
    const complete =
      rho !== null && row.prediction !== null && row.observation !== null;
    const consistent =
      complete &&
      row.prediction === expected &&
      row.observation === row.prediction;
    return { rho, expected, complete, consistent };
  });

  const allComplete = evaluated.every(e => e.complete);
  const ok = allComplete && evaluated.every(e => e.consistent);

  const update = (i: number, patch: Partial<Row>) =>
    setRows(cur => cur.map((r, j) => (j === i ? { ...r, ...patch } : r)));

  return (
    <View style={styles.block}>
      <Text style={styles.intro}>
        Pour chaque objet : masse, volume déplacé, ta prévision, puis ce que tu
        observes réellement dans l’eau.
      </Text>
      {rows.map((row, i) => (
        <View key={i} style={styles.rowCard}>
          <Text style={styles.rowTitle}>Objet {i + 1}</Text>
          <NumberField
            label="Masse m (g)"
            value={row.mass}
            onChangeText={t => update(i, { mass: t })}
          />
          <NumberField
            label="Volume déplacé V (cm³)"
            value={row.volume}
            onChangeText={t => update(i, { volume: t })}
          />
          {evaluated[i].rho !== null && (
            <Text style={styles.rho}>
              ρ = m ÷ V = {evaluated[i].rho!.toFixed(2)} g/cm³
            </Text>
          )}
          <ChoiceRow
            label="Ma prévision"
            options={FLOAT_OPTIONS}
            value={row.prediction}
            onChange={v => update(i, { prediction: v })}
          />
          <ChoiceRow
            label="Ce que j’observe"
            options={FLOAT_OPTIONS}
            value={row.observation}
            onChange={v => update(i, { observation: v })}
          />
          {checked && evaluated[i].complete && (
            <Feedback tone={evaluated[i].consistent ? 'ok' : 'warn'}>
              {evaluated[i].consistent
                ? 'Cohérent : ρ, prévision et observation concordent.'
                : `Attendu : ρ ${
                    (evaluated[i].rho as number) < 1 ? '< 1 → flotte' : '> 1 → coule'
                  }. Compare avec ta prévision et ton observation.`}
            </Feedback>
          )}
        </View>
      ))}

      <Button label="Vérifier" onPress={() => setChecked(true)} />
      {checked && !allComplete && (
        <Feedback tone="warn">
          Renseigne les 3 objets (masse, volume, prévision, observation).
        </Feedback>
      )}
      {checked && allComplete && (
        <Feedback tone={ok ? 'ok' : 'warn'}>
          {ok
            ? 'Bravo : tu prévois la flottaison à partir de la masse volumique, comme Archimède face à la couronne.'
            : 'Certaines lignes ne concordent pas. Un corps flotte quand ρ < 1 g/cm³ (celle de l’eau).'}
        </Feedback>
      )}
      {ok && (
        <Button label="Notion validée — continuer" onPress={onValidated} />
      )}
    </View>
  );
}

const LIQUIDS = [
  { value: 'eau-pure' as const, label: 'Eau pure (1,00)' },
  { value: 'eau-salee' as const, label: 'Eau salée saturée (1,20)' },
  { value: 'alcool' as const, label: 'Alcool (0,79)' },
  { value: 'huile' as const, label: 'Huile (0,92)' },
];

function Autonomous({ onValidated }: { onValidated: () => void }) {
  const [liquid, setLiquid] = useState<
    'eau-pure' | 'eau-salee' | 'alcool' | 'huile' | null
  >(null);
  const [ps, setPs] = useState<FloatState | null>(null);
  const [alu, setAlu] = useState<FloatState | null>(null);
  const [checked, setChecked] = useState(false);

  const liquidOk = liquid === 'eau-salee';
  const psOk = ps === 'flotte';
  const aluOk = alu === 'coule';
  const ok = liquidOk && psOk && aluOk;

  return (
    <View style={styles.block}>
      <Text style={styles.intro}>
        Aluminium ρ = 2,7 · polystyrène ρ = 1,05. Choisis le liquide qui les
        sépare, puis indique qui flotte et qui coule dans ce liquide.
      </Text>
      <ChoiceRow
        label="Liquide de tri"
        options={LIQUIDS}
        value={liquid}
        onChange={setLiquid}
      />
      <ChoiceRow
        label="Polystyrène (1,05)"
        options={FLOAT_OPTIONS}
        value={ps}
        onChange={setPs}
      />
      <ChoiceRow
        label="Aluminium (2,7)"
        options={FLOAT_OPTIONS}
        value={alu}
        onChange={setAlu}
      />
      <Button label="Vérifier mon défi" onPress={() => setChecked(true)} />
      {checked && (
        <Feedback tone={ok ? 'ok' : 'warn'}>
          {ok
            ? 'Exact : seule l’eau salée saturée (1,20) est entre 1,05 et 2,7. Le polystyrène flotte, l’aluminium coule.'
            : 'Il faut un liquide dont la masse volumique est comprise entre celle du polystyrène (1,05) et celle de l’aluminium (2,7). Alors le plus léger flotte, le plus lourd coule.'}
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
  rowCard: {
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: 8,
    backgroundColor: colors.background.surface,
  },
  rowTitle: {
    color: colors.text.primary,
    fontSize: typography.fontSize.sm,
    fontWeight: '700',
  },
  rho: {
    color: colors.accent.secondary,
    fontSize: typography.fontSize.sm,
    fontWeight: '700',
  },
});
