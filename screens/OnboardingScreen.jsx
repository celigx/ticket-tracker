import { StyleSheet, View, Text, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import AppIntroSlider from "react-native-app-intro-slider";
import { nanoid } from "nanoid/non-secure";
import { useDispatch } from "react-redux";
import { onboardingActions } from "../feature/onboarding/onboardingSlice";
import { storeOnboarding } from "../helper/helpers";

const slides = [
  {
    key: nanoid(),
    title: "Pratite Stanje",
    text:
      "U svakom trenutku saznajte koliko vam je ostalo na vrijednosnoj kartici",
    image: require("../assets/track-status.png"),
    backgroundColor: "#DAE9EF",
    titleColor: "#275C72",
    textColor: "#648897",
  },
  {
    key: nanoid(),
    title: "Pratite Potrošnju",
    text: "Dodajte, izmijenite ili izbrišite kupljene karte",
    image: require("../assets/track-expense.png"),
    backgroundColor: "#DAEFE0",
    titleColor: "#226C37",
    textColor: "#649772",
  },
  {
    key: nanoid(),
    title: "Nadopunite Račun",
    text: "Jednostavno nadopunite svoj račun",
    image: require("../assets/add-funds.png"),
    backgroundColor: "#EFDAE4",
    titleColor: "#672243",
    textColor: "#97647C",
  },
];

const OnboardingScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const renderItem = ({ item }) => {
    return (
      <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
        <Image source={item.image} style={styles.image} />
        <Text style={[styles.title, { color: item.titleColor }]}>
          {item.title}
        </Text>
        <Text style={[styles.text, { color: item.textColor }]}>
          {item.text}
        </Text>
      </View>
    );
  };

  const renderDoneButton = () => {
    return (
      <View style={styles.button}>
        <Text style={styles.doneLabel}>Nastavite</Text>
      </View>
    );
  };

  const onDone = () => {
    dispatch(onboardingActions.showOnboarding(false));
    navigation.navigate("Home");
    // Save to async storage
    storeOnboarding(false);
  };

  return (
    <View style={styles.container}>
      <AppIntroSlider
        data={slides}
        renderItem={renderItem}
        activeDotStyle={{ backgroundColor: "#3F3D56" }}
        onDone={onDone}
        showNextButton={false}
        renderDoneButton={renderDoneButton}
      />
      <StatusBar style="dark" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#3F3D56",
    fontSize: 20,
    alignItems: "center",
    justifyContent: "center",
    height: 44,
    borderRadius: 22,
    paddingHorizontal: 20,
  },
  doneLabel: {
    color: "#EFDAE4",
    fontSize: 18,
  },
});

export default OnboardingScreen;
