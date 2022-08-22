import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  BackHandler,
  ToastAndroid,
} from "react-native";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { balanceActions } from "../balance/balanceSlice";
import { ticketTransactionActions } from "../ticketTransactionList/ticketTransactionSlice";
import { storeBalance, storeTickets } from "../../helper/helpers";
import { nanoid } from "nanoid/non-secure";

const TicketInput = ({ navigation }) => {
  const dispatch = useDispatch();
  const balance = useSelector((state) => state.balance.value);
  const ticketTransactionList = useSelector(
    (state) => state.ticketTransactionList.ticketList
  );

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackPress);
  }, []);

  const formatDate = () => {
    const date = new Date();
    return dayjs(date).format("DD.MM.YYYY");
  };

  const handleTicketPrice30 = () => {
    const expense = 4;

    const ticket = {
      id: nanoid(),
      title: "POJEDINAČNA KARTA",
      type: "30 MINUTA",
      date: formatDate(),
      primaryColor: "#EFDAE4",
      secondaryColor: "#F4E4F0",
      price: 4,
      expense: true,
    };

    // If balance is lower than expense show toast, else save ticket
    if (balance < expense) {
      ToastAndroid.show("Nedovoljan iznos", ToastAndroid.SHORT);
    } else {
      dispatch(ticketTransactionActions.addToList(ticket));
      dispatch(balanceActions.removeFromBalance(expense));

      // Save to async storage
      storeBalance(balance - expense);
      storeTickets([ticket, ...ticketTransactionList]);
    }
  };

  const handleTicketPrice60 = () => {
    const expense = 7;

    const ticket = {
      id: nanoid(),
      title: "POJEDINAČNA KARTA",
      type: "60 MINUTA",
      date: formatDate(),
      primaryColor: "#DAEFE0",
      secondaryColor: "#E4F4EB",
      price: 7,
      expense: true,
    };

    // If balance is lower than expense show toast, else save ticket
    if (balance < expense) {
      ToastAndroid.show("Nedovoljan iznos", ToastAndroid.SHORT);
    } else {
      dispatch(ticketTransactionActions.addToList(ticket));
      dispatch(balanceActions.removeFromBalance(expense));

      // Save to async storage
      storeBalance(balance - expense);
      storeTickets([ticket, ...ticketTransactionList]);
    }
  };

  const handleTicketPrice90 = () => {
    const expense = 10;

    const ticket = {
      id: nanoid(),
      title: "POJEDINAČNA KARTA",
      type: "90 MINUTA",
      date: formatDate(),
      primaryColor: "#D8E9EF",
      secondaryColor: "#E4EFF4",
      price: 10,
      expense: true,
    };

    // If balance is lower than expense show toast, else save ticket
    if (balance < expense) {
      ToastAndroid.show("Nedovoljan iznos", ToastAndroid.SHORT);
    } else {
      dispatch(ticketTransactionActions.addToList(ticket));
      dispatch(balanceActions.removeFromBalance(expense));

      // Save to async storage
      storeBalance(balance - expense);
      storeTickets([ticket, ...ticketTransactionList]);
    }
  };

  const handleAddFunds = () => {
    navigation.navigate("AddFunds");
  };

  const handleBackPress = () => {
    navigation.goBack("HomeScreen");
    return true;
  };

  return (
    <View style={styles.container}>
      <View style={styles.topButtonContainer}>
        <TouchableOpacity
          style={[styles.priceButton, { backgroundColor: "#EFDAE4" }]}
          onPress={handleTicketPrice30}
        >
          <Text style={styles.topButtonText}>4,00 kn</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.priceButton, { backgroundColor: "#DAEFE0" }]}
          onPress={handleTicketPrice60}
        >
          <Text style={styles.topButtonText}>7,00 kn</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.priceButton,
            { backgroundColor: "#DAE9EF", marginRight: 0 },
          ]}
          onPress={handleTicketPrice90}
        >
          <Text style={styles.topButtonText}>10,00 kn</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomButtonCointainer}>
        <TouchableOpacity
          style={styles.addResourcesButton}
          onPress={handleAddFunds}
        >
          <Text style={styles.bottomButtonText}>Dodaj sredstva</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "95%",
    borderRadius: 6,
    padding: 10,
    marginTop: 10,
  },
  topButtonContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    flex: 1,
    width: "100%",
  },
  priceButton: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: 60,
    borderRadius: 6,
    marginRight: 5,
  },
  topButtonText: {
    fontSize: 16,
    fontWeight: "700",
  },
  bottomButtonCointainer: {
    width: "100%",
  },
  addResourcesButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#181818",
    height: 60,
    borderRadius: 6,
  },
  bottomButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});

export default TicketInput;
