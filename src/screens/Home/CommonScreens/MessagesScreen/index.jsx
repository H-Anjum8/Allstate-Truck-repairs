import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AuthWrapper from '../../../../components/AuthWrapper';
import BASE_COLORS from '../../../../utils/colors';
import { FONTS } from '../../../../theme/fonts';
import { IMAGES } from '../../../../utils/appAssets';

const messagesData = [
  {
    id: '1',
    name: 'John Deo',
    message: 'Hello Jonas',
    time: 'Now',
    image: IMAGES.USER1,
    unread: true,
  },
  {
    id: '2',
    name: 'Angela',
    message: 'Hello Jonas',
    time: 'Now',
    image: IMAGES.USER2,
    unread: true,
  },
  {
    id: '3',
    name: 'Nicole',
    message: 'Lorem ipsum dolor sit amet consectetur.',
    time: '01:04 pm',
    image: IMAGES.USER3,
  },
  {
    id: '4',
    name: 'John Styles',
    message: 'Lorem ipsum dolor sit amet consectetur.',
    time: '02:54 pm',
    image: IMAGES.USER4,
  },
  {
    id: '5',
    name: 'Saul White',
    message: 'Lorem ipsum dolor sit amet consectetur.',
    time: '06:25 am',
    image: IMAGES.USER5,
  },
  {
    id: '6',
    name: 'Michelle Turcotte',
    message: 'Lorem ipsum dolor sit amet consectetur.',
    time: 'yesterday',
    image: IMAGES.USER6,
  },
  {
    id: '7',
    name: 'Jane Deo',
    message: 'Lorem ipsum dolor sit amet consectetur.',
    time: 'yesterday',
    image: IMAGES.USER7,
  },
  {
    id: '8',
    name: 'Harry Cane',
    message: 'Lorem ipsum dolor sit amet consectetur.',
    time: 'yesterday',
    image: IMAGES.USER8,
  },
  {
    id: '9',
    name: 'Harry Cane2',
    message: 'Lorem ipsum dolor sit amet consectetur.',
    time: 'yesterday',
    image: IMAGES.USER8,
  },
];

const MessagesScreen = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');

  const filteredData = messagesData.filter(
    item =>
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.message.toLowerCase().includes(searchText.toLowerCase()),
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.messageRow}
      onPress={() =>
        navigation.navigate('chat_screen', {
          name: item.name,
          image: item.image,
        })
      }
    >
      <Image source={item.image} style={styles.profileImage} />
      <View style={styles.messageInfo}>
        <Text style={styles.nameText}>{item.name}</Text>
        <Text
          style={[
            styles.messageText,
            item.unread && { color: BASE_COLORS.SECONDARY },
          ]}
          numberOfLines={1}
        >
          {item.message}
        </Text>
      </View>
      <View style={styles.rightSection}>
        <Text style={styles.timeText}>{item.time}</Text>
        {item.unread && <View style={styles.unreadDot} />}
      </View>
    </TouchableOpacity>
  );

  return (
    <AuthWrapper>
      <View style={styles.container}>
        {/* Header */}
        <Text style={styles.headerTitle}>Messages</Text>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search-outline"
            size={moderateScale(18)}
            color={BASE_COLORS.GREY}
          />
          <TextInput
            placeholder="Search"
            placeholderTextColor={BASE_COLORS.GREY}
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Messages List */}
        <FlatList
          data={filteredData}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </AuthWrapper>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: moderateScale(18),
    fontFamily: FONTS.semiBold,
    textAlign: 'center',
    marginBottom: verticalScale(10),
    color: BASE_COLORS.BLACK,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BASE_COLORS.LIGHT_GREY,
    borderRadius: moderateScale(12),
    paddingHorizontal: moderateScale(10),
    height: verticalScale(40),
    marginBottom: verticalScale(15),
    borderWidth: 1,
    borderColor: BASE_COLORS.GRAY,
  },
  searchInput: {
    flex: 1,
    fontSize: moderateScale(14),
    fontFamily: FONTS.regular,
    marginLeft: moderateScale(8),
    color: BASE_COLORS.BLACK,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(10),
    borderBottomWidth: 0.5,
    borderBottomColor: BASE_COLORS.BORDER_COLOR,
  },
  profileImage: {
    width: moderateScale(45),
    height: moderateScale(45),
    borderRadius: moderateScale(22.5),
    marginRight: moderateScale(10),
  },
  messageInfo: {
    flex: 1,
  },
  nameText: {
    fontSize: moderateScale(14),
    fontFamily: FONTS.semiBold,
    color: BASE_COLORS.BLACK,
  },
  messageText: {
    fontSize: moderateScale(12),
    fontFamily: FONTS.regular,
    color: BASE_COLORS.TEXT_INPUT_FIELD,
    marginTop: verticalScale(2),
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  timeText: {
    fontSize: moderateScale(10),
    fontFamily: FONTS.regular,
    color: BASE_COLORS.TEXT_INPUT_FIELD,
  },
  unreadDot: {
    width: moderateScale(6),
    height: moderateScale(6),
    borderRadius: moderateScale(3),
    backgroundColor: BASE_COLORS.SECONDARY,
    marginTop: verticalScale(5),
  },
});

export default MessagesScreen;
