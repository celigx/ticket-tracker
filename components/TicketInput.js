import { StyleSheet, View, Text, TouchableOpacity, BackHandler, ToastAndroid } from "react-native";
import dayjs from "dayjs";
import { useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const TicketInput = ({ balance, setBalance, ticketTransactionList, setTicketTransactionList, setHomeScreen }) => {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress)
    getData()
  }, [])
 
  const formatDate = () => {
    const date = new Date();
    return dayjs(date).format('DD.MM.YYYY')
  }

  const handleTicketPrice30 = () => {
    const expense = 4;

    const ticket = ticketTransactionList.slice();
    ticket.unshift({
      id: Math.random().toString(16).substring(2),
      time: '30',
      date: formatDate(),
      primaryColor: '#EFDAE4',
      secondaryColor: '#F4E4F0',
      price: 4
    })

    // If balance is lower than expense show toast, else save ticket
    if (balance < expense) {
      ToastAndroid.show('Nedovoljan iznos', ToastAndroid.SHORT);
    } else {
      setTicketTransactionList(ticket)
      setBalance(balance - expense)
      
      // Save to async storage
      storeBalance(balance - expense)
      storeTickets(ticket)
    }
  }

  const handleTicketPrice60 = () => {
    const expense = 7;

    const ticket = ticketTransactionList.slice();
    ticket.unshift({
      id: Math.random().toString(16).substring(2),
      time: '60',
      date: formatDate(),
      primaryColor: '#DAEFE0',
      secondaryColor: '#E4F4EB',
      price: 7
    })

    // If balance is lower than expense show toast, else save ticket
    if (balance < expense) {
      ToastAndroid.show('Nedovoljan iznos', ToastAndroid.SHORT);
    } else {
      setTicketTransactionList(ticket)
      setBalance(balance - expense)
      
      // Save to async storage
      storeBalance(balance - expense)
      storeTickets(ticket)
    }
  }

  const handleTicketPrice90 = () => {
    const expense = 10;

    const ticket = ticketTransactionList.slice();
    ticket.unshift({
      id: Math.random().toString(16).substring(2),
      time: '90',
      date: formatDate(),
      primaryColor: '#D8E9EF',
      secondaryColor: '#E4EFF4',
      price: 10
    })

    // If balance is lower than expense show toast, else save ticket
    if (balance < expense) {
      ToastAndroid.show('Nedovoljan iznos', ToastAndroid.SHORT);
    } else {
      setTicketTransactionList(ticket)
      setBalance(balance - expense)
      
      // Save to async storage
      storeBalance(balance - expense)
      storeTickets(ticket)
    }
  }

  const handleAddFunds = () => {
    setHomeScreen(false)
  }

  const handleBackPress = () => {
    setHomeScreen(true)
    return true
  }

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
  
  // Get data from async storage
  const getData = async () => {
    try {
      const getBalance = await AsyncStorage.getItem('@balance')
      const parseBalance = JSON.parse(getBalance)
  
      const getTickets = await AsyncStorage.getItem('@tickets')
      const parseTickets = JSON.parse(getTickets)
  
      if (parseBalance !== null) {
        setBalance(parseBalance)
        setTicketTransactionList(parseTickets)
      } else {
        setBalance(balance)
        setTicketTransactionList(setTicketTransactionList)
      }
      
      console.log('getData', parseBalance);
    } catch(e) {
      console.log('Async getTickets error', e)
    }
  }

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
          style={[styles.priceButton, { backgroundColor: "#DAE9EF", marginRight: 0 }]}
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
          <Text style={styles.bottomButtonText}>
            Dodaj sredstva
          </Text>
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
  }
});

export default TicketInput;