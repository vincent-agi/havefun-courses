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
const near = (a: number, b: number, tol = 0.06) => Math.abs(a - b) / b <= tol;

/** Notion : masse (invariable) et poids (P = m·g, dépend du lieu) sont distincts. */
export function WeightVsMassValidator({
  phase,
  onValidated,
}: ExperimentValidatorProps) {
  if (phase === 'guided') return <Guided onValidated={onValidated} />;
  return <Autonomous onValidated={onValidated} />;
}

function Guided({ onValidated }: { onValidated: () => void }) {
  const [rows, setRows] = useState([
    { mass: '', weight: '' },
    { mass: '', weight: '' },
    { mass: '', weight: '' },
  ]);
  const [checked, setChecked] = useState(false);

  const ratios = rows.map(r => {
    const m = num(r.mass);
    const w = num(r.weight);
    return m !== null && w !== null && m > 0 ? w / m : null;
  });
  const ready = ratios.every(r => r !== null);
  const values = ratios.filter((r): r is number => r !== null);
  const allNearG = ready && values.every(r => r >= 8.5 && r <= 11);
  const consistent =
    ready && Math.max(...values) - Math.min(...values) < 1.5;
  const ok = allNearG && consistent;

  const update = (i: number, patch: Partial<(typeof rows)[number]>) =>
    setRows(cur => cur.map((r, j) => (j === i ? { ...r, ...patch } : r)));

  return (
    <View style={styles.block}>
      <Text style={styles.intro}>
        Pour chaque objet, reporte la masse (balance) et le poids (dynamomètre).
      </Text>
      {rows.map((row, i) => (
        <View key={i} style={styles.rowCard}>
          <Text style={styles.rowTitle}>Objet {i + 1}</Text>
          <NumberField
            label="Masse (kg)"
            value={row.mass}
            onChangeText={t => update(i, { mass: t })}
          />
          <NumberField
            label="Poids (N)"
            value={row.weight}
            onChangeText={t => update(i, { weight: t })}
          />
          {ratios[i] !== null && (
            <Text style={styles.calc}>
              poids ÷ masse = {ratios[i]!.toFixed(2)} N/kg
            </Text>
          )}
        </View>
      ))}
      <Button label="Vérifier mon résultat" onPress={() => setChecked(true)} />
      {checked && !ready && (
        <Feedback tone="warn">Renseigne les 3 objets (masse non nulle).</Feedback>
      )}
      {checked && ready && (
        <Feedback tone={ok ? 'ok' : 'warn'}>
          {ok
            ? "Bravo : le quotient poids ÷ masse est le même pour tous (≈ 9,8 N/kg). C’est l’intensité de la pesanteur g. La balance mesure la masse, le dynamomètre mesure une force."
            : "On attend un quotient poids ÷ masse quasi identique pour les trois objets, autour de 9,8 N/kg. Vérifie tes lectures."}
        </Feedback>
      )}
      {ok && <Button label="Notion validée — continuer" onPress={onValidated} />}
    </View>
  );
}

const CHANGES = [
  { value: 'poids' as const, label: 'Le poids, pas la masse' },
  { value: 'masse' as const, label: 'La masse, pas le poids' },
  { value: 'deux' as const, label: 'Les deux' },
];

function Autonomous({ onValidated }: { onValidated: () => void }) {
  const [mass, setMass] = useState('');
  const [earth, setEarth] = useState('');
  const [moon, setMoon] = useState('');
  const [mars, setMars] = useState('');
  const [changes, setChanges] = useState<'poids' | 'masse' | 'deux' | null>(
    null,
  );
  const [checked, setChecked] = useState(false);

  const m = num(mass);
  const e = num(earth);
  const l = num(moon);
  const r = num(mars);
  const ready =
    m !== null && m > 0 && e !== null && l !== null && r !== null;
  const weightsOk =
    ready &&
    near(e as number, (m as number) * 9.8) &&
    near(l as number, (m as number) * 1.6) &&
    near(r as number, (m as number) * 3.7);
  const changesOk = changes === 'poids';
  const ok = weightsOk && changesOk;

  return (
    <View style={styles.block}>
      <Text style={styles.intro}>
        Reporte la masse du sac et les poids que tu prévois sur chaque astre.
      </Text>
      <NumberField label="Masse du sac (kg)" value={mass} onChangeText={setMass} />
      <NumberField label="Poids prévu sur Terre — g = 9,8 (N)" value={earth} onChangeText={setEarth} />
      <NumberField label="Poids prévu sur la Lune — g = 1,6 (N)" value={moon} onChangeText={setMoon} />
      <NumberField label="Poids prévu sur Mars — g = 3,7 (N)" value={mars} onChangeText={setMars} />
      <ChoiceRow
        label="Qu’est-ce qui change d’un astre à l’autre ?"
        options={CHANGES}
        value={changes}
        onChange={setChanges}
      />
      <Button label="Vérifier mon défi" onPress={() => setChecked(true)} />
      {checked && (
        <Feedback tone={ok ? 'ok' : 'warn'}>
          {ok
            ? "Exact : chaque poids vaut masse × g de l’astre, et c’est bien le poids qui change (la masse reste 5 kg partout)."
            : "Chaque poids se calcule par masse × g de l’astre. Et d’un astre à l’autre, seul le poids change : la masse est invariable."}
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
    gap: spacing.xs,
    padding: spacing.md,
    borderRadius: 8,
    backgroundColor: colors.background.surface,
  },
  rowTitle: {
    color: colors.text.primary,
    fontSize: typography.fontSize.sm,
    fontWeight: '700',
  },
  calc: {
    color: colors.accent.secondary,
    fontSize: typography.fontSize.sm,
    fontWeight: '700',
  },
});
