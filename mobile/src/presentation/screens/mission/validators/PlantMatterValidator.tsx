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

/** Notion : la matière fabriquée par une plante ne vient pas du sol. */
export function PlantMatterValidator({
  phase,
  onValidated,
}: ExperimentValidatorProps) {
  if (phase === 'guided') return <Guided onValidated={onValidated} />;
  return <Autonomous onValidated={onValidated} />;
}

function Guided({ onValidated }: { onValidated: () => void }) {
  const [p1, setP1] = useState('');
  const [p2, setP2] = useState('');
  const [t1, setT1] = useState('');
  const [t2, setT2] = useState('');
  const [checked, setChecked] = useState(false);

  const mp1 = num(p1);
  const mp2 = num(p2);
  const mt1 = num(t1);
  const mt2 = num(t2);
  const ready = mp1 !== null && mp2 !== null && mt1 !== null && mt2 !== null;
  const plantGain = ready ? (mp2 as number) - (mp1 as number) : null;
  const soilLoss = ready ? (mt1 as number) - (mt2 as number) : null;
  const ok =
    plantGain !== null &&
    soilLoss !== null &&
    plantGain > 5 &&
    soilLoss >= 0 &&
    plantGain >= 5 * Math.max(soilLoss, 1);

  return (
    <View style={styles.block}>
      <Text style={styles.intro}>
        Reporte les pesées de début et de fin, plante et terre séparées.
      </Text>
      <NumberField label="Plant au début — m_p1 (g)" value={p1} onChangeText={setP1} />
      <NumberField label="Plant à la fin — m_p2 (g)" value={p2} onChangeText={setP2} />
      <NumberField label="Terre sèche au début — m_t1 (g)" value={t1} onChangeText={setT1} />
      <NumberField label="Terre sèche à la fin — m_t2 (g)" value={t2} onChangeText={setT2} />
      {plantGain !== null && soilLoss !== null && (
        <Text style={styles.calc}>
          gain plante = {plantGain.toFixed(1)} g · perte terre ={' '}
          {soilLoss.toFixed(1)} g
        </Text>
      )}
      <Button label="Vérifier mon résultat" onPress={() => setChecked(true)} />
      {checked && !ready && (
        <Feedback tone="warn">Renseigne les quatre pesées.</Feedback>
      )}
      {checked && ready && (
        <Feedback tone={ok ? 'ok' : 'warn'}>
          {ok
            ? `Bravo : la plante a gagné ${plantGain!.toFixed(
                1,
              )} g pendant que la terre n’en perdait que ${soilLoss!.toFixed(
                1,
              )} g. La matière végétale ne vient donc pas du sol, comme l’a montré van Helmont.`
            : 'On attend un gain de la plante bien plus grand que la perte de la terre (la terre ne doit presque pas maigrir). Vérifie que la terre était sèche aux deux pesées.'}
        </Feedback>
      )}
      {ok && <Button label="Notion validée — continuer" onPress={onValidated} />}
    </View>
  );
}

const ORIGIN = [
  {
    value: 'air-eau' as const,
    label: 'De l’air (CO₂) et de l’eau, grâce à la lumière',
  },
  { value: 'sol' as const, label: 'Du sol' },
  { value: 'engrais' as const, label: 'De l’engrais ajouté' },
];

function Autonomous({ onValidated }: { onValidated: () => void }) {
  const [light, setLight] = useState('');
  const [dark, setDark] = useState('');
  const [origin, setOrigin] = useState<'air-eau' | 'sol' | 'engrais' | null>(
    null,
  );
  const [checked, setChecked] = useState(false);

  const gl = num(light);
  const go = num(dark);
  const comparesOk =
    gl !== null && go !== null && gl > 0 && go >= 0 && gl >= 3 * Math.max(go, 0.5);
  const originOk = origin === 'air-eau';
  const ok = comparesOk && originOk;

  return (
    <View style={styles.block}>
      <Text style={styles.intro}>
        Compare la masse sèche produite par le plant éclairé et par celui à
        l’obscurité.
      </Text>
      <NumberField
        label="Matière sèche produite — plant à la lumière (g)"
        value={light}
        onChangeText={setLight}
      />
      <NumberField
        label="Matière sèche produite — plant à l’obscurité (g)"
        value={dark}
        onChangeText={setDark}
      />
      <ChoiceRow
        label="D’où vient l’essentiel de la matière produite ?"
        options={ORIGIN}
        value={origin}
        onChange={setOrigin}
      />
      <Button label="Vérifier mon défi" onPress={() => setChecked(true)} />
      {checked && (
        <Feedback tone={ok ? 'ok' : 'warn'}>
          {ok
            ? 'Bien : le plant éclairé produit nettement plus de matière. La lumière est indispensable, et cette matière vient surtout de l’air (CO₂) et de l’eau.'
            : [
                !comparesOk
                  ? 'Pour conclure, le plant éclairé doit produire nettement plus de matière que celui à l’obscurité.'
                  : null,
                !originOk
                  ? 'Le sol n’apporte que des sels minéraux en très petite quantité : la masse vient de l’air et de l’eau, captés grâce à la lumière.'
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
