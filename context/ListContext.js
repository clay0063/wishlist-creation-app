import { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ListContext = createContext(); //create the context object

function ListProvider(props) {
  const FULL_LIST_KEY = 'full_people_list';
  const [fullList, setFullList] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem(FULL_LIST_KEY).then((list) => {
      list = list === null ? [] : JSON.parse(list);
      setFullList(list);
    });
  }, []);

  async function updateStorageList(newList) {
    if (newList !== undefined) {
      setFullList(newList);
      await AsyncStorage.setItem(FULL_LIST_KEY, JSON.stringify(newList));
    }
  }

  const addItemByID = async (id, data) => {
    const newList = [...fullList];
    const index = newList.findIndex((person) => person.uid === id);
    const updatedPerson = { ...newList[index] };
    updatedPerson.ideas = [...updatedPerson.ideas, data];
    newList[index] = updatedPerson;
    await updateStorageList(newList);
  };

  const getItemsByID = (id) => {
    const person = fullList.find((item) => item.uid === id)
    console.log(person)
    return person.ideas;
  }

  const contextValue = {
    fullList, 
    updateStorageList, 
    addItemByID, 
    getItemsByID
  }

  return <ListContext.Provider value={contextValue} {...props} />;
}

function useList() {
  //can be called from components to use the [fullList, setFullList]
  const context = useContext(ListContext);
  if (!context) throw new Error('Not inside the Provider');
  return context; 
}

export { useList, ListProvider };
