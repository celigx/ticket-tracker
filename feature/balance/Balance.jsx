import { StyleSheet, StatusBar, View, Text } from "react-native";
import { useSelector } from "react-redux";

const Balance = () => {
  const balance = useSelector((state) => state.balance.value);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ukupno raspoloživo</Text>
      <Text style={styles.balance}>{balance},00 kn</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181818",
    alignItems: "center",
    justifyContent: "center",
    width: "95%",
    borderRadius: 6,
    padding: 10,
    marginTop: StatusBar.currentHeight,
  },
  title: {
    color: "#DADADA",
    fontSize: 24,
  },
  balance: {
    color: "#FFFFFF",
    fontSize: 36,
    fontWeight: "bold",
  },
});

export default Balance;
