// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   StatusBar,
//   SafeAreaView,
//   Platform,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { isIOS } from '../../utils/helpers';
// import BASE_COLORS from '../../utils/colors';
// import { TextStyles, FONTS } from '../../theme/fonts';

// const CustomHeader = ({
//   // Welcome Section Props
//   welcomeText = 'Welcome',
//   username = 'User',
//   description = null,
//   showWelcomeText = false,
//   showUsername = false,
//   showDescription = false,
//   renderCustomWelcome = null,
//   renderCustomUsername = null,
//   renderCustomDescription = null,

//   // Title Props
//   title,
//   titleAlignment = 'center',
//   titleStyle,

//   // Icons
//   leftIcon,
//   rightIcon,
//   onLeftPress,
//   onRightPress,
//   rightIconStyle,

//   // Notification
//   hasNewNotifications = false,
//   notificationIconName = 'notifications',
//   notificationIconSize = 24,
//   notificationIconColor = BASE_COLORS.WHITE,
//   showNotificationIcon = false,

//   // Custom Center Component (like search bar)
//   centerComponent = null,

//   // Styling
//   containerStyle = {},
//   contentContainerStyle = {},
//   textContainerStyle = {},
//   welcomeTextStyle = {},
//   usernameTextStyle = {},
//   descriptionTextStyle = {},
//   notificationButtonStyle = {},
//   notificationBadgeStyle = {},

//   // Status Bar
//   showStatusBar = true,
//   statusBarColor = BASE_COLORS.PRIMARY,
//   statusBarStyle = 'light-content',
//   statusBarTranslucent = false,

//   // Header Layout
//   backgroundColor = BASE_COLORS.TRANSPARENT,
//   showShadow = false,
//   height = 506,
// }) => {
//   // Text alignment styles
//   const getTitleAlignmentStyle = () => {
//     switch (titleAlignment) {
//       case 'left':
//         return { textAlign: 'left', marginLeft: leftIcon ? 10 : 0 };
//       case 'right':
//         return { textAlign: 'right', marginRight: rightIcon ? 10 : 0 };
//       case 'center':
//       default:
//         return { textAlign: 'center' };
//     }
//   };

//   const getTitleContainerStyle = () => {
//     if (titleAlignment === 'left') return { flex: 1, alignItems: 'flex-start' };
//     if (titleAlignment === 'right') return { flex: 1, alignItems: 'flex-end' };
//     return { flex: 1, alignItems: 'center' };
//   };

//   return (
//     <SafeAreaView
//       style={[
//         styles.safeArea,
//         { backgroundColor },
//         showStatusBar ? null : { paddingTop: 0 },
//       ]}
//     >
//       {showStatusBar && (
//         <StatusBar
//           backgroundColor={statusBarColor}
//           barStyle={statusBarStyle}
//           translucent={statusBarTranslucent}
//         />
//       )}

//       <View
//         style={[
//           styles.container,
//           showShadow && styles.shadowEffect,
//           { backgroundColor, height },
//           containerStyle,
//         ]}
//       >
//         <View style={styles.headericons}>
//           {/* Left Icon */}
//           <View style={styles.sideContainer}>
//             {leftIcon && (
//               <TouchableOpacity
//                 style={styles.iconButton}
//                 onPress={onLeftPress}
//                 activeOpacity={0.7}
//                 disabled={!onLeftPress}
//               >
//                 {leftIcon}
//               </TouchableOpacity>
//             )}
//           </View>
//           {/* Right Icon / Notification */}
//           <View style={[styles.sideContainer, styles.rightSideContainer]}>
//             {showNotificationIcon ? (
//               <TouchableOpacity
//                 style={[styles.iconButton, notificationButtonStyle]}
//                 onPress={onRightPress}
//                 activeOpacity={0.7}
//               >
//                 <Ionicons
//                   name={notificationIconName}
//                   size={notificationIconSize}
//                   color={notificationIconColor}
//                 />
//                 {hasNewNotifications && (
//                   <View
//                     style={[styles.notificationBadge, notificationBadgeStyle]}
//                   />
//                 )}
//               </TouchableOpacity>
//             ) : rightIcon ? (
//               <TouchableOpacity
//                 style={[styles.iconButton, rightIconStyle]}
//                 onPress={onRightPress}
//                 activeOpacity={0.7}
//                 disabled={!onRightPress}
//               >
//                 {rightIcon}
//               </TouchableOpacity>
//             ) : null}
//           </View>
//         </View>

//         {/* Center Area */}
//         <View style={[styles.centerArea, getTitleContainerStyle()]}>
//           {centerComponent ? (
//             centerComponent
//           ) : title ? (
//             <Text
//               numberOfLines={1}
//               style={[styles.title, getTitleAlignmentStyle(), titleStyle]}
//             >
//               {title}
//             </Text>
//           ) : (
//             <View style={[styles.textContainer, textContainerStyle]}>
//               {renderCustomWelcome
//                 ? renderCustomWelcome()
//                 : showWelcomeText && (
//                     <Text style={[styles.welcomeText, welcomeTextStyle]}>
//                       {welcomeText}
//                     </Text>
//                   )}

//               {renderCustomUsername
//                 ? renderCustomUsername()
//                 : showUsername && (
//                     <Text style={[styles.usernameText, usernameTextStyle]}>
//                       {username}
//                     </Text>
//                   )}

//               {renderCustomDescription
//                 ? renderCustomDescription()
//                 : showDescription &&
//                   description && (
//                     <Text
//                       style={[styles.descriptionText, descriptionTextStyle]}
//                     >
//                       {description}
//                     </Text>
//                   )}
//             </View>
//           )}
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     backgroundColor: '#151B28',
//     paddingTop: isIOS ? 0 : StatusBar.currentHeight,
//   },
//   container: {
//     flexDirection: 'column',
//     // alignItems: 'center',
//     marginTop: 20,
//     paddingHorizontal: 16,
//   },
//   shadowEffect: {
//     ...Platform.select({
//       ios: {
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 3,
//       },
//       android: {
//         elevation: 4,
//       },
//     }),
//   },
//   sideContainer: {
//     width: 40,
//     height: 40,
//     justifyContent: 'center',
//     alignItems: 'flex-start',
//   },
//   rightSideContainer: {
//     alignItems: 'flex-end',
//   },
//   iconButton: {
//     minWidth: 40,
//     height: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   headericons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   centerArea: {
//     // marginTop: 80,
//     flex: 1,
//     paddingHorizontal: 6,
//     justifyContent: 'center',
//     // backgroundColor: 'red',
//   },
//   title: {
//     ...TextStyles.heading1,
//     color: BASE_COLORS.TEXT_INVERSE,
//   },
//   textContainer: {
//     flex: 1,
//     gap: 2,
//     marginTop: 10,
//   },
//   welcomeText: {
//     ...TextStyles.heading1,
//     color: BASE_COLORS.WHITE,
//     fontFamily: FONTS.MEDIUM,
//     fontSize: 20,
//   },
//   usernameText: {
//     ...TextStyles.heading1,
//     color: BASE_COLORS.PRIMARY,
//     // fontFamily: FONTS.MEDIUM,
//     // fontSize: 28,
//     marginTop: 20,
//     fontWeight: '500',
//     textAlign: 'left',
//   },
//   descriptionText: {
//     ...TextStyles.bodySmall,
//     color: BASE_COLORS.SECONDARY,
//     fontFamily: FONTS.REGULAR,
//     marginTop: 2,
//   },
//   notificationBadge: {
//     position: 'absolute',
//     top: 10,
//     right: 10,
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: BASE_COLORS.SECONDARY,
//   },
// });

// export default CustomHeader;
