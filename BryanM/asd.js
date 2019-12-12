const getNumber = numero => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(numero);
    }, 3000 * numero);
  });
};

const getAsync = async () => {
  for (let i = 1; i < 11; i++) {
    const numero = await getNumber(i);
    console.log(numero);
  }
};

getAsync();
