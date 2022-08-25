import AsyncStorage from "@react-native-async-storage/async-storage";

// Save onboarding list to async storage
export const storeOnboarding = async (value) => {
  try {
    await AsyncStorage.setItem("@onboarding", JSON.stringify(value));

    console.log("storeOnboarding", value);
  } catch (e) {
    console.log("Async storeData error", e);
  }
};

// Save balance to async storage
export const storeBalance = async (value) => {
  try {
    await AsyncStorage.setItem("@balance", JSON.stringify(value));

    // console.log("storeBalance", value);
  } catch (e) {
    console.log("Async storeBalance error", e);
  }
};

// Save ticket list to async storage
export const storeTickets = async (value) => {
  try {
    await AsyncStorage.setItem("@tickets", JSON.stringify(value));

    // console.log("storeTickets", value);
  } catch (e) {
    console.log("Async storeData error", e);
  }
};

// // Save onboarding list to async storage
// export const storeOnboarding = async (value) => {
//   try {
//     await AsyncStorage.setItem("@onboarding", JSON.stringify(value));

//     console.log("storeOnboarding", value);
//   } catch (e) {
//     console.log("Async storeData error", e);
//   }
// };
