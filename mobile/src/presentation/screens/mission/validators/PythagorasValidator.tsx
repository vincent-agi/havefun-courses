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

/** Notion : dans un triangle rectangle, a² + b² = c². */
export function PythagorasValidator({
  phase,
  onValidated,
}: ExperimentValidatorProps) {
  if (phase === 'guided') return <Guided onValidated={onValidated} />;
  return <Autonomous onValidated={onValidated} />;
}

function Guided({ onValidated }: { onValidated: () => void }) {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [checked, setChecked] = useState(false);

  const la = num(a);
  const lb = num(b);
  const lc = num(c);
  const ready = la !== null && lb !== null && lc !== null && la > 0 && lb > 0 && lc > 0;
  const sum = ready ? (la as number) ** 2 + (lb as number) ** 2 : null;
  const csq = ready ? (lc as number) ** 2 : null;
  const expected = sum !== null ? Math.sqrt(sum) : null;
  const ok =
    expected !== null &&
    lc !== null &&
    Math.abs((lc as number) - expected) / expected <= 0.08;

  return (
    <View style={styles.block}>
      <Text style={styles.intro}>
        Reporte les deux côtés de l’angle droit et l’hypoténuse que tu as
        mesurée.
      </Text>
      <NumberField label="Côté a (m)" value={a} onChangeText={setA} />
      <NumberField label="Côté b (m)" value={b} onChangeText={setB} />
      <NumberField label="Hypoténuse c mesurée (m)" value={c} onChangeText={setC} />
      {sum !== null && csq !== null && (
        <Text style={styles.calc}>
          a² + b² = {sum.toFixed(2)} · c² = {csq.toFixed(2)}
        </Text>
      )}
      <Button label="Vérifier mon résultat" onPress={() => setChecked(true)} />
      {checked && !ready && (
        <Feedback tone="warn">Renseigne les trois longueurs (non nulles).</Feedback>
      )}
      {checked && ready && expected !== null && (
        <Feedback tone={ok ? 'ok' : 'warn'}>
          {ok
            ? `Bravo : c² (${csq!.toFixed(
                2,
              )}) est bien égal à a² + b² (${sum!.toFixed(
                2,
              )}). L’aire du carré sur l’hypoténuse est la somme des deux autres.`
            : `On attendrait une hypoténuse proche de ${expected.toFixed(
                2,
              )} m (racine de a² + b²). Vérifie l’angle droit et la mesure de c.`}
        </Feedback>
      )}
      {ok && <Button label="Notion validée — continuer" onPress={onValidated} />}
    </View>
  );
}

const ANGLE = [
  { value: 'droit' as const, label: 'Droit' },
  { value: 'pas-droit' as const, label: 'Pas droit' },
];

function Autonomous({ onValidated }: { onValidated: () => void }) {
  const [floor, setFloor] = useState('');
  const [wall, setWall] = useState('');
  const [diag, setDiag] = useState('');
  const [verdict, setVerdict] = useState<'droit' | 'pas-droit' | null>(null);
  const [checked, setChecked] = useState(false);

  const f = num(floor);
  const w = num(wall);
  const d = num(diag);
  const ready = f !== null && w !== null && d !== null && f > 0 && w > 0 && d > 0;
  const sum = ready ? (f as number) ** 2 + (w as number) ** 2 : null;
  const dsq = ready ? (d as number) ** 2 : null;
  const isRight =
    sum !== null && dsq !== null && Math.abs(dsq - sum) / dsq <= 0.05;
  const verdictOk =
    verdict !== null && (isRight ? verdict === 'droit' : verdict === 'pas-droit');
  const ok = ready && verdictOk;

  return (
    <View style={styles.block}>
      <Text style={styles.intro}>
        Reporte les trois longueurs mesurées par le maçon.
      </Text>
      <NumberField label="Le long du sol (m)" value={floor} onChangeText={setFloor} />
      <NumberField label="Le long du mur (m)" value={wall} onChangeText={setWall} />
      <NumberField label="En diagonale (m)" value={diag} onChangeText={setDiag} />
      {sum !== null && dsq !== null && (
        <Text style={styles.calc}>
          (sol)² + (mur)² = {sum.toFixed(3)} · (diagonale)² = {dsq.toFixed(3)}
        </Text>
      )}
      <ChoiceRow
        label="L’angle mur / sol est…"
        options={ANGLE}
        value={verdict}
        onChange={setVerdict}
      />
      <Button label="Vérifier mon défi" onPress={() => setChecked(true)} />
      {checked && ready && (
        <Feedback tone={ok ? 'ok' : 'warn'}>
          {ok
            ? "Exact : quand (diagonale)² = (sol)² + (mur)², l’angle est droit (réciproque du théorème de Pythagore). Ici c’est le cas."
            : "Compare (diagonale)² à la somme (sol)² + (mur)². S’ils sont égaux, l’angle est droit ; sinon il ne l’est pas."}
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
  calc: {
    color: colors.accent.secondary,
    fontSize: typography.fontSize.sm,
    fontWeight: '700',
  },
});
