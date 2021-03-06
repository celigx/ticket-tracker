import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useState } from 'react';

import TotalBalance from './components/TotalBalance';
import TicketTransaction from './components/TicketTransaction';
import TicketInput from './components/TicketInput';
import AddFunds from './components/AddFunds';

export default function App() {
  const [balance, setBalance] = useState(0)
  const [ticketTransactionList, setTicketTransactionList] = useState([])
  const [funds, setFunds] = useState('')
  const [homeScreen, setHomeScreen] = useState(true)
  const [objId, setObjId] = useState()
  const [editFunds, setEditFunds] = useState(false)

  return (
    homeScreen ? (
      <View style={styles.container}>
        <TotalBalance balance={balance} />
        <TicketTransaction balance={balance} setBalance={setBalance} ticketTransactionList={ticketTransactionList} setTicketTransactionList={setTicketTransactionList} setHomeScreen={setHomeScreen} setObjId={setObjId} setEditFunds={setEditFunds} />
        <TicketInput balance={balance} setBalance={setBalance} ticketTransactionList={ticketTransactionList} setTicketTransactionList={setTicketTransactionList} setHomeScreen={setHomeScreen} />
        <StatusBar style="auto" />
      </View>
    ) : (
      <AddFunds funds={funds} setFunds={setFunds} balance={balance} setBalance={setBalance} ticketTransactionList={ticketTransactionList} setTicketTransactionList={setTicketTransactionList} setHomeScreen={setHomeScreen} objId={objId} editFunds={editFunds} setEditFunds={setEditFunds} />
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10
  },
});
