import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const TicketInput = ({ balance, setBalance, ticketTransactionList, setTicketTransactionList }) => {

  const handleTicketPrice30 = () => {
    const expense = 4;

    const ticket = ticketTransactionList.slice();
    ticket.unshift({
      id: Math.random().toString(16).substring(2),
      time: '30',
      date: '18.05.2022',
      primaryColor: '#EFDAE4',
      secondaryColor: '#F4E4F0',
      price: 4
    })

    setTicketTransactionList(ticket)
    setBalance(balance - expense)
  }

  const handleTicketPrice60 = () => {
    const expense = 7;

    const ticket = ticketTransactionList.slice();
    ticket.unshift({
      id: Math.random().toString(16).substring(2),
      time: '60',
      date: '18.05.2022',
      primaryColor: '#DAEFE0',
      secondaryColor: '#E4F4EB',
      price: 7
    })

    setTicketTransactionList(ticket)
    setBalance(balance - expense)
  }

  const handleTicketPrice90 = () => {
    const expense = 10;

    const ticket = ticketTransactionList.slice();
    ticket.unshift({
      id: Math.random().toString(16).substring(2),
      time: '90',
      date: '18.05.2022',
      primaryColor: '#D8E9EF',
      secondaryColor: '#E4EFF4',
      price: 10
    })

    setTicketTransactionList(ticket)
    setBalance(balance - expense)
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
          style={[styles.priceButton, { backgroundColor: "#DAE9EF" }]}
          onPress={handleTicketPrice90}
        >
          <Text style={styles.topButtonText}>10,00 kn</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomButtonCointainer}>
        <TouchableOpacity
          style={styles.addResourcesButton}
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
  },
});

export default TicketInput;
