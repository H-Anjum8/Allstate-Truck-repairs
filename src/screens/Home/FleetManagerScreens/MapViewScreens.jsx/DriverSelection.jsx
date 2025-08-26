// import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
// import React, { useState } from 'react';
// import CustomTextInput from '../../../../components/CustomTextInput';
// import BASE_COLORS from '../../../../utils/colors';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// const DriverSelection = () => {
//   const [search, setSearch] = useState();
//   return (
//     <SafeAreaView style={styles.container}>
//       <CustomTextInput
//         style={styles.input}
//         // placeholder={`Search ${activeTab}...`}
//         placeholderTextColor={BASE_COLORS.GRAY}
//         value={search}
//         onChangeText={setSearch}
//         leftIcon={
//           <Ionicons
//             name="search"
//             size={18}
//             color={BASE_COLORS.SECONDARY}
//             style={{ marginRight: 6 }}
//           />
//         }
//         containerStyle={styles.inputContainer}
//         textInputStyle={styles.inputText}
//       />
//     </SafeAreaView>
//   );
// };

// export default DriverSelection;

// const styles = StyleSheet.create({
//   container: { flex: 1 },
// });

import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomHeader from '../../../../components/CustomHeaders';
import BASE_COLORS from '../../../../utils/colors';
import { useNavigation } from '@react-navigation/native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import MyBookingHeader from '../../../../components/DashboardComponents/MyBookingHeader';
import CustomTextInput from '../../../../components/CustomTextInput';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const dummyDrivers = [
  {
    id: '1',
    name: 'George Franklin',
    email: 'George@gmail.com',
    phone: '+1 213 587 7890',
    vehicle: 'Kenworth KX-1600',
  },
  {
    id: '2',
    name: 'Michael Smith',
    email: 'michael@gmail.com',
    phone: '+1 987 654 3210',
    vehicle: 'Volvo FH16',
  },
];

const DriverSelection = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [filteredDrivers, setFilteredDrivers] = useState([]);

  const handleSearch = text => {
    setSearch(text);
    if (text.trim() === '') {
      setFilteredDrivers([]);
    } else {
      const results = dummyDrivers.filter(driver =>
        driver.name.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredDrivers(results);
    }
  };

  const renderDriver = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <View style={styles.textInfo}>
        <View style={styles.row}>
          <FontAwesome5 name="bus" size={15} color={BASE_COLORS.SECONDARY} />

          <Text style={styles.text}>{item.vehicle}</Text>
        </View>
        <View style={styles.row}>
          <Ionicons name="mail-outline" size={18} color="red" />
          <Text style={styles.text}>{item.email}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <Ionicons name="call-outline" size={18} color="red" />
        <Text style={styles.text}>{item.phone}</Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Suggest Trip</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <MyBookingHeader
        style={{ marginBottom: -12 }}
        title="Driver"
        onBackPress={() => navigation.goBack()}
      />

      {/* Search Input */}
      <View style={styles.searchBox}>
        <CustomTextInput
          style={styles.input}
          placeholder={`Search `}
          placeholderTextColor={BASE_COLORS.GRAY}
          value={search}
          onChangeText={handleSearch}
          leftIcon={
            <Ionicons
              name="search"
              size={18}
              color={BASE_COLORS.GRAY}
              style={{ marginRight: 6 }}
            />
          }
          inputContainerStyle={{
            borderWidth: 0,
            borderColor: BASE_COLORS.WHITE,
          }}
        />

        {search.length > 0 && (
          <TouchableOpacity onPress={() => handleSearch('')}>
            <Ionicons
              name="close"
              size={20}
              color="#999"
              style={{ position: 'absolute', top: -14, right: 10 }}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Driver List / No Driver */}
      {filteredDrivers.length === 0 ? (
        <View style={styles.noDriverBox}>
          <Text style={styles.noDriverText}>No Driver Selected</Text>
        </View>
      ) : (
        <FlatList
          data={filteredDrivers}
          keyExtractor={item => item.id}
          renderItem={renderDriver}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BASE_COLORS.WHITE },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  headerText: { fontSize: 18, fontWeight: '600', marginLeft: 10 },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    marginTop: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    backgroundColor: BASE_COLORS.WHITE,
    paddingTop: 2,

    // ✅ iOS shadow
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,

    // ✅ Android shadow
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',

    gap: 2,
  },
  textInfo: {
    flexDirection: 'row',
    gap: 20,
  },
  vehicle: {
    fontSize: 10,
    backgroundColor: 'yellow',
  },
  noDriverBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDriverText: { fontSize: 16, color: BASE_COLORS.GRAY },
  card: {
    backgroundColor: BASE_COLORS.WHITE,
    marginHorizontal: 15,
    marginTop: 18,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 12,
    shadowColor: BASE_COLORS.BLACK,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  name: { fontSize: 12, fontWeight: '700' },
  text: { fontSize: 9, color: BASE_COLORS.GRAY, marginTop: 2 },
  button: {
    backgroundColor: BASE_COLORS.PRIMARY,
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: { color: BASE_COLORS.WHITE, fontSize: 10 },
});

export default DriverSelection;
