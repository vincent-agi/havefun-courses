import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Button } from './Button';
import { colors, radius, spacing, typography } from '../theme/tokens';

type PhotoUploadFieldProps = {
  photoUri: string | null;
  onChange: (uri: string) => void;
};

export function PhotoUploadField({
  photoUri,
  onChange,
}: PhotoUploadFieldProps) {
  const handleCapture = async () => {
    const result = await launchCamera({ mediaType: 'photo', quality: 0.7 });
    const uri = result.assets?.[0]?.uri;
    if (uri) onChange(uri);
  };

  const handlePickFromLibrary = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.7,
    });
    const uri = result.assets?.[0]?.uri;
    if (uri) onChange(uri);
  };

  return (
    <View style={styles.container}>
      {photoUri ? (
        <Image source={{ uri: photoUri }} style={styles.preview} />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>Aucune photo sélectionnée</Text>
        </View>
      )}

      <View style={styles.actions}>
        <Button
          label="Prendre une photo"
          variant="secondary"
          onPress={handleCapture}
        />
        <Button
          label="Choisir dans la galerie"
          variant="secondary"
          onPress={handlePickFromLibrary}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  preview: {
    width: '100%',
    aspectRatio: 4 / 3,
    borderRadius: radius.md,
    backgroundColor: colors.background.surface,
  },
  placeholder: {
    width: '100%',
    aspectRatio: 4 / 3,
    borderRadius: radius.md,
    backgroundColor: colors.background.surface,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: colors.text.secondary,
    fontSize: typography.fontSize.sm,
  },
  actions: {
    gap: spacing.sm,
  },
});
