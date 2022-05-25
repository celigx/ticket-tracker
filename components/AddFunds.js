import { StyleSheet, KeyboardAvoidingView, TextInput, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddFunds = ({ funds, setFunds, balance, setBalance, setHomeScreen }) => {  
  const handleInput = () => {
    if (funds == funds.match("^[1-9]+[0-9]*$")) {
      setBalance(Number(funds) + balance)
      setFunds('')
      setHomeScreen(true)

      // Save to async storage
      storeBalance(Number(funds) + balance)
    } else {
      ToastAndroid.show('Molimo unesite pravilan iznos', ToastAndroid.SHORT);
      setFunds('');
    }
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
        onSubmitEditing={handleInput}
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