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
const int = (s: string): number | null => {
  const v = Number(s);
  return s.trim() !== '' && Number.isInteger(v) && v >= 0 ? v : null;
};

/** Notion : on encadre une aire courbe entre deux valeurs (méthode d'exhaustion). */
export function DiskAreaExhaustionValidator({
  phase,
  onValidated,
}: ExperimentValidatorProps) {
  if (phase === 'guided') return <Guided onValidated={onValidated} />;
  return <Autonomous onValidated={onValidated} />;
}

function Guided({ onValidated }: { onValidated: () => void }) {
  const [cell, setCell] = useState('');
  const [inside, setInside] = useState('');
  const [touching, setTouching] = useState('');
  const [checked, setChecked] = useState(false);

  const c = num(cell);
  const ni = int(inside);
  const nt = int(touching);
  const ready = c !== null && c > 0 && ni !== null && nt !== null && nt >= ni;
  const lower = ready ? (ni as number) * (c as number) : null;
  const upper = ready ? (nt as number) * (c as number) : null;
  const brackets =
    lower !== null && upper !== null && lower < Math.PI && Math.PI < upper;
  const tight = lower !== null && upper !== null && upper - lower < 1.5;
  const ok = ready && brackets && tight && (nt as number) > (ni as number);

  return (
    <View style={styles.block}>
      <Text style={styles.intro}>
        Reporte l’aire d’un carreau et tes deux comptages (cercle de rayon 1 m).
      </Text>
      <NumberField label="Aire d’un carreau (m²)" value={cell} onChangeText={setCell} />
      <NumberField
        label="Carreaux entièrement DANS le cercle"
        value={inside}
        onChangeText={setInside}
      />
      <NumberField
        label="Carreaux touchés ou dans le cercle"
        value={touching}
        onChangeText={setTouching}
      />
      {lower !== null && upper !== null && (
        <Text style={styles.calc}>
          aire du disque comprise entre {lower.toFixed(2)} et {upper.toFixed(2)} m²
        </Text>
      )}
      <Button label="Vérifier mon résultat" onPress={() => setChecked(true)} />
      {checked && !ready && (
        <Feedback tone="warn">
          Renseigne l’aire d’un carreau et les deux comptages (touchés ≥ dedans).
        </Feedback>
      )}
      {checked && ready && (
        <Feedback tone={ok ? 'ok' : 'warn'}>
          {ok
            ? "Bravo : ton intervalle contient bien π × R² ≈ 3,14 m². Avec des carreaux plus petits, il se resserrerait autour de 3,14 — c’est la méthode d’exhaustion."
            : "Ton encadrement doit contenir 3,14 m² (par défaut < π < par excès) et rester assez serré. Recompte les carreaux du bord."}
        </Feedback>
      )}
      {ok && <Button label="Notion validée — continuer" onPress={onValidated} />}
    </View>
  );
}

const WHY = [
  {
    value: 'courbe' as const,
    label: 'Le bord est courbe : on ne peut que l’encadrer',
  },
  { value: 'regle' as const, label: 'Il manque une règle assez grande' },
  { value: 'temps' as const, label: 'On n’a pas assez de temps' },
];

function Autonomous({ onValidated }: { onValidated: () => void }) {
  const [low, setLow] = useState('');
  const [high, setHigh] = useState('');
  const [why, setWhy] = useState<'courbe' | 'regle' | 'temps' | null>(null);
  const [checked, setChecked] = useState(false);

  const l = num(low);
  const h = num(high);
  const ready = l !== null && h !== null && l > 0 && h > 0;
  const ordered = ready && (l as number) < (h as number);
  const reasonable = ready && (h as number) / (l as number) < 2;
  const whyOk = why === 'courbe';
  const ok = ordered && reasonable && whyOk;

  return (
    <View style={styles.block}>
      <Text style={styles.intro}>
        Reporte la somme des rectangles par défaut et par excès autour de la
        flaque.
      </Text>
      <NumberField
        label="Somme des rectangles par défaut (m²)"
        value={low}
        onChangeText={setLow}
      />
      <NumberField
        label="Somme des rectangles par excès (m²)"
        value={high}
        onChangeText={setHigh}
      />
      <ChoiceRow
        label="Pourquoi ne peut-on pas donner l’aire exacte ?"
        options={WHY}
        value={why}
        onChange={setWhy}
      />
      <Button label="Vérifier mon défi" onPress={() => setChecked(true)} />
      {checked && (
        <Feedback tone={ok ? 'ok' : 'warn'}>
          {ok
            ? "Bien : ta valeur par défaut est inférieure à ta valeur par excès, l’écart reste raisonnable, et tu as compris qu’un bord courbe ne se mesure que par encadrement."
            : "La valeur par défaut doit être plus petite que la valeur par excès, l’écart pas trop grand, et l’aire exacte est inaccessible car le contour est courbe."}
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
