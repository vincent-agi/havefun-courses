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
const angleDeg = (shadow: number, height: number) =>
  (Math.atan(shadow / height) * 180) / Math.PI;

/** Notion : l'écart d'angle d'ombre entre deux lieux est la fraction de tour qui les sépare. */
export function EarthShadowValidator({
  phase,
  onValidated,
}: ExperimentValidatorProps) {
  if (phase === 'guided') return <Guided onValidated={onValidated} />;
  return <Autonomous onValidated={onValidated} />;
}

function Guided({ onValidated }: { onValidated: () => void }) {
  const [height, setHeight] = useState('');
  const [s1, setS1] = useState('');
  const [s2, setS2] = useState('');
  const [dist, setDist] = useState('');
  const [checked, setChecked] = useState(false);

  const h = num(height);
  const sh1 = num(s1);
  const sh2 = num(s2);
  const d = num(dist);
  const ready =
    h !== null && h > 0 && sh1 !== null && sh2 !== null && d !== null && d > 0;
  const a1 = ready ? angleDeg(sh1 as number, h as number) : null;
  const a2 = ready ? angleDeg(sh2 as number, h as number) : null;
  const delta = a1 !== null && a2 !== null ? Math.abs(a2 - a1) : null;
  const circ = delta !== null && delta > 0.2 ? ((d as number) * 360) / delta : null;
  const ok = circ !== null && circ >= 25000 && circ <= 60000;

  return (
    <View style={styles.block}>
      <Text style={styles.intro}>
        Reporte les longueurs d’ombre des deux gnomons et la distance nord-sud.
      </Text>
      <NumberField label="Hauteur du gnomon (m)" value={height} onChangeText={setHeight} />
      <NumberField label="Ombre au lieu 1 (m)" value={s1} onChangeText={setS1} />
      <NumberField label="Ombre au lieu 2 (m)" value={s2} onChangeText={setS2} />
      <NumberField
        label="Distance nord-sud entre les deux lieux (km)"
        value={dist}
        onChangeText={setDist}
      />
      {a1 !== null && a2 !== null && (
        <Text style={styles.calc}>
          angle 1 = {a1.toFixed(1)}° · angle 2 = {a2.toFixed(1)}° · écart ={' '}
          {(delta as number).toFixed(1)}°
        </Text>
      )}
      {circ !== null && (
        <Text style={styles.calc}>
          circonférence ≈ {Math.round(circ).toLocaleString('fr-FR')} km
        </Text>
      )}
      <Button label="Vérifier mon résultat" onPress={() => setChecked(true)} />
      {checked && !ready && (
        <Feedback tone="warn">
          Complète les quatre mesures (hauteur et distance non nulles).
        </Feedback>
      )}
      {checked && circ !== null && (
        <Feedback tone={ok ? 'ok' : 'warn'}>
          {ok
            ? `Bravo : tu obtiens ~${Math.round(circ).toLocaleString(
                'fr-FR',
              )} km, du bon ordre de grandeur (Terre : 40 075 km). L’écart d’angle t’a donné la fraction de tour entre les deux lieux.`
            : `Tu obtiens ${Math.round(circ).toLocaleString(
                'fr-FR',
              )} km. On attend un résultat entre 25 000 et 60 000 km. Vérifie la verticalité des gnomons et que les mesures sont prises au même instant.`}
        </Feedback>
      )}
      {ok && <Button label="Notion validée — continuer" onPress={onValidated} />}
    </View>
  );
}

const ANGLE_MEANING = [
  { value: 'fraction' as const, label: 'La fraction de tour (9/360) entre A et B' },
  { value: 'gnomon' as const, label: 'L’inclinaison du gnomon' },
  { value: 'heure' as const, label: 'L’heure locale au point B' },
];

function Autonomous({ onValidated }: { onValidated: () => void }) {
  const [dist, setDist] = useState('');
  const [angle, setAngle] = useState('');
  const [meaning, setMeaning] = useState<'fraction' | 'gnomon' | 'heure' | null>(
    null,
  );
  const [checked, setChecked] = useState(false);

  const d = num(dist);
  const a = num(angle);
  const circ = d !== null && a !== null && a > 0 ? (d * 360) / a : null;
  const circOk = circ !== null && Math.abs(circ - 40000) / 40000 <= 0.1;
  const meaningOk = meaning === 'fraction';
  const ok = circOk && meaningOk;

  return (
    <View style={styles.block}>
      <Text style={styles.intro}>
        Reprends les données de l’énoncé : distance A→B et angle d’ombre à B.
      </Text>
      <NumberField label="Distance A → B (km)" value={dist} onChangeText={setDist} />
      <NumberField label="Angle d’ombre à B (°)" value={angle} onChangeText={setAngle} />
      {circ !== null && (
        <Text style={styles.calc}>
          circonférence = {Math.round(circ).toLocaleString('fr-FR')} km
        </Text>
      )}
      <ChoiceRow
        label="L’angle de 9° représente…"
        options={ANGLE_MEANING}
        value={meaning}
        onChange={setMeaning}
      />
      <Button label="Vérifier mon défi" onPress={() => setChecked(true)} />
      {checked && (
        <Feedback tone={ok ? 'ok' : 'warn'}>
          {ok
            ? 'Exact : 1000 × 360 ÷ 9 = 40 000 km, et l’angle de 9° est bien la fraction 9/360 du tour complet qui sépare A et B.'
            : [
                !circOk
                  ? 'La circonférence attendue est proche de 40 000 km (distance × 360 ÷ angle).'
                  : null,
                !meaningOk
                  ? 'L’angle d’ombre à B mesure de combien la verticale de B a « tourné » par rapport à celle de A : c’est une fraction de 360°.'
                  : null,
              ]
                .filter(Boolean)
                .join(' ')}
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
