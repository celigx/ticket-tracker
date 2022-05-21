import { StyleSheet, View, Text, FlatList } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

const TicketItem = ({ time, date, price, primaryColor, secondaryColor }) => {
  return (
    <View style={[styles.ticket, { backgroundColor: primaryColor }]}>

      <View style={styles.ticketLeftContainer}>
        <Text style={styles.logo}>ZET</Text>
        <Icon 
          name="barcode"
          color="#474747"
          size={44}
          style={styles.barcode}
          />
      </View>

      <View style={styles.ticketMiddleContainer}>
        <Text style={styles.ticketTitle}>POJEDINAČNA KARTA</Text>
        <Text style={styles.ticketTime}>{time} MINUTA</Text>
        <Text style={styles.ticketDate}>{date}</Text>
      </View>

      <View style={[styles.ticketPriceContainer, { backgroundColor: secondaryColor}]}>
        <Text style={styles.ticketPriceText}>{price},00 kn</Text>
      </View>

    </View>
  )
}

const TicketTransation = ({ ticketTransactionList }) => {
  const renderTicket = ({ item }) => {
    return (
      <TicketItem time={item.time} date={item.date} price={item.price} primaryColor={item.primaryColor} secondaryColor={item.secondaryColor}  />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista transakcija</Text>
      <FlatList 
        data={ticketTransactionList}
        renderItem={renderTicket}
        keyExtractor={ticket => ticket.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: '#fff',
    width: '95%',
    borderRadius: 6,
    padding: 10,
    marginTop: 10
  },
  title: {
    color: '#181818',
    fontSize: 20,
    fontWeight: '600',
    paddingBottom: 5
  },
  ticket: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
    borderRadius: 6,
    marginVertical: 5,
  },
  ticketLeftContainer: {
    flexDirection: 'row', 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  logo: {
    color: '#474747',
    transform: [{ rotate: '-90deg' }],
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '900',
    fontStyle: 'italic',
  },
  barcode: {
    transform: [{ rotate: '-90deg' }],
    textAlign: 'center'
  },
  ticketMiddleContainer: {
    marginRight: 10,
    flex: 2,
  },
  ticketTitle: {
    textAlign: 'right'
  },
  ticketTime: {
    fontWeight: 'bold', 
    textAlign: 'right'
  },
  ticketDate: {
    fontSize: 14,
    fontWeight: '600',
  },
  ticketPriceContainer: {
    flex: 1,
    height: '100%', 
    borderTopEndRadius: 6, 
    borderBottomEndRadius: 6, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  ticketPriceText: {
    fontWeight: '900', 
    fontSize: 16
  }
});

export default TicketTransation;