import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import TotalBalance from './components/TotalBalance';
import TicketTransation from './components/TicketTransaction';

export default function App() {
  return (
    <View style={styles.container}>
      <TotalBalance />
      <TicketTransation />
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
