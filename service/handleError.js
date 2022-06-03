const handleError = (res, err) => {
  let message = '';
  if (err) {
    message = err.message;
  } else {
    message = "欄位輸入錯誤，或無此ID";
  }
  res.status(400).send({
    status: false,
    message
  })
  res.end();
}
module.exports = handleError;