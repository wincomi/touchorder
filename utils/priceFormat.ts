export default (price: number): string => {
    return new Intl.NumberFormat('ko-KR').format(price)
}
