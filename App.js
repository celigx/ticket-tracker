import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useState } from 'react';

import TotalBalance from './components/TotalBalance';
import TicketTransation from './components/TicketTransaction';
import TicketInput from './components/TicketInput';

export default function App() {
  const [balance, setBalance] = useState(100)

  return (
    <View style={styles.container}>
      <TotalBalance balance={balance} />
      <TicketTransation />
      <TicketInput />
      <StatusBar style="auto" />
    </View>
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
