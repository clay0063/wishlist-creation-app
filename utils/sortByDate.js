const sortByDate = (data) => {
  if (data.length>=2) {
    const sortedData = data.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      const monthSort = dateA.getMonth() - dateB.getMonth();
      if (monthSort === 0) {
        return dateA.getDate() - dateB.getDate();
      }
      return monthSort
    })
    return sortedData
  } else {
    return data
  }
}

export default sortByDate