import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import AuthWrapper from '../../../../components/AuthWrapper';
import CustomHeader from '../../../../components/CustomHeaders';
import BASE_COLORS from '../../../../utils/colors';
import { FONTS } from '../../../../theme/fonts';
import { IMAGES } from '../../../../utils/appAssets';
import { launchImageLibrary } from 'react-native-image-picker';

const ChatScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { name, image } = route.params || {};
  const [messages, setMessages] = useState([
    { id: 1, text: 'Lorem ipsum dolor sit amet consectetur.', type: 'sent' },
    {
      id: 2,
      text: 'Lorem ipsum dolor sit amet consectetur.',
      type: 'received',
    },
    { id: 3, text: 'Lorem ipsum dolor sit amet consectetur.', type: 'sent' },
    {
      id: 4,
      text: 'Lorem ipsum dolor sit amet consectetur.',
      type: 'received',
    },
    { id: 5, text: 'Lorem ipsum dolor sit amet consectetur.', type: 'sent' },
    {
      id: 6,
      text: 'Lorem ipsum dolor sit amet consectetur.',
      type: 'received',
    },
  ]);
  const [inputText, setInputText] = useState('');

  // send message handler
  const handleSend = () => {
    if (inputText.trim() === '') return;
    const newMessage = {
      id: messages.length + 1,
      text: inputText,
      type: 'sent',
    };
    setMessages([...messages, newMessage]);
    setInputText('');
  };

  // plus button -> open gallery
  const handlePlusPress = async () => {
    try {
      const result = await launchImageLibrary({ mediaType: 'photo' });
      if (result.assets && result.assets.length > 0) {
        Alert.alert('Image Selected', result.assets[0].fileName || 'Image');
      }
    } catch (error) {
      console.log('Gallery Error:', error);
    }
  };

  // menu 3 dots
  const handleMenuPress = () => {
    Alert.alert('Menu', 'More options clicked');
  };

  return (
    <AuthWrapper>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <CustomHeader
            leftIcon={
              <Ionicons
                name="chevron-back"
                size={22}
                color={BASE_COLORS.BLACK}
              />
            }
            onLeftPress={() => navigation.goBack()}
          />
          <Image source={image} style={styles.avatar} />
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{name || 'Unknown'}</Text>
            <Text style={styles.online}>Online</Text>
          </View>
          <TouchableOpacity onPress={handleMenuPress}>
            <Ionicons
              name="ellipsis-vertical"
              size={22}
              color={BASE_COLORS.SECONDARY}
            />
          </TouchableOpacity>
        </View>

        {/* Messages */}
        <ScrollView contentContainerStyle={styles.messages}>
          {messages.map(msg => (
            <View
              key={msg.id}
              style={[
                styles.messageContainer,
                msg.type === 'sent'
                  ? styles.sentContainer
                  : styles.receivedContainer,
              ]}
            >
              {msg.type === 'received' && (
                <Image source={IMAGES.USER2} style={styles.messageAvatar} />
              )}
              <View
                style={[
                  styles.bubble,
                  msg.type === 'sent'
                    ? styles.sentBubble
                    : styles.receivedBubble,
                ]}
              >
                <Text
                  style={
                    msg.type === 'sent' ? styles.sentText : styles.receivedText
                  }
                >
                  {msg.text}
                </Text>
              </View>
              {msg.type === 'sent' && (
                <Image source={IMAGES.USER1} style={styles.messageAvatar} />
              )}
            </View>
          ))}
        </ScrollView>

        {/* Input Bar */}
        <View style={styles.inputBar}>
          <TouchableOpacity style={styles.plusButton} onPress={handlePlusPress}>
            <Ionicons name="add" size={26} color={BASE_COLORS.WHITE} />
          </TouchableOpacity>
          <TextInput
            style={styles.textInput}
            placeholder="Type a message here..."
            placeholderTextColor={BASE_COLORS.TEXT_INPUT_FIELD}
            value={inputText}
            onChangeText={setInputText}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Ionicons name="send" size={22} color={BASE_COLORS.WHITE} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </AuthWrapper>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BASE_COLORS.WHITE },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
    marginLeft: -35,
  },
  name: {
    fontSize: 16,
    fontFamily: FONTS.SF_PRO_DISPLAY_BOLD,
    color: BASE_COLORS.BLACK,
  },
  online: {
    fontSize: 10,
    color: BASE_COLORS.SECONDARY,
    fontFamily: FONTS.SF_PRO_DISPLAY_REGULAR,
    fontWeight: 'bold',
  },

  messages: { padding: 10 },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 4,
  },
  sentContainer: { justifyContent: 'flex-end' },
  receivedContainer: { justifyContent: 'flex-start' },
  messageAvatar: { width: 28, height: 28, borderRadius: 18 },
  bubble: {
    maxWidth: '70%',
    padding: 10,
    borderRadius: 15,
    marginHorizontal: 6,
  },
  sentBubble: {
    backgroundColor: BASE_COLORS.SECONDARY,
    borderTopRightRadius: 0,
  },
  receivedBubble: { backgroundColor: BASE_COLORS.CHAT, borderTopLeftRadius: 0 },
  sentText: {
    color: BASE_COLORS.WHITE,
    fontFamily: FONTS.SF_PRO_DISPLAY_REGULAR,
  },
  receivedText: {
    color: BASE_COLORS.BLACK,
    fontFamily: FONTS.SF_PRO_DISPLAY_REGULAR,
  },

  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    borderTopWidth: 1,
    borderTopColor: BASE_COLORS.BORDER_COLOR,
  },
  plusButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: BASE_COLORS.SECONDARY,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  textInput: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 12,
    backgroundColor: BASE_COLORS.CHAT,
    fontSize: 14,
    marginRight: 6,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: BASE_COLORS.SECONDARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
