import AsyncStorage from '@react-native-async-storage/async-storage';

const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('history');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      
    }
  }

  const storeData = async (value) => {

    try {
      const storeObject = {
        value: value,
        date: new Date()
      }
      const prevData = await getData();
      if(prevData){
        prevData.push(storeObject);
        const jsonValue = JSON.stringify(prevData);
        await AsyncStorage.setItem('history', jsonValue);
      }
      else {
        const arr = [storeObject];
        const jsonValue = JSON.stringify(arr);
        await AsyncStorage.setItem('history', jsonValue);
      }
    } catch (e) {
      
    }
  }

  const clear = async () => {
    try{
      AsyncStorage.getAllKeys()
      .then(keys => AsyncStorage.multiRemove(keys))
    } catch(err){

    }
  }
  exports.getData = getData;
  exports.storeData = storeData;
  exports.clear = clear;