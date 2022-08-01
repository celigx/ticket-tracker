import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Balance from "./feature/balance/Balance";
import Funds from "./feature/funds/Funds";
import TicketTransactionList from "./feature/ticketTransactionList/TicketTransactionList";
import TicketInput from "./feature/ticketInput/TicketInput";

import { balanceActions } from "./feature/balance/balanceSlice";
import { ticketTransactionActions } from "./feature/ticketTransactionList/ticketTransactionSlice";

export default function App() {
  const dispatch = useDispatch();

  const homeScreen = useSelector((state) => state.ticketInput.homeScreen);
  const balance = useSelector((state) => state.balance.value);
  const ticketTransactionList = useSelector(
    (state) => state.ticketTransactionList.ticketList
  );

  useEffect(() => {
    getData();
  }, []);

  // Get data from async storage
  const getData = async () => {
    try {
      const getBalance = await AsyncStorage.getItem("@balance");
      const parseBalance = JSON.parse(getBalance);

      const getTickets = await AsyncStorage.getItem("@tickets");
      const parseTickets = JSON.parse(getTickets);

      if (parseBalance !== null) {
        dispatch(balanceActions.editBalance(parseBalance));
        dispatch(ticketTransactionActions.getList(parseTickets));
      } else {
        dispatch(balanceActions.editBalance(balance));
        dispatch(ticketTransactionActions.getList(ticketTransactionList));
      }
      // console.log("getData", parseTickets);
    } catch (e) {
      console.log("Async getTickets error", e);
    }
  };

  return homeScreen ? (
    <View style={styles.container}>
      <Balance />
      <TicketTransactionList />
      <TicketInput />
      <StatusBar style="dark" />
    </View>
  ) : (
    <View style={[styles.container, { paddingVertical: 0 }]}>
      <Funds />
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
});
