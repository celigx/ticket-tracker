import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

import Balance from "../feature/balance/Balance";
import TicketTransactionList from "../feature/ticketTransactionList/TicketTransactionList";
import TicketInput from "../feature/ticketInput/TicketInput";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Balance />
      <TicketTransactionList navigation={navigation} />
      <TicketInput navigation={navigation} />
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

export default HomeScreen;
