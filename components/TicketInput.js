import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const TicketInput = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topButtonContainer}>
        <TouchableOpacity
          style={[styles.priceButton, { backgroundColor: "#EFDAE4" }]}
        >
          <Text style={styles.topButtonText}>4,00 kn</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.priceButton, { backgroundColor: "#DAEFE0" }]}
        >
          <Text style={styles.topButtonText}>7,00 kn</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.priceButton, { backgroundColor: "#DAE9EF" }]}
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
