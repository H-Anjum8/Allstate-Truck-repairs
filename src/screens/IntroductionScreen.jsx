import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ImageBackground,
  StatusBar,
} from 'react-native';
import BASE_COLORS from '../utils/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import CustomButton from '../components/common/CustomButton';
import { FONTS, TextStyles } from '../theme/fonts';
import { INTRO_DATA } from '../utils/staticData';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const IntroductionScreen = () => {
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const flatListRef = useRef(null);

  const handleNext = () => {
    if (index < INTRO_DATA.length - 1) {
      const nextIndex = index + 1;
      setIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    } else {
      console.log('Get Started Clicked');
      navigation.navigate('role_selection');
    }
  };

  const handleBack = () => {
    if (index > 0) {
      const prevIndex = index - 1;
      setIndex(prevIndex);
      flatListRef.current?.scrollToIndex({ index: prevIndex, animated: true });
    }
  };

  const handleSkip = () => {
    const lastIndex = INTRO_DATA.length - 1;
    setIndex(lastIndex);
    flatListRef.current?.scrollToIndex({ index: lastIndex, animated: true });
  };

  const renderIntroItem = ({ item, index: itemIndex }) => (
    <ImageBackground
      source={item.image}
      resizeMode={'cover'}
      style={styles.slideContainer}
    >
      {itemIndex > 0 ? (
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={20} color={BASE_COLORS.WHITE} />
        </TouchableOpacity>
      ) : null}

      <View style={styles.contentWrapper}>
        <View style={{ width: width * 0.9, marginVertical: 10, gap: 10 }}>
          <View style={styles.pagination}>
            {INTRO_DATA.map((_, i) => (
              <View
                key={i}
                style={i === itemIndex ? styles.activeDot : styles.inactiveDot}
              />
            ))}
          </View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
        <View style={{ width: '100%' }}>
          <CustomButton
            label={item.button}
            onPress={handleNext}
            style={{ width: '100%' }}
          />
          {itemIndex < INTRO_DATA.length - 1 && (
            <CustomButton variant="text" label={'Skip'} onPress={handleSkip} />
          )}
        </View>
      </View>
    </ImageBackground>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={INTRO_DATA}
        renderItem={renderIntroItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default IntroductionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BASE_COLORS.PRIMARY,
  },
  backButton: {
    position: 'absolute',
    top: height * 0.08,
    left: 16,
    padding: 7,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: BASE_COLORS.WHITE,
  },
  slideContainer: {
    height: height,
    width: width,
    position: 'relative',
  },
  image: {
    height: height,
    width: width,
    alignSelf: 'center',
  },
  contentWrapper: {
    height: height * 0.44,
    position: 'absolute',
    bottom: 0,
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 20,
    paddingHorizontal: 16,
    width: '100%',
    backgroundColor: BASE_COLORS.WHITE,
    gap: 20,
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // marginBottom: verticalScale(12),
    gap: moderateScale(4),
  },
  activeDot: {
    width: moderateScale(36),
    height: moderateScale(6),
    borderRadius: moderateScale(20),
    backgroundColor: BASE_COLORS.SECONDARY,
  },
  inactiveDot: {
    width: moderateScale(11),
    height: moderateScale(6),
    borderRadius: moderateScale(20),
    backgroundColor: BASE_COLORS.SECONDARY,
    opacity: 0.1,
  },
  title: {
    ...TextStyles.heading1,
    fontWeight:"500",
    color: BASE_COLORS.TEXT_PRIMARY,
    textAlign: 'center',
    marginBottom: verticalScale(6),
  },
  description: {
    fontFamily: FONTS.REGULAR,
    textAlign: 'center',
    fontSize: 16,
    color: BASE_COLORS.TEXT_SECONDARY,
  },
});
