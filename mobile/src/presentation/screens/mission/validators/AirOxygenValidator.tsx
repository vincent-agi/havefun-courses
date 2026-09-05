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

/** Notion : seule une fraction de l'air (~1/5, le dioxygène) est consommée. */
export function AirOxygenValidator({
  phase,
  onValidated,
}: ExperimentValidatorProps) {
  if (phase === 'guided') return <Guided onValidated={onValidated} />;
  return <Autonomous onValidated={onValidated} />;
}

function fractionOf(rise: number | null, air: number | null): number | null {
  if (rise === null || air === null || air <= 0 || rise < 0 || rise > air) {
    return null;
  }
  return rise / air;
}

function Guided({ onValidated }: { onValidated: () => void }) {
  const [air, setAir] = useState('');
  const [rise, setRise] = useState('');
  const [checked, setChecked] = useState(false);

  const f = fractionOf(num(rise), num(air));
  const ok = f !== null && f >= 0.12 && f <= 0.3;

  return (
    <View style={styles.block}>
      <Text style={styles.intro}>
        Reporte le volume d’air de départ et la montée d’eau après extinction.
      </Text>
      <NumberField
        label="Volume (ou hauteur) d’air au départ"
        value={air}
        onChangeText={setAir}
      />
      <NumberField
        label="Volume (ou hauteur) d’eau montée"
        value={rise}
        onChangeText={setRise}
      />
      {f !== null && (
        <Text style={styles.calc}>
          fraction consommée = {(f * 100).toFixed(0)} %
        </Text>
      )}
      <Button label="Vérifier mon résultat" onPress={() => setChecked(true)} />
      {checked && f === null && (
        <Feedback tone="warn">
          La montée d’eau doit être positive et inférieure au volume d’air.
        </Feedback>
      )}
      {checked && f !== null && (
        <Feedback tone={ok ? 'ok' : 'warn'}>
          {ok
            ? 'Bravo : l’eau monte d’environ un cinquième. C’est le dioxygène (~21 %) qui a été consommé ; le reste, le diazote, n’entretient pas la flamme.'
            : `Tu obtiens ${(f * 100).toFixed(
                0,
              )} %. On attend environ 20 % : vérifie l’étanchéité du bocal et repère bien les deux niveaux d’eau.`}
        </Feedback>
      )}
      {ok && <Button label="Notion validée — continuer" onPress={onValidated} />}
    </View>
  );
}

const CONSUMER = [
  { value: 'fer' as const, label: 'Le fer qui fixe le dioxygène en rouillant' },
  { value: 'eau' as const, label: 'L’eau qui monte dans le tube' },
  { value: 'diazote' as const, label: 'Le diazote de l’air' },
];

function Autonomous({ onValidated }: { onValidated: () => void }) {
  const [air, setAir] = useState('');
  const [rise, setRise] = useState('');
  const [consumer, setConsumer] = useState<'fer' | 'eau' | 'diazote' | null>(
    null,
  );
  const [checked, setChecked] = useState(false);

  const f = fractionOf(num(rise), num(air));
  const fractionOk = f !== null && f >= 0.1 && f <= 0.32;
  const consumerOk = consumer === 'fer';
  const ok = fractionOk && consumerOk;

  return (
    <View style={styles.block}>
      <Text style={styles.intro}>
        La paille de fer a rouillé plusieurs jours. Reporte tes mesures.
      </Text>
      <NumberField
        label="Volume d’air au départ dans le tube"
        value={air}
        onChangeText={setAir}
      />
      <NumberField
        label="Volume d’eau montée"
        value={rise}
        onChangeText={setRise}
      />
      {f !== null && (
        <Text style={styles.calc}>
          fraction consommée = {(f * 100).toFixed(0)} %
        </Text>
      )}
      <ChoiceRow
        label="Qu’est-ce qui a consommé ce gaz ?"
        options={CONSUMER}
        value={consumer}
        onChange={setConsumer}
      />
      <Button label="Vérifier mon défi" onPress={() => setChecked(true)} />
      {checked && (
        <Feedback tone={ok ? 'ok' : 'warn'}>
          {ok
            ? 'Exact : sans flamme, l’eau monte quand même d’environ 1/5. C’est le fer qui, en rouillant, a fixé le dioxygène de l’air.'
            : [
                !fractionOk
                  ? 'On attend une fraction proche de 1/5 (~21 %).'
                  : null,
                !consumerOk
                  ? 'La rouille est une lente combinaison du fer avec le dioxygène de l’air.'
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
