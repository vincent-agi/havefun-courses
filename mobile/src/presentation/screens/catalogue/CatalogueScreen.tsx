import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { container } from '../../../application/container';
import {
  Challenge,
  ChallengeFilters,
} from '../../../domain/entities/challenge';
import {
  SchoolLevel,
  SCHOOL_LEVEL_LABELS,
} from '../../../domain/entities/school-level';
import { PassionTag } from '../../components/PassionTag';
import { QuestCard } from '../../components/QuestCard';
import { colors, spacing, typography } from '../../theme/tokens';
import type { MainStackParamList } from '../../navigation/MainNavigator';

type Props = NativeStackScreenProps<MainStackParamList, 'Catalogue'>;

const SCHOOL_LEVELS = Object.values(SchoolLevel);
const DURATION_OPTIONS: { label: string; maxDurationMinutes?: number }[] = [
  { label: 'Tous', maxDurationMinutes: undefined },
  { label: '≤ 30 min', maxDurationMinutes: 30 },
  { label: '≤ 45 min', maxDurationMinutes: 45 },
  { label: '≤ 60 min', maxDurationMinutes: 60 },
];

export function CatalogueScreen({ navigation }: Props) {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [schoolLevel, setSchoolLevel] = useState<SchoolLevel | undefined>();
  const [maxDurationMinutes, setMaxDurationMinutes] = useState<
    number | undefined
  >();

  useEffect(() => {
    const filters: ChallengeFilters = { schoolLevel, maxDurationMinutes };
    setLoading(true);
    container.listChallengesUseCase
      .execute(filters)
      .then(setChallenges)
      .finally(() => setLoading(false));
  }, [schoolLevel, maxDurationMinutes]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Quêtes disponibles</Text>
        <Pressable
          accessibilityRole="button"
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.profileLink}>Profil</Text>
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}
      >
        <PassionTag
          label="Tous niveaux"
          icon="🎓"
          selected={!schoolLevel}
          onPress={() => setSchoolLevel(undefined)}
        />
        {SCHOOL_LEVELS.map(level => (
          <PassionTag
            key={level}
            label={SCHOOL_LEVEL_LABELS[level]}
            icon="🎓"
            selected={schoolLevel === level}
            onPress={() => setSchoolLevel(level)}
          />
        ))}
      </ScrollView>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}
      >
        {DURATION_OPTIONS.map(option => (
          <PassionTag
            key={option.label}
            label={option.label}
            icon="⏱"
            selected={maxDurationMinutes === option.maxDurationMinutes}
            onPress={() => setMaxDurationMinutes(option.maxDurationMinutes)}
          />
        ))}
      </ScrollView>

      {loading ? (
        <ActivityIndicator
          color={colors.accent.primary}
          style={styles.loader}
        />
      ) : challenges.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>
            Aucune quête ne correspond à ces filtres pour le moment.
          </Text>
        </View>
      ) : (
        <FlatList
          data={challenges}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <QuestCard
              challenge={item}
              onPress={() =>
                navigation.navigate('Mission', { challengeId: item.id })
              }
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    paddingTop: spacing.lg,
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  title: {
    color: colors.text.primary,
    fontSize: typography.fontSize.xl,
    fontWeight: '700',
  },
  profileLink: {
    color: colors.accent.primary,
    fontSize: typography.fontSize.md,
    fontWeight: '600',
  },
  filterRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingBottom: spacing.xs,
  },
  list: {
    gap: spacing.sm,
    paddingVertical: spacing.md,
  },
  loader: {
    marginTop: spacing.xl,
  },
  emptyState: {
    marginTop: spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    color: colors.text.secondary,
    fontSize: typography.fontSize.md,
    textAlign: 'center',
  },
});
