import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { balanceActions } from "./feature/balance/balanceSlice";
import { ticketTransactionActions } from "./feature/ticketTransactionList/ticketTransactionSlice";
import { onboardingActions } from "./feature/onboarding/onboardingSlice";

import HomeScreen from "./screens/HomeScreen";
import AddFundsScreen from "./screens/AddFundsScreen";
import EditFundsScreen from "./screens/EditFundsScreen";
import OnboardingScreen from "./screens/OnboardingScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const dispatch = useDispatch();

  const balance = useSelector((state) => state.balance.value);
  const ticketTransactionList = useSelector(
    (state) => state.ticketTransactionList.ticketList
  );
  const onboarding = useSelector((state) => state.onboarding.onboarding);

  useEffect(() => {
    getData();
  }, []);

  // Get data from async storage
  const getData = async () => {
    try {
      const getBalance = await AsyncStorage.getItem("@balance");
      const parseBalance = JSON.parse(getBalance);

      const getTickets = await AsyncStorage.getItem("@tickets");
      const parseTickets = JSON.parse(getTickets);

      const getOnboarding = await AsyncStorage.getItem("@onboarding");
      const parseOnboarding = JSON.parse(getOnboarding);

      if (parseBalance !== null) {
        dispatch(balanceActions.editBalance(parseBalance));
        dispatch(ticketTransactionActions.getList(parseTickets));
      } else {
        dispatch(balanceActions.editBalance(balance));
        dispatch(ticketTransactionActions.getList(ticketTransactionList));
      }

      dispatch(onboardingActions.showOnboarding(parseOnboarding));
    } catch (e) {
      console.log("Async getTickets error", e);
    }
  };

  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {onboarding ? (
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        ) : (
          <></>
        )}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddFunds" component={AddFundsScreen} />
        <Stack.Screen name="EditFunds" component={EditFundsScreen} />
      </Stack.Navigator>
    </>
  );
}
