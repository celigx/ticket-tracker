import { StyleSheet, KeyboardAvoidingView, TextInput, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from "dayjs";

const AddFunds = ({ funds, setFunds, balance, setBalance, ticketTransactionList, setTicketTransactionList, setHomeScreen, objId, editFunds, setEditFunds }) => {
  
  const formatDate = () => {
    const date = new Date();
    return dayjs(date).format('DD.MM.YYYY')
  }

  const handleAddFunds = () => {
    if (funds == funds.match("^[1-9]+[0-9]*$")) {
      const ticket = ticketTransactionList.slice();

      ticket.unshift({
        id: Math.random().toString(16).substring(2),
        title: 'VRIJEDNOSNA KARTA',
        type: 'NADOPLATA',
        date: formatDate(),
        primaryColor: '#BBC2C4',
        secondaryColor: '#D8DDDF',
        price: Number(funds),
        expense: false
      })
      
      setTicketTransactionList(ticket)
      setBalance(Number(funds) + balance)
      setFunds('')
      setHomeScreen(true)

      // Save to async storage
      storeBalance(Number(funds) + balance)
      storeTickets(ticket)
    } else {
      ToastAndroid.show('Molimo unesite pravilan iznos', ToastAndroid.SHORT);
      setFunds('');
    }
  }

  const handleEditFunds = () => {
    if (funds == funds.match("^[1-9]+[0-9]*$")) {
      const newData = [...ticketTransactionList]
      const objIndex = ticketTransactionList.findIndex(e => e.id === objId)
      
      newData[objIndex].price = Number(funds)

      // Filter all true expense objects from an array
      const getExpense = ticketTransactionList.filter(e => e.expense === true)
      // Get all prices that have expense true
      const getExpensePrice = getExpense.map(e => e.price)
      // Sum price
      const sumExpense = getExpensePrice.reduce((a, b) => a + b)
      console.log('sumExpense', sumExpense);

      // Filter all false expense objects from an array
      const getFunds = ticketTransactionList.filter(e => e.expense === false)
      // Get all prices that have expense false
      const getFundsPrice = getFunds.map(e => e.price)
      // Sum price
      const sumFunds = getFundsPrice.reduce((a, b) => a + b)
      
      setFunds('')
      setBalance(sumFunds - sumExpense)

      storeBalance(sumFunds - sumExpense)
      storeTickets(newData)

      setHomeScreen(true)
      setEditFunds(false)
    } else {
      ToastAndroid.show('Iznos', ToastAndroid.SHORT);
      setFunds('');
    }
  }
  console.log('edit', editFunds);

  const prevIndex = ticketTransactionList.findIndex(item => item.id === objId)
  // Get array of ticket funds
  const type = ticketTransactionList.map(x => x.expense)
  console.log('prevIndex', prevIndex);
  console.log('type', type);
  console.log('funds', type[prevIndex]);

  // Save balance to async storage
  const storeBalance = async (value) => {
    try {
      await AsyncStorage.setItem('@balance', JSON.stringify(value))
  
      console.log('storeBalance', value);
    } catch (e) {
      console.log('Async storeBalance error', e)
    }
  }

  // Save ticket list to async storage
  const storeTickets = async (value) => {
    try {
      await AsyncStorage.setItem('@tickets', JSON.stringify(value))
  
      console.log('storeTickets', value);
    } catch (e) {
      console.log('Async storeData error', e)
    }
  }

  return (
    <KeyboardAvoidingView style={[styles.container, styles.keyboardContainer]}>
      <TextInput
        style={styles.textInput}
        placeholder="Iznos"
        onChangeText={text => setFunds(text)}
        value={funds}
        keyboardType="number-pad"
        returnKeyType="done"
        enablesReturnKeyAutomatically={true}
        onSubmitEditing={editFunds ? handleEditFunds : handleAddFunds}
        autoFocus={true}
      />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F1E9",
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    fontSize: 22,
    fontWeight: '600',
    paddingLeft: 10,
    borderColor: "#DDDDDD",
    borderWidth: 1,
    height: 60
  },
  keyboardContainer: {
    width: "100%",
    justifyContent: "flex-end"
  },
});

export default AddFunds;