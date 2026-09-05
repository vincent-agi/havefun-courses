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

/** Notion : un corps pur change d'état à température fixe (palier). */
export function MeltingPlateauValidator({
  phase,
  onValidated,
}: ExperimentValidatorProps) {
  if (phase === 'guided') return <Guided onValidated={onValidated} />;
  return <Autonomous onValidated={onValidated} />;
}

function Guided({ onValidated }: { onValidated: () => void }) {
  const [start, setStart] = useState('');
  const [middle, setMiddle] = useState('');
  const [afterMelt, setAfterMelt] = useState('');
  const [checked, setChecked] = useState(false);

  const t1 = num(start);
  const t2 = num(middle);
  const t3 = num(afterMelt);
  const ready = t1 !== null && t2 !== null && t3 !== null;
  const plateauFlat =
    ready && Math.abs((t1 as number) - (t2 as number)) <= 3;
  const plateauNearZero =
    ready && Math.abs(t1 as number) <= 4 && Math.abs(t2 as number) <= 4;
  const risesAfter = ready && (t3 as number) > (t2 as number) + 5;
  const ok = plateauFlat && plateauNearZero && risesAfter;

  return (
    <View style={styles.block}>
      <Text style={styles.intro}>
        Reporte trois relevés de température pendant le chauffage de la glace.
      </Text>
      <NumberField
        label="Au début (glace + eau) — °C"
        value={start}
        onChangeText={setStart}
      />
      <NumberField
        label="Après quelques minutes (glace + eau encore) — °C"
        value={middle}
        onChangeText={setMiddle}
      />
      <NumberField
        label="Quand toute la glace a fondu — °C"
        value={afterMelt}
        onChangeText={setAfterMelt}
      />
      <Button label="Vérifier mon résultat" onPress={() => setChecked(true)} />
      {checked && !ready && (
        <Feedback tone="warn">Renseigne les trois températures.</Feedback>
      )}
      {checked && ready && (
        <Feedback tone={ok ? 'ok' : 'warn'}>
          {ok
            ? 'Bravo : tant que glace et eau coexistent, la température reste bloquée vers 0 °C (palier), puis elle remonte une fois toute la glace fondue. La chaleur servait à faire fondre la glace.'
            : [
                !plateauNearZero
                  ? 'Pendant la fonte, la température doit rester près de 0 °C.'
                  : null,
                !plateauFlat
                  ? 'Les deux relevés « glace + eau » doivent être quasi identiques : c’est un palier.'
                  : null,
                !risesAfter
                  ? 'La température ne remonte nettement qu’une fois toute la glace fondue.'
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

const DURING = [
  { value: 'solidifie' as const, label: 'Il se solidifie en libérant de la chaleur' },
  { value: 'chauffe' as const, label: 'Il se réchauffe' },
  { value: 'rien' as const, label: 'Rien de particulier' },
];

function Autonomous({ onValidated }: { onValidated: () => void }) {
  const [start, setStart] = useState('');
  const [p1, setP1] = useState('');
  const [p2, setP2] = useState('');
  const [end, setEnd] = useState('');
  const [charac, setCharac] = useState('');
  const [during, setDuring] = useState<'solidifie' | 'chauffe' | 'rien' | null>(
    null,
  );
  const [checked, setChecked] = useState(false);

  const ts = num(start);
  const tp1 = num(p1);
  const tp2 = num(p2);
  const te = num(end);
  const tc = num(charac);
  const ready =
    ts !== null && tp1 !== null && tp2 !== null && te !== null && tc !== null;
  const plateau = ready ? ((tp1 as number) + (tp2 as number)) / 2 : null;
  const plateauFlat = ready && Math.abs((tp1 as number) - (tp2 as number)) <= 2;
  const ordered =
    plateau !== null &&
    (ts as number) > plateau &&
    plateau > (te as number);
  const characOk =
    plateau !== null && Math.abs((tc as number) - plateau) <= 2;
  const duringOk = during === 'solidifie';
  const ok = plateauFlat && ordered && characOk && duringOk;

  return (
    <View style={styles.block}>
      <Text style={styles.intro}>
        Relève la température pendant le refroidissement de la paraffine, puis
        déduis-en sa température caractéristique.
      </Text>
      <NumberField label="Au début (liquide) — °C" value={start} onChangeText={setStart} />
      <NumberField label="Palier — 1ᵉʳ relevé stable — °C" value={p1} onChangeText={setP1} />
      <NumberField label="Palier — 2ᵉ relevé stable — °C" value={p2} onChangeText={setP2} />
      <NumberField label="À la fin (solide froid) — °C" value={end} onChangeText={setEnd} />
      {plateau !== null && (
        <Text style={styles.calc}>palier mesuré ≈ {plateau.toFixed(1)} °C</Text>
      )}
      <NumberField
        label="Température caractéristique que tu en déduis — °C"
        value={charac}
        onChangeText={setCharac}
      />
      <ChoiceRow
        label="Pendant le palier, le corps…"
        options={DURING}
        value={during}
        onChange={setDuring}
      />
      <Button label="Vérifier mon défi" onPress={() => setChecked(true)} />
      {checked && (
        <Feedback tone={ok ? 'ok' : 'warn'}>
          {ok
            ? 'Bien : tu repères un palier de solidification et tu en déduis la température caractéristique du corps. Pendant ce palier, il fige en libérant de la chaleur.'
            : 'On attend deux relevés stables (palier) entre le début et la fin, une température caractéristique égale à ce palier, et l’idée que le corps se solidifie en libérant de la chaleur.'}
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
