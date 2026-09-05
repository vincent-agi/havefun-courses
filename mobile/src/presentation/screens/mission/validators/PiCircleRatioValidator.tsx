import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../../../components/Button';
import { colors, spacing, typography } from '../../../theme/tokens';
import {
  ExperimentValidatorProps,
  Feedback,
  NumberField,
} from './shared';

const num = (s: string): number | null => {
  const v = Number(s.replace(',', '.'));
  return s.trim() !== '' && Number.isFinite(v) ? v : null;
};

/** Notion : le rapport périmètre / diamètre est constant et vaut π. */
export function PiCircleRatioValidator({
  phase,
  onValidated,
}: ExperimentValidatorProps) {
  if (phase === 'guided') return <Guided onValidated={onValidated} />;
  return <Autonomous onValidated={onValidated} />;
}

function Guided({ onValidated }: { onValidated: () => void }) {
  const [rows, setRows] = useState([
    { p: '', d: '' },
    { p: '', d: '' },
    { p: '', d: '' },
  ]);
  const [checked, setChecked] = useState(false);

  const ratios = rows.map(r => {
    const p = num(r.p);
    const d = num(r.d);
    return p !== null && d !== null && d > 0 ? p / d : null;
  });
  const complete = ratios.every(r => r !== null);
  const mean =
    complete && ratios.length > 0
      ? (ratios as number[]).reduce((a, b) => a + b, 0) / ratios.length
      : null;
  const allNearPi = ratios.every(r => r !== null && r >= 2.9 && r <= 3.4);
  const meanNearPi = mean !== null && mean >= 3.0 && mean <= 3.3;
  const ok = complete && allNearPi && meanNearPi;

  return (
    <View style={styles.block}>
      <Text style={styles.intro}>
        Reporte tes 3 mesures. On calcule P ÷ D pour chaque objet.
      </Text>
      {rows.map((row, i) => (
        <View key={i} style={styles.rowCard}>
          <Text style={styles.rowTitle}>Objet {i + 1}</Text>
          <NumberField
            label="Périmètre P (cm)"
            value={row.p}
            onChangeText={t =>
              setRows(cur => cur.map((r, j) => (j === i ? { ...r, p: t } : r)))
            }
          />
          <NumberField
            label="Diamètre D (cm)"
            value={row.d}
            onChangeText={t =>
              setRows(cur => cur.map((r, j) => (j === i ? { ...r, d: t } : r)))
            }
          />
          {ratios[i] !== null && (
            <Text style={styles.ratio}>P ÷ D = {ratios[i]!.toFixed(2)}</Text>
          )}
        </View>
      ))}

      <Button label="Vérifier mon résultat" onPress={() => setChecked(true)} />

      {checked && !complete && (
        <Feedback tone="warn">
          Complète les 3 objets avec des mesures valides (D non nul).
        </Feedback>
      )}
      {checked && complete && mean !== null && (
        <Feedback tone={ok ? 'ok' : 'warn'}>
          {ok
            ? `Bravo : tes rapports tournent autour de ${mean.toFixed(
                2,
              )}, très proche de π (3,14). Le périmètre est bien proportionnel au diamètre.`
            : `Moyenne des rapports : ${mean.toFixed(
                2,
              )}. On attend une valeur entre 3,0 et 3,3. Vérifie : as-tu roulé l'objet sur exactement un tour ? Le diamètre passe-t-il bien par le centre ?`}
        </Feedback>
      )}
      {ok && (
        <Button label="Notion validée — continuer" onPress={onValidated} />
      )}
    </View>
  );
}

function Autonomous({ onValidated }: { onValidated: () => void }) {
  const [radius, setRadius] = useState('');
  const [predicted, setPredicted] = useState('');
  const [measured, setMeasured] = useState('');
  const [checked, setChecked] = useState(false);

  const r = num(radius);
  const p = num(predicted);
  const meas = num(measured);
  const expected = useMemo(
    () => (r !== null && r > 0 ? 2 * Math.PI * r : null),
    [r],
  );
  const predOk =
    expected !== null &&
    p !== null &&
    Math.abs(p - expected) / expected <= 0.05;
  const measOk =
    p !== null && meas !== null && Math.abs(meas - p) / p <= 0.05;
  const ok = predOk && measOk;

  return (
    <View style={styles.block}>
      <Text style={styles.intro}>
        Tu ne peux pas entrer dans le cercle. Utilise ce que tu as appris.
      </Text>
      <NumberField
        label="Rayon mesuré R (m)"
        value={radius}
        onChangeText={setRadius}
      />
      <NumberField
        label="Longueur de grillage prévue par le calcul (m)"
        value={predicted}
        onChangeText={setPredicted}
      />
      <NumberField
        label="Longueur vérifiée à la ficelle (m)"
        value={measured}
        onChangeText={setMeasured}
      />
      <Button label="Vérifier mon défi" onPress={() => setChecked(true)} />

      {checked && expected !== null && (
        <Feedback tone={predOk ? 'ok' : 'warn'}>
          {predOk
            ? 'Ta prévision colle : tu as bien utilisé le périmètre = π × diamètre.'
            : `Avec R = ${r} m, on attend un périmètre proche de ${expected.toFixed(
                2,
              )} m (2 × π × R). Reprends ton calcul.`}
        </Feedback>
      )}
      {checked && p !== null && meas !== null && (
        <Feedback tone={measOk ? 'ok' : 'warn'}>
          {measOk
            ? 'La mesure à la ficelle confirme ta prévision (moins de 5 % d’écart).'
            : 'Ta mesure à la ficelle s’écarte de plus de 5 % de ta prévision : re-déroule la ficelle bien tendue sur le tracé.'}
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
  ratio: {
    color: colors.accent.secondary,
    fontSize: typography.fontSize.sm,
    fontWeight: '700',
  },
});
