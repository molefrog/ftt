const icons = {
  visa: require('./visa.png'),
  mir: require('./mir.jpg')
}

const getIcon = type => {
  return icons[type] || icons.visa
}

export default getIcon
