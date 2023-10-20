const bundleIdeaData = (text, image) => {
    const itemName = text.trim();
    const random = Math.random().toString(16).substring(2);
    const id = random;
    const dataBundle = {...image, "text": itemName, "id": id };
    return dataBundle;
}

export default bundleIdeaData