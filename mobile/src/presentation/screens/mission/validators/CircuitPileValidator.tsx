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

/** Notion : un générateur + une boucle fermée font circuler un courant ; empiler augmente la tension. */
export function CircuitPileValidator({
  phase,
  onValidated,
}: ExperimentValidatorProps) {
  if (phase === 'guided') return <Guided onValidated={onValidated} />;
  return <Autonomous onValidated={onValidated} />;
}

const OPEN_LED = [
  { value: 'eteinte' as const, label: 'Reste éteinte' },
  { value: 'allumee' as const, label: "S'allume" },
  { value: 'clignote' as const, label: 'Clignote' },
];

function Guided({ onValidated }: { onValidated: () => void }) {
  const [rows, setRows] = useState([
    { stages: '1', volts: '' },
    { stages: '3', volts: '' },
    { stages: '6', volts: '' },
  ]);
  const [led, setLed] = useState<'eteinte' | 'allumee' | 'clignote' | null>(
    null,
  );
  const [checked, setChecked] = useState(false);

  const parsed = rows.map(r => ({ n: num(r.stages), v: num(r.volts) }));
  const ready = parsed.every(r => r.n !== null && r.v !== null && r.v! >= 0);
  const volts = parsed.map(r => r.v as number);
  const monotone =
    ready && volts[0] < volts[1] && volts[1] < volts[2];
  const perStage = parsed.map(r => (r.v as number) / (r.n as number));
  const proportional =
    ready && Math.max(...perStage) / Math.min(...perStage) < 2.5;
  const ledOk = led === 'eteinte';
  const ok = monotone && proportional && ledOk;

  const update = (i: number, nextVolts: string) =>
    setRows(cur => cur.map((r, j) => (j === i ? { ...r, volts: nextVolts } : r)));

  return (
    <View style={styles.block}>
      <Text style={styles.intro}>
        Reporte la tension mesurée pour 1, 3 et 6 étages empilés.
      </Text>
      {rows.map((row, i) => (
        <View key={i} style={styles.rowCard}>
          <Text style={styles.rowTitle}>{row.stages} étage(s)</Text>
          <NumberField
            label="Tension mesurée (V)"
            value={row.volts}
            onChangeText={t => update(i, t)}
          />
        </View>
      ))}
      <ChoiceRow
        label="Quand le circuit est ouvert, la DEL…"
        options={OPEN_LED}
        value={led}
        onChange={setLed}
      />
      <Button label="Vérifier mon résultat" onPress={() => setChecked(true)} />
      {checked && !ready && (
        <Feedback tone="warn">Renseigne les trois tensions.</Feedback>
      )}
      {checked && ready && (
        <Feedback tone={ok ? 'ok' : 'warn'}>
          {ok
            ? "Bravo : la tension augmente régulièrement avec le nombre d'étages, et la DEL reste éteinte tant que la boucle est ouverte. C'est la pile de Volta."
            : "On attend une tension qui croît avec le nombre d'étages (à peu près proportionnellement) et une DEL éteinte en circuit ouvert."}
        </Feedback>
      )}
      {ok && <Button label="Notion validée — continuer" onPress={onValidated} />}
    </View>
  );
}

const CURRENT_DIR = [
  {
    value: 'plus-moins' as const,
    label: 'De la borne + vers la borne − à l’extérieur du générateur',
  },
  { value: 'moins-plus' as const, label: 'De la borne − vers la borne +' },
  { value: 'deux' as const, label: 'Dans les deux sens à la fois' },
];

function Autonomous({ onValidated }: { onValidated: () => void }) {
  const [unit, setUnit] = useState('');
  const [count, setCount] = useState('');
  const [total, setTotal] = useState('');
  const [dir, setDir] = useState<'plus-moins' | 'moins-plus' | 'deux' | null>(
    null,
  );
  const [checked, setChecked] = useState(false);

  const u = num(unit);
  const n = num(count);
  const t = num(total);
  const ready = u !== null && n !== null && t !== null && u > 0 && n > 0;
  const totalOk =
    ready && Math.abs((t as number) - (u as number) * (n as number)) /
      ((u as number) * (n as number)) <=
      0.12;
  const enough = t !== null && (t as number) >= 1.8;
  const dirOk = dir === 'plus-moins';
  const ok = totalOk && enough && dirOk;

  return (
    <View style={styles.block}>
      <Text style={styles.intro}>
        Reporte la tension d’un élément, le nombre d’éléments en série et la
        tension totale mesurée.
      </Text>
      <NumberField label="Tension d’un élément (V)" value={unit} onChangeText={setUnit} />
      <NumberField label="Nombre d’éléments en série" value={count} onChangeText={setCount} />
      <NumberField label="Tension totale mesurée (V)" value={total} onChangeText={setTotal} />
      <ChoiceRow
        label="Le sens conventionnel du courant va…"
        options={CURRENT_DIR}
        value={dir}
        onChange={setDir}
      />
      <Button label="Vérifier mon défi" onPress={() => setChecked(true)} />
      {checked && (
        <Feedback tone={ok ? 'ok' : 'warn'}>
          {ok
            ? "Bien : ta tension totale vaut le nombre d’éléments × la tension unitaire, elle dépasse ~1,8 V (assez pour une DEL rouge), et le sens conventionnel du courant va de + vers − à l’extérieur du générateur."
            : "Il faut assez d’éléments en série pour dépasser environ 1,8 V (tension totale ≈ nombre × tension d’un élément), et le courant conventionnel circule de la borne + vers la borne − à l’extérieur."}
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
});
