import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import BASE_COLORS from '../../utils/colors';
import { FONTS } from '../../theme/fonts';
import { IMAGES } from '../../utils/appAssets';

const CompletionProofCard = () => {
  return (
    <View style={styles.proofCard}>
      <Text style={styles.proofTitle}>Completion Proof Submitted</Text>
      <Text style={styles.proofUploader}>
        Upload by <Text style={styles.proofUploaderName}>George Franklin</Text>
      </Text>

      <View style={styles.imageRow}>
        <Image source={IMAGES.WORK1} style={styles.proofImage} />
        <Image source={IMAGES.WORK2} style={styles.proofImage} />
        <Image source={IMAGES.WORK3} style={styles.proofImage} />
      </View>
    </View>
  );
};

export default CompletionProofCard;

const styles = StyleSheet.create({
  proofCard: {
    backgroundColor: BASE_COLORS.WHITE,
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 2,
    marginBottom: 4,
    elevation: 1,
  },
  proofTitle: {
    fontSize: 14,
    fontFamily: FONTS.BOLD,
    color: BASE_COLORS.BLACK,
  },
  proofUploader: {
    marginTop: 2,
    fontSize: 12,
    fontFamily: FONTS.REGULAR,
    color: BASE_COLORS.GRAY,
  },
  proofUploaderName: {
    fontFamily: FONTS.BOLD,
    color: BASE_COLORS.BLACK,
  },
  imageRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  proofImage: {
    width: 120,
    height: 100,
    borderRadius: 10,
    marginRight: 8,
  },
});
