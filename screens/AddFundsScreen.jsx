import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

import AddFunds from "../feature/funds/AddFunds";

const AddFundsScreen = ({ navigation }) => {
  return (
    <View style={[styles.container, { paddingVertical: 0 }]}>
      <AddFunds navigation={navigation} />
      <StatusBar style="dark" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
});

export default AddFundsScreen;
