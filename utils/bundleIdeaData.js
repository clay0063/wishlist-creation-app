import * as Crypto from "expo-crypto";

const bundleIdeaData = (text, image) => {
    const itemName = text.trim();
    const id = Crypto.randomUUID();
    const dataBundle = {...image, "text": itemName, "id": id };
    return dataBundle;
};

export default bundleIdeaData;