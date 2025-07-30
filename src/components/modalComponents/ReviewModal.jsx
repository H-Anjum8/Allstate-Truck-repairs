import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomButton from '../CustomButton';
import BASE_COLORS from '../../utils/colors';
import { FONTS } from '../../theme/fonts';

const ReviewModal = ({ visible, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handleStarPress = value => {
    setRating(value);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          {/* Close Button */}
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Icon name="close" size={18} color="#000" />
          </TouchableOpacity>

          {/* Heading */}
          <Text style={styles.heading}>
            Rate Your Experience With{'\n'}The Service Provider
          </Text>

          {/* Star Rating */}
          <View style={styles.starRow}>
            {[1, 2, 3, 4, 5].map(index => (
              <TouchableOpacity
                key={index}
                onPress={() => handleStarPress(index)}
              >
                <Icon
                  name={rating >= index ? 'star' : 'star-o'}
                  size={30}
                  color={BASE_COLORS.STAR}
                  style={styles.star}
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Review Text */}
          <Text style={styles.reviewLabel}>Write Your Review</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Tell us about the service quality, punctuality, professionalism, or anything else."
            placeholderTextColor="#999"
            multiline
            value={review}
            onChangeText={setReview}
          />

          {/* Submit Button */}
          <CustomButton
            label="Submit Review"
            onPress={() => onSubmit({ rating, review })}
            style={{ marginHorizontal: 3, marginTop: 10, height: 53 }}
            textStyle={{ fontSize: 12 }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ReviewModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: BASE_COLORS.BLACKISH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: BASE_COLORS.WHITE,
    width: '85%',
    borderRadius: 12,
    padding: 15,
    position: 'relative',
    paddingVertical: 5,
  },
  closeBtn: {
    position: 'absolute',
    right: 12,
    top: 12,
    zIndex: 1,
  },
  heading: {
    textAlign: 'center',
    fontFamily: FONTS.BOLD,
    fontSize: 18,
    color: BASE_COLORS.DARK_GRAY,
    marginTop: 16,
  },
  starRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15,
  },
  star: {
    marginHorizontal: 4,
  },
  reviewLabel: {
    fontFamily: FONTS.BOLD,
    fontSize: 18,
    color: BASE_COLORS.DARK_GRAY,
    marginBottom: 6,
    marginTop: 6,
  },
  textArea: {
    borderColor: BASE_COLORS.BORDER_COLOR,
    borderWidth: 1,
    borderRadius: 10,
    minHeight: 130,
    padding: 10,
    textAlignVertical: 'top',
    marginBottom: 20,
    fontSize: 10,
    fontFamily: FONTS.REGULAR,
    color: BASE_COLORS.BLACK,
  },
});
