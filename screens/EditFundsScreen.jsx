import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

import EditFunds from "../feature/funds/EditFunds";

const EditFundsScreen = ({ navigation }) => {
  return (
    <View style={[styles.container, { paddingVertical: 0 }]}>
      <EditFunds navigation={navigation} />
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

export default EditFundsScreen;
