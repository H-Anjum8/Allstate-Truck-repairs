import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AuthWrapper from '../../../../components/AuthWrapper';
import MyBookingHeader from '../../../../components/DashboardComponents/MyBookingHeader';
import CustomButton from '../../../../components/CustomButton';
import BASE_COLORS from '../../../../utils/colors';
import { FONTS } from '../../../../theme/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';

const rewardsData = [
  {
    id: '1',
    name: 'Emma Johnson',
    status: 'Joined',
    bonus: 'Sign-up Bonus',
    amount: '$5',
    right: 'Waiting',
  },
  {
    id: '2',
    name: 'David',
    status: 'Pending',
    bonus: 'Sign-up Bonus',
    amount: '$5',
    right: 'Jul 25',
  },
  {
    id: '3',
    name: 'Smith',
    status: 'Joined',
    bonus: 'Sign-up Bonus',
    amount: '$5',
    right: 'Waiting',
  },
  {
    id: '4',
    name: 'jimmy',
    status: 'Joined',
    bonus: 'Action Bonus',
    amount: '$5',
    right: 'Waiting',
  },
  {
    id: '5',
    name: 'Jonny',
    status: 'Joined',
    bonus: 'Sign-up Bonus',
    amount: '$5',
    right: 'Waiting',
  },
];

const MyRewardsScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <View style={styles.rewardItem}>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.row}>
          <Ionicons
            name={item.status === 'Joined' ? 'checkmark-circle' : 'time'}
            size={14}
            color={
              item.status === 'Joined'
                ? BASE_COLORS.GREEN
                : BASE_COLORS.TEXT_INPUT_FIELD
            }
          />
          <Text style={styles.status}>{item.status}</Text>
        </View>
        <Text style={styles.bonus}>{item.bonus}</Text>
      </View>
      <View style={styles.rightSection}>
        <Text style={styles.amount}>{item.amount}</Text>
        <Text style={styles.rightText}>{item.right}</Text>
      </View>
    </View>
  );

  return (
    <AuthWrapper>
      <MyBookingHeader
        title="My Rewards"
        onBackPress={() => navigation.goBack()}
      />

      <View style={styles.earnedBox}>
        <Text style={styles.earnedText}>$5 Earned So Far!</Text>
        <Text style={styles.subText}>You’ve invited 5 of 10 friends</Text>
        <Text style={styles.subText}>invite 5 more to unlock $50 bonus</Text>
      </View>

      <Text style={styles.historyTitle}>Reward History</Text>

      <FlatList
        data={rewardsData}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 80 }}
      />

      {/* Invite MORE */}
      {/*  <CustomButton
          label="Invite More Friends"
          onPress={() => navigation.navigate('null')}
          style={{
            marginHorizontal: 4,
            marginBottom: 10,
            height: 54,
          }}
          textStyle={{ fontSize: 14, fontFamily: FONTS.MEDIUM }}
        /> */}
      <CustomButton
        label="Invite More Friends"
        onPress={() => navigation.navigate('null')}
        style={styles.inviteButton}
        textStyle={styles.inviteButtonText}
      />
    </AuthWrapper>
  );
};

const styles = StyleSheet.create({
  earnedBox: {
    alignItems: 'center',
    marginVertical: 10,
  },
  earnedText: {
    fontFamily: FONTS.BOLD,
    fontSize: 26,
    color: 'red',
  },
  subText: {
    fontFamily: FONTS.REGULAR,
    fontSize: 16,
    color: BASE_COLORS.BLACK,
  },
  historyTitle: {
    fontFamily: FONTS.BOLD,
    fontSize: 18,
    marginVertical: 8,
    marginLeft: 15,
    color: BASE_COLORS.BLACK,
  },
  rewardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: BASE_COLORS.BORDER_COLOR,
    backgroundColor: BASE_COLORS.WHITE,
  },
  name: {
    fontFamily: FONTS.MEDIUM,
    fontSize: 14,
    color: BASE_COLORS.BLACK,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  status: {
    fontFamily: FONTS.REGULAR,
    fontSize: 12,
    marginLeft: 4,
    color: BASE_COLORS.TEXT_INPUT_FIELD,
  },
  bonus: {
    fontFamily: FONTS.REGULAR,
    fontSize: 12,
    color: BASE_COLORS.TEXT_INPUT_FIELD,
  },
  rightSection: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  amount: {
    fontFamily: FONTS.BOLD,
    fontSize: 14,
    color: BASE_COLORS.BLACK,
  },
  rightText: {
    fontFamily: FONTS.REGULAR,
    fontSize: 12,
    color: BASE_COLORS.TEXT_INPUT_FIELD,
  },
  inviteButton: {
    marginTop: -50,
    marginBottom: 1, // 👈 list ke kareeb rakha
    height: 50,
    backgroundColor: 'red',
  },
  inviteButtonText: {
    fontSize: 14,
    fontFamily: FONTS.MEDIUM,
    color: BASE_COLORS.WHITE,
  },
});

export default MyRewardsScreen;
