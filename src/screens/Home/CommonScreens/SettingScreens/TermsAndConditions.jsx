import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import AuthWrapper from '../../../../components/AuthWrapper';
import CustomHeader from '../../../../components/CustomHeaders';
import BASE_COLORS from '../../../../utils/colors';
import { FONTS } from '../../../../theme/fonts';

const TermsAndConditions = () => {
  const navigation = useNavigation();

  return (
    <AuthWrapper>
      <CustomHeader
        leftIcon={
          <Ionicons name="chevron-back" size={24} color={BASE_COLORS.BLACK} />
        }
        onLeftPress={() => navigation.goBack()}
        username="Terms & Conditions"
        showUsername
        showWelcomeText={false}
        usernameTextStyle={{
          marginBottom: verticalScale(20),
          color: BASE_COLORS.BLACK,
        }}
        contentContainerStyle={{ alignItems: 'center' }}
      />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.contentText}>
          Lorem ipsum dolor sit amet consectetur. Lectus ultricies id sit dui
          lorem sem feugiat massa integer. Magna a fermentum lectus tempus nibh
          lacinia pharetra consectetur. Tien nam pretium metu nam quis duis
          luctus pellentesque id. Nulla dignissim suspendisse et dolor facilisis
          euismod. Tellus at pellentesque est eleifend elit convallis neque. A
          nisi erat amet blandit in rhoncus morbi. Mi luctus risus donec
          pharetra neque. Mattis donec porta nascetur enenan nisl. Risus
          consequat unra phasellus facilisis. Est porttitor est massa dui.
          Pellentesque diam amet luctus nec elit et plasta rhoncus id. Ett dus
          orci non volutpat. Purus ultrices donec habitasse juno aliquet. Et
          facilisi id at ac scelerisque netus ultrices massa. Pharetra eget eget
          rhoncus sit. Tempus phasellus integer orci molestie tincidunt sed eu
          sem rhoncus. Amet dolor vitae ac eu et. Adipiscing fusce viverra sed
          amet phasellus. Morbi quam cursus placerat varius odio sit ipsum
          fringilla. Porttitor dui ac blandit integer sem lectus. Torre vivamus
          et morbi mattis ac turpis biberdum lorem etiam. Morbi egestas sit
          consectetur venenatis amet venenatis imperdiet biberdum. Mauris montes
          consequat aliquam dis phasellus donec. Vitae in aliquet viverra lacus
          vel pretium orci in vel. Ut consequat nam a orci vestibulum. Viverra
          erat egestas tincidunt pellentesque diam ut neque mollis amet.
        </Text>
      </ScrollView>
    </AuthWrapper>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: moderateScale(14),
    paddingBottom: verticalScale(40),
  },
  contentText: {
    fontSize: moderateScale(12),
    color: BASE_COLORS.TEXT_INPUT,
    fontFamily: FONTS.REGULAR,
    lineHeight: verticalScale(17),
    textAlign: 'justify',
  },
});

export default TermsAndConditions;
