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

/** Notion : la lumière du Soleil se propage en ligne droite (ombre nette, exploitable). */
export function ShadowStraightLineValidator({
  phase,
  onValidated,
}: ExperimentValidatorProps) {
  if (phase === 'guided') return <Guided onValidated={onValidated} />;
  return <Autonomous onValidated={onValidated} />;
}

const EDGE = [
  { value: 'net' as const, label: 'Net → la lumière va en ligne droite' },
  { value: 'flou' as const, label: 'Flou' },
  { value: 'colore' as const, label: 'Coloré' },
];

function Guided({ onValidated }: { onValidated: () => void }) {
  const [morning, setMorning] = useState('');
  const [noon, setNoon] = useState('');
  const [evening, setEvening] = useState('');
  const [edge, setEdge] = useState<'net' | 'flou' | 'colore' | null>(null);
  const [checked, setChecked] = useState(false);

  const m = num(morning);
  const n = num(noon);
  const e = num(evening);
  const ready = m !== null && n !== null && e !== null && m > 0 && n > 0 && e > 0;
  const noonShortest = ready && (n as number) < (m as number) && (n as number) < (e as number);
  const edgeOk = edge === 'net';
  const ok = noonShortest && edgeOk;

  return (
    <View style={styles.block}>
      <Text style={styles.intro}>
        Reporte la longueur de l’ombre du gnomon à trois moments de la journée.
      </Text>
      <NumberField label="Ombre le matin (cm)" value={morning} onChangeText={setMorning} />
      <NumberField label="Ombre à midi (cm)" value={noon} onChangeText={setNoon} />
      <NumberField label="Ombre le soir (cm)" value={evening} onChangeText={setEvening} />
      <ChoiceRow
        label="Le bord de l’ombre est…"
        options={EDGE}
        value={edge}
        onChange={setEdge}
      />
      <Button label="Vérifier mon résultat" onPress={() => setChecked(true)} />
      {checked && !ready && (
        <Feedback tone="warn">Renseigne les trois longueurs (non nulles).</Feedback>
      )}
      {checked && ready && (
        <Feedback tone={ok ? 'ok' : 'warn'}>
          {ok
            ? "Bravo : l’ombre est la plus courte à midi et son bord est net. La lumière se propage en ligne droite — c’est ce qui rend l’ombre utilisable comme horloge et comme boussole."
            : [
                !noonShortest
                  ? "On attend l’ombre la plus courte à midi (elle s’allonge le matin et le soir)."
                  : null,
                !edgeOk
                  ? "Un bord d’ombre net signifie que la lumière ne contourne pas l’obstacle : elle va tout droit."
                  : null,
              ]
                .filter(Boolean)
                .join(' ')}
        </Feedback>
      )}
      {ok && <Button label="Notion validée — continuer" onPress={onValidated} />}
    </View>
  );
}

const WHY = [
  {
    value: 'droite' as const,
    label: 'L’ombre du style a une direction précise (lumière en ligne droite)',
  },
  { value: 'chaleur' as const, label: 'Le Soleil chauffe le cadran' },
  { value: 'style' as const, label: 'Le style tourne au cours de la journée' },
];

function Autonomous({ onValidated }: { onValidated: () => void }) {
  const [read1, setRead1] = useState('');
  const [real1, setReal1] = useState('');
  const [read2, setRead2] = useState('');
  const [real2, setReal2] = useState('');
  const [why, setWhy] = useState<'droite' | 'chaleur' | 'style' | null>(null);
  const [checked, setChecked] = useState(false);

  const gap = (a: string, b: string): number | null => {
    const x = num(a);
    const y = num(b);
    return x !== null && y !== null ? Math.abs(x - y) * 60 : null;
  };
  const g1 = gap(read1, real1);
  const g2 = gap(read2, real2);
  const gapsOk = g1 !== null && g2 !== null && g1 <= 20 && g2 <= 20;
  const whyOk = why === 'droite';
  const ok = gapsOk && whyOk;

  return (
    <View style={styles.block}>
      <Text style={styles.intro}>
        Le lendemain, compare l’heure lue sur ton cadran à l’heure réelle, à deux
        moments (en heures, ex. 10,5 pour 10 h 30).
      </Text>
      <NumberField label="1ᵉʳ contrôle — heure lue" value={read1} onChangeText={setRead1} />
      <NumberField label="1ᵉʳ contrôle — heure réelle" value={real1} onChangeText={setReal1} />
      <NumberField label="2ᵉ contrôle — heure lue" value={read2} onChangeText={setRead2} />
      <NumberField label="2ᵉ contrôle — heure réelle" value={real2} onChangeText={setReal2} />
      {g1 !== null && g2 !== null && (
        <Text style={styles.calc}>
          écarts : {g1.toFixed(0)} min et {g2.toFixed(0)} min
        </Text>
      )}
      <ChoiceRow
        label="Pourquoi le cadran solaire fonctionne-t-il ?"
        options={WHY}
        value={why}
        onChange={setWhy}
      />
      <Button label="Vérifier mon défi" onPress={() => setChecked(true)} />
      {checked && (
        <Feedback tone={ok ? 'ok' : 'warn'}>
          {ok
            ? "Bien : ton cadran donne l’heure à moins de 20 minutes près. Il marche parce que l’ombre du style pointe dans une direction précise — la lumière du Soleil va en ligne droite."
            : [
                !gapsOk
                  ? 'On vise moins de 20 minutes d’écart aux deux contrôles : réoriente le style vers le nord et ré-étalonne les lignes.'
                  : null,
                !whyOk
                  ? "C’est la propagation rectiligne de la lumière qui donne à l’ombre une direction nette et régulière."
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
