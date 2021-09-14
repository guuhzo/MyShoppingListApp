export default (value: number): string => {
  const formattedValue = Number(value).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 2,
  });
  return formattedValue;
};
