
export const convertPriceReal = (value: number) => {
    const priceReal = value / 100; 
    const formatPrice = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
    return formatPrice.format(priceReal);
}