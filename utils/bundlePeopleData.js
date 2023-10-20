
import * as Crypto from 'expo-crypto';

const bundlePeopleData = (name, dob) => {
  const personName = name.trim();
  const dateString = dob.replaceAll("/", "-");
  const personDate = dateMath(dateString);
  const uid = Crypto.randomUUID();
  const dataBundle = {
    name: personName,
    date: personDate,
    uid: uid,
    ideas: [],
  };
  return dataBundle;
};

const dateMath = (date) => {
  const dateObject = new Date(date);
  const offset = dateObject.getTimezoneOffset();
  const hoursOffset = offset / 60;
  dateObject.setHours(dateObject.getHours() + hoursOffset);
  return dateObject;
};

export default bundlePeopleData