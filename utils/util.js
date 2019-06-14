const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const convertDateFormatToMDY = dateStringInYMD => {

  var dateArray = dateStringInYMD.split("-")

  var year = dateArray[0]
  var month = dateArray[1]
  var day = dateArray[2]

  return month + '-' + day + '-' + year
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  convertDateFormatToMDY: convertDateFormatToMDY
}