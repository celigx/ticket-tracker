import { StyleSheet, View, Text, Animated, Dimensions } from 'react-native';
import { useRef } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { SwipeListView } from 'react-native-swipe-list-view';
import AsyncStorage from '@react-native-async-storage/async-storage';


const TicketTransaction = ({ balance, setBalance, ticketTransactionList, setTicketTransactionList }) => {
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

  const renderTicket = ({ item }) => {
    return (
      <Animated.View
        style={[
          styles.ticket,
          {
            backgroundColor: item.primaryColor,
            height: rowTranslateAnimatedValues[item.id].interpolate({
              inputRange: [0, 1],
              outputRange: [0, 70],
            }),
          },
        ]}
      >
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
          <Text style={styles.ticketTime}>{item.time} MINUTA</Text>
          <Text style={styles.ticketDate}>{item.date}</Text>
        </View>

        <View
          style={[
            styles.ticketPriceContainer,
            { backgroundColor: item.secondaryColor },
          ]}
        >
          <Text style={styles.ticketPriceText}>{item.price},00 kn</Text>
        </View>
      </Animated.View>
    );
  };

  // Get ticket id from array
  const id = ticketTransactionList.map(e => e.id)
  // Change value in array to new Animated.Value(1)
  const value = id.map(e => e = new Animated.Value(1))
    
  // https://www.geeksforgeeks.org/how-to-create-an-object-from-two-arrays-in-javascript/
  // Convert two arrays to an object
  const convertToObj = (id, value) => {
    let obj = {};
      
    id.forEach((e, i) => {obj[e] = value[i]})
    return obj;
  }

  const rowTranslateAnimatedValues = convertToObj(id, value)

  const animationIsRunning = useRef(false);

  const onSwipeValueChange = (swipeData) => {
    const { key, value } = swipeData

    if ( value < -Dimensions.get('window').width && !animationIsRunning.current) {
      animationIsRunning.current = true;

      Animated.timing(rowTranslateAnimatedValues[key], {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }).start(() => {
        const newData = [...ticketTransactionList]
        const prevIndex = ticketTransactionList.findIndex(item => item.id === key)
        // Get array of ticket prices
        const price = ticketTransactionList.map(x => x.price)

        newData.splice(prevIndex, 1)

        setBalance(balance + price[prevIndex])
        setTicketTransactionList(newData)
        // Save to async storage
        storeBalance(balance + price[prevIndex])
        storeTickets(newData)

        animationIsRunning.current = false
      });
    }
  }

  const renderHiddenItem = () => (
    <></>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista transakcija</Text>

      <SwipeListView
        disableRightSwipe
        data={ticketTransactionList}
        renderItem={renderTicket}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-Dimensions.get('window').width}
        onSwipeValueChange={onSwipeValueChange}
        useNativeDriver={false}
        keyExtractor={item => item.id}
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

export default TicketTransaction;