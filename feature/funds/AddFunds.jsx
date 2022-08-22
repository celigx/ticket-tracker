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
import { ticketTransactionActions } from "../ticketTransactionList/ticketTransactionSlice";
import { storeBalance, storeTickets } from "../../helper/helpers";
import { nanoid } from "nanoid/non-secure";

const AddFunds = ({ navigation }) => {
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
      navigation.goBack();
      setValue("");

      // Save to async storage
      storeBalance(Number(value) + balance);
      storeTickets([ticket, ...ticketTransactionList]);
    } else {
      ToastAndroid.show("Molimo unesite pravilan iznos", ToastAndroid.SHORT);
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
        onSubmitEditing={handleAddFunds}
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

export default AddFunds;
