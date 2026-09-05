import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../../../components/Button';
import { colors, spacing, typography } from '../../../theme/tokens';
import {
  ChoiceRow,
  ExperimentValidatorProps,
  Feedback,
} from './shared';

const CLOUD = [
  { value: 'trouble' as const, label: 'Se trouble' },
  { value: 'limpide' as const, label: 'Reste limpide' },
];
type Cloud = 'trouble' | 'limpide';

/** Notion : l'eau de chaux qui se trouble identifie le dioxyde de carbone. */
export function Co2LimewaterValidator({
  phase,
  onValidated,
}: ExperimentValidatorProps) {
  if (phase === 'guided') return <Guided onValidated={onValidated} />;
  return <Autonomous onValidated={onValidated} />;
}

const REVEALS = [
  { value: 'co2' as const, label: 'La présence de dioxyde de carbone' },
  { value: 'eau' as const, label: "La présence d'eau" },
  { value: 'o2' as const, label: 'La présence de dioxygène' },
];

function Guided({ onValidated }: { onValidated: () => void }) {
  const [breath, setBreath] = useState<Cloud | null>(null);
  const [vinegar, setVinegar] = useState<Cloud | null>(null);
  const [control, setControl] = useState<Cloud | null>(null);
  const [reveals, setReveals] = useState<'co2' | 'eau' | 'o2' | null>(null);
  const [checked, setChecked] = useState(false);

  const ok =
    breath === 'trouble' &&
    vinegar === 'trouble' &&
    control === 'limpide' &&
    reveals === 'co2';

  return (
    <View style={styles.block}>
      <Text style={styles.intro}>
        Indique ce que devient l’eau de chaux dans chaque pot.
      </Text>
      <ChoiceRow
        label="Pot 1 — tu as soufflé à la paille"
        options={CLOUD}
        value={breath}
        onChange={setBreath}
      />
      <ChoiceRow
        label="Pot 2 — gaz du vinaigre + bicarbonate"
        options={CLOUD}
        value={vinegar}
        onChange={setVinegar}
      />
      <ChoiceRow
        label="Pot 3 — témoin (air ambiant)"
        options={CLOUD}
        value={control}
        onChange={setControl}
      />
      <ChoiceRow
        label="Le trouble révèle…"
        options={REVEALS}
        value={reveals}
        onChange={setReveals}
      />
      <Button label="Vérifier mon résultat" onPress={() => setChecked(true)} />
      {checked && (
        <Feedback tone={ok ? 'ok' : 'warn'}>
          {ok
            ? "Bravo : l’air expiré et le gaz du vinaigre + bicarbonate troublent l’eau de chaux, pas le témoin. Ces deux sources dégagent le même gaz : le dioxyde de carbone."
            : "L’eau de chaux se trouble avec l’air expiré (pot 1) et le gaz vinaigre + bicarbonate (pot 2), mais reste limpide dans le témoin (pot 3). Le trouble est le test du dioxyde de carbone."}
        </Feedback>
      )}
      {ok && <Button label="Notion validée — continuer" onPress={onValidated} />}
    </View>
  );
}

const COMMON = [
  {
    value: 'co2' as const,
    label: 'Ils produisent tous du dioxyde de carbone',
  },
  { value: 'eau' as const, label: "Ils consomment tous de l'eau" },
  { value: 'chaleur' as const, label: 'Ils dégagent tous de la chaleur' },
];

function Autonomous({ onValidated }: { onValidated: () => void }) {
  const [candle, setCandle] = useState<Cloud | null>(null);
  const [ferment, setFerment] = useState<Cloud | null>(null);
  const [germ, setGerm] = useState<Cloud | null>(null);
  const [common, setCommon] = useState<'co2' | 'eau' | 'chaleur' | null>(null);
  const [checked, setChecked] = useState(false);

  const ok =
    candle === 'trouble' &&
    ferment === 'trouble' &&
    germ === 'trouble' &&
    common === 'co2';

  return (
    <View style={styles.block}>
      <Text style={styles.intro}>
        Pour chaque montage, indique ce que devient l’eau de chaux.
      </Text>
      <ChoiceRow
        label="Bougie qui brûle sous cloche"
        options={CLOUD}
        value={candle}
        onChange={setCandle}
      />
      <ChoiceRow
        label="Jus sucré + levure (bouteille fermée)"
        options={CLOUD}
        value={ferment}
        onChange={setFerment}
      />
      <ChoiceRow
        label="Graines en germination (bocal fermé)"
        options={CLOUD}
        value={germ}
        onChange={setGerm}
      />
      <ChoiceRow
        label="Point commun des trois phénomènes"
        options={COMMON}
        value={common}
        onChange={setCommon}
      />
      <Button label="Vérifier mon défi" onPress={() => setChecked(true)} />
      {checked && (
        <Feedback tone={ok ? 'ok' : 'warn'}>
          {ok
            ? "Exact : l’eau de chaux se trouble dans les trois cas. Combustion, fermentation et respiration produisent toutes du dioxyde de carbone."
            : "Chacun de ces trois phénomènes dégage du dioxyde de carbone : l’eau de chaux se trouble à chaque fois."}
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
});
