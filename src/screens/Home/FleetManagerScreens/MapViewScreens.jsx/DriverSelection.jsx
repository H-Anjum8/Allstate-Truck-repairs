import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CustomTextInput from '../../../../components/CustomTextInput';

const DriverSelection = () => {
  return (
    <SafeAreaView style={styles.container}>
      <CustomTextInput
        style={styles.input}
        placeholder={`Search ${activeTab}...`}
        placeholderTextColor={BASE_COLORS.GRAY}
        value={search}
        onChangeText={setSearch}
        leftIcon={
          <Ionicons
            name="search"
            size={18}
            color={BASE_COLORS.SECONDARY}
            style={{ marginRight: 6 }}
          />
        }
        containerStyle={styles.inputContainer}
        textInputStyle={styles.inputText}
      />
    </SafeAreaView>
  );
};

export default DriverSelection;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
