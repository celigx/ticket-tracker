import {
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  ToastAndroid,
} from "react-native";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { balanceActions } from "../balance/balanceSlice";
import { useState } from "react";
import { ticketInputActions } from "../ticketInput/ticketInputSlice";
import { ticketTransactionActions } from "../ticketTransactionList/ticketTransactionSlice";
import { storeBalance, storeTickets } from "../../helper/helpers";
import { nanoid } from "nanoid/non-secure";

const Funds = () => {
  const [value, setValue] = useState("");

  const dispatch = useDispatch();
  const balance = useSelector((state) => state.balance.value);
  const ticketTransactionList = useSelector(
    (state) => state.ticketTransactionList.ticketList
  );
  const objId = useSelector((state) => state.ticketTransactionList.objId);
  const editFunds = useSelector((state) => state.ticketInput.editScreen);

  const formatDate = () => {
    const date = new Date();
    return dayjs(date).format("DD.MM.YYYY");
  };

  const handleAddFunds = () => {
    if (value == value.match("^[1-9]+[0-9]*$")) {
      const ticket = {
        id: nanoid(),
        title: "VRIJEDNOSNA KARTA",
        type: "NADOPLATA",
        date: formatDate(),
        primaryColor: "#BBC2C4",
        secondaryColor: "#D8DDDF",
        price: Number(value),
        expense: false,
      };

      dispatch(balanceActions.addToBalance(Number(value)));
      dispatch(ticketTransactionActions.addToList(ticket));
      dispatch(ticketInputActions.homeScreen(true));
      setValue("");

      // Save to async storage
      storeBalance(Number(value) + balance);
      storeTickets([ticket, ...ticketTransactionList]);
    } else {
      ToastAndroid.show("Molimo unesite pravilan iznos", ToastAndroid.SHORT);
      setValue("");
    }
  };

  const handleEditFunds = () => {
    if (value == value.match("^[1-9]+[0-9]*$")) {
      const newData = [...ticketTransactionList];
      const objIndex = ticketTransactionList.findIndex((el) => el.id === objId);

      // Edit price value in object
      const editObject = newData.map((object) => {
        if (object.id === newData[objIndex].id) {
          return { ...object, price: Number(value) };
        }
        return object;
      });

      // Filter all true expense objects from an array
      const getExpense = editObject.filter((el) => el.expense === true);
      // Get all prices that have expense true
      const getExpensePrice = getExpense.map((el) => el.price);
      // Sum price
      const sumExpense = getExpensePrice.reduce((a, b) => a + b);

      // Filter all false expense objects from an array
      const getFunds = editObject.filter((el) => el.expense === false);
      // Get all prices that have expense false
      const getFundsPrice = getFunds.map((el) => el.price);
      // Sum price
      const sumFunds = getFundsPrice.reduce((a, b) => a + b);

      const newBalance = sumFunds - sumExpense;

      dispatch(balanceActions.editBalance(newBalance));
      dispatch(ticketTransactionActions.editList(editObject));
      dispatch(ticketInputActions.homeScreen(true));
      dispatch(ticketInputActions.editScreen(false));
      setValue("");

      // Async Storage
      storeBalance(newBalance);
      storeTickets(editObject);
    } else {
      ToastAndroid.show("Iznos", ToastAndroid.SHORT);
      setValue("");
    }
  };

  const prevIndex = ticketTransactionList.findIndex(
    (item) => item.id === objId
  );
  // Get array of ticket funds
  const type = ticketTransactionList.map((el) => el.expense);

  return (
    <KeyboardAvoidingView style={[styles.container, styles.keyboardContainer]}>
      <TextInput
        style={styles.textInput}
        placeholder="Iznos"
        onChangeText={(input) => setValue(input)}
        value={value}
        keyboardType="number-pad"
        returnKeyType="done"
        enablesReturnKeyAutomatically={true}
        onSubmitEditing={editFunds ? handleEditFunds : handleAddFunds}
        autoFocus={true}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F1E9",
  },
  textInput: {
    backgroundColor: "#FFFFFF",
    fontSize: 22,
    fontWeight: "600",
    paddingLeft: 10,
    borderColor: "#DDDDDD",
    borderWidth: 1,
    height: 60,
  },
  keyboardContainer: {
    width: "100%",
    justifyContent: "flex-end",
  },
});

export default Funds;
