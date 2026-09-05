import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from '../../../components/Button';
import { colors, spacing, typography } from '../../../theme/tokens';
import {
  ChoiceRow,
  ExperimentValidatorProps,
  Feedback,
} from './shared';

const CELLS = [
  { value: 'oui' as const, label: 'Cellules visibles' },
  { value: 'non' as const, label: 'Pas de cellules' },
];
type Cells = 'oui' | 'non';

/** Notion : la cellule est l'unité commune à tous les êtres vivants. */
export function CellUnitValidator({
  phase,
  onValidated,
}: ExperimentValidatorProps) {
  if (phase === 'guided') return <Guided onValidated={onValidated} />;
  return <Autonomous onValidated={onValidated} />;
}

const WHAT_IS = [
  {
    value: 'unite' as const,
    label: "L'unité commune à tous les êtres vivants",
  },
  { value: 'piece' as const, label: 'Une pièce du microscope' },
  { value: 'molecule' as const, label: 'Une molécule' },
];

function Guided({ onValidated }: { onValidated: () => void }) {
  const [onion, setOnion] = useState<Cells | null>(null);
  const [elodea, setElodea] = useState<Cells | null>(null);
  const [cheek, setCheek] = useState<Cells | null>(null);
  const [pond, setPond] = useState<Cells | null>(null);
  const [sand, setSand] = useState<Cells | null>(null);
  const [what, setWhat] = useState<'unite' | 'piece' | 'molecule' | null>(null);
  const [checked, setChecked] = useState(false);

  const ok =
    onion === 'oui' &&
    elodea === 'oui' &&
    cheek === 'oui' &&
    pond === 'oui' &&
    sand === 'non' &&
    what === 'unite';

  return (
    <View style={styles.block}>
      <Text style={styles.intro}>
        Pour chaque préparation, indique si tu vois des cellules.
      </Text>
      <ChoiceRow label="Épiderme d’oignon" options={CELLS} value={onion} onChange={setOnion} />
      <ChoiceRow label="Feuille d’élodée" options={CELLS} value={elodea} onChange={setElodea} />
      <ChoiceRow label="Frottis de joue" options={CELLS} value={cheek} onChange={setCheek} />
      <ChoiceRow label="Eau de mare" options={CELLS} value={pond} onChange={setPond} />
      <ChoiceRow label="Grain de sable" options={CELLS} value={sand} onChange={setSand} />
      <ChoiceRow label="Qu’est-ce que la cellule ?" options={WHAT_IS} value={what} onChange={setWhat} />
      <Button label="Vérifier mon résultat" onPress={() => setChecked(true)} />
      {checked && (
        <Feedback tone={ok ? 'ok' : 'warn'}>
          {ok
            ? "Bravo : oignon, élodée, joue et micro-organismes de la mare montrent tous des cellules, alors que le sable n’en a pas. La cellule est l’unité commune du vivant."
            : "Tous les échantillons vivants (oignon, élodée, joue, eau de mare) montrent des cellules ; le sable, matière non vivante, n’en a pas. La cellule est l’unité commune du vivant."}
        </Feedback>
      )}
      {ok && <Button label="Notion validée — continuer" onPress={onValidated} />}
    </View>
  );
}

const ORIGIN = [
  { value: 'vivant' as const, label: 'Vivant ou issu du vivant' },
  { value: 'jamais' as const, label: "N'a jamais été vivant" },
];
type Origin = 'vivant' | 'jamais';

function Autonomous({ onValidated }: { onValidated: () => void }) {
  const [moss, setMoss] = useState<Origin | null>(null);
  const [feather, setFeather] = useState<Origin | null>(null);
  const [stone, setStone] = useState<Origin | null>(null);
  const [reason, setReason] = useState('');
  const [checked, setChecked] = useState(false);

  const classOk =
    moss === 'vivant' && feather === 'vivant' && stone === 'jamais';
  const reasonOk = reason.trim().length >= 15;
  const ok = classOk && reasonOk;

  return (
    <View style={styles.block}>
      <Text style={styles.intro}>
        Classe tes trois échantillons d’après ce que tu observes au microscope.
      </Text>
      <ChoiceRow label="Mousse" options={ORIGIN} value={moss} onChange={setMoss} />
      <ChoiceRow label="Plume" options={ORIGIN} value={feather} onChange={setFeather} />
      <ChoiceRow label="Caillou" options={ORIGIN} value={stone} onChange={setStone} />
      <View style={styles.field}>
        <Text style={styles.label}>Sur quel critère tu te bases</Text>
        <TextInput
          style={styles.textArea}
          multiline
          value={reason}
          onChangeText={setReason}
          placeholder="Qu’est-ce qui te permet de trancher ?"
          placeholderTextColor={colors.text.secondary}
        />
      </View>
      <Button label="Vérifier mon défi" onPress={() => setChecked(true)} />
      {checked && (
        <Feedback tone={ok ? 'ok' : 'warn'}>
          {ok
            ? "Bien : mousse et plume montrent une organisation cellulaire (vivant ou issu du vivant), le caillou non (jamais vivant). Ton critère est la présence de cellules."
            : "La mousse et la plume sont faites de cellules (vivant ou issu du vivant), le caillou n’en a pas (jamais vivant). Le critère est la présence de cellules."}
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
  field: { gap: spacing.xs },
  label: { color: colors.text.primary, fontSize: typography.fontSize.sm },
  textArea: {
    minHeight: 72,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    backgroundColor: colors.background.surface,
    color: colors.text.primary,
    padding: spacing.md,
    textAlignVertical: 'top',
  },
});
