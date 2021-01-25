class Regex {
  moneyRegex = (money) => {
    const str = money.toString();
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
  };
}

export default new Regex();
