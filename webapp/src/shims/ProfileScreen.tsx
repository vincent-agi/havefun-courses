import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { container } from '../../../mobile/src/application/container';
import { BadgeStatus } from '../../../mobile/src/domain/entities/badge';
import { PassCompetences } from '../../../mobile/src/domain/entities/pass-competences';
import { Button } from '../../../mobile/src/presentation/components/Button';
import { XPBar } from '../../../mobile/src/presentation/components/XPBar';
import { BadgeIcon } from '../../../mobile/src/presentation/components/BadgeIcon';
import {
  colors,
  spacing,
  typography,
} from '../../../mobile/src/presentation/theme/tokens';

/**
 * Shim web de `mobile/src/presentation/screens/profile/ProfileScreen.tsx`.
 *
 * Identique à l'écran mobile, sauf l'export : `downloadPassCompetencesPdfUseCase`
 * renvoie ici un object URL (voir shim `http-pass-export.repository`) qu'on
 * ouvre dans un nouvel onglet au lieu de `Linking.openURL('file://...')`.
 */
export function ProfileScreen() {
  const [badges, setBadges] = useState<BadgeStatus[]>([]);
  const [pass, setPass] = useState<PassCompetences | null>(null);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      container.getBadgesUseCase.execute(),
      container.getPassCompetencesUseCase.execute(),
    ])
      .then(([badgeList, passData]) => {
        setBadges(badgeList);
        setPass(passData);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleExport = async () => {
    setExportError(null);
    setExporting(true);
    try {
      const url = await container.downloadPassCompetencesPdfUseCase.execute();
      window.open(url, '_blank', 'noopener');
    } catch {
      setExportError("Impossible d'ouvrir le Pass Compétences.");
    } finally {
      setExporting(false);
    }
  };

  if (loading || !pass) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={colors.accent.primary} />
      </View>
    );
  }

  const xpBarMax = Math.max(500, Math.ceil(pass.totalXp / 500) * 500);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{pass.firstName}</Text>
      <XPBar
        current={pass.totalXp}
        max={xpBarMax}
        label={`${pass.totalXp} XP`}
      />

      <Text style={styles.sectionTitle}>Badges</Text>
      <View style={styles.badgeGrid}>
        {badges.map((badge) => (
          <BadgeIcon key={badge.id} label={badge.label} earned={badge.earned} />
        ))}
      </View>

      <Text style={styles.sectionTitle}>Pass Compétences ODD 4</Text>
      {pass.items.length === 0 ? (
        <Text style={styles.emptyText}>
          Aucune compétence validée pour le moment.
        </Text>
      ) : (
        pass.items.map((item, index) => (
          <View key={index} style={styles.passItem}>
            <Text style={styles.passItemTitle}>
              {item.skillLabel} ({item.subject})
            </Text>
            <Text style={styles.passItemMeta}>
              via "{item.challengeTitle}" · {item.passionLabel}
            </Text>
          </View>
        ))
      )}

      {exportError && <Text style={styles.error}>{exportError}</Text>}
      <Button
        label="Télécharger mon Pass"
        onPress={handleExport}
        loading={exporting}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background.primary,
    padding: spacing.lg,
    gap: spacing.md,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background.primary,
  },
  title: {
    color: colors.text.primary,
    fontSize: typography.fontSize.xl,
    fontWeight: '700',
  },
  sectionTitle: {
    color: colors.text.primary,
    fontSize: typography.fontSize.lg,
    fontWeight: '700',
    marginTop: spacing.md,
  },
  badgeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  emptyText: {
    color: colors.text.secondary,
    fontSize: typography.fontSize.md,
  },
  passItem: {
    gap: 2,
  },
  passItemTitle: {
    color: colors.text.primary,
    fontSize: typography.fontSize.md,
    fontWeight: '600',
  },
  passItemMeta: {
    color: colors.text.secondary,
    fontSize: typography.fontSize.sm,
  },
  error: {
    color: colors.accent.danger,
    fontSize: typography.fontSize.sm,
  },
});
