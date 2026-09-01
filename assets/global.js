Shopify.money_format = Shopify.money_format || "${{amount}}";
Shopify.formatMoney = (cents, format) => {
    if (typeof cents === 'string') {
        cents = cents.replace('.', '');
    }
    const placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
    const formatString = format || Shopify.money_format;
    const defaultOption = (option, defaultValue) => {
        return typeof option === 'undefined' ? defaultValue : option;
    };
    const formatWithDelimiters = (number, precision, thousands, decimal) => {
        precision = defaultOption(precision, 2);
        thousands = defaultOption(thousands, ',');
        decimal = defaultOption(decimal, '.');
        if (isNaN(number) || number == null) {
            return 0;
        }
        number = (number / 100.0).toFixed(precision);
        const parts = number.split('.');
        const dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands);
        const cents = parts[1] ? (decimal + parts[1]) : '';
        return dollars + cents;
    };
    const match = formatString.match(placeholderRegex);
    if (!match) {
        return formatString;
    }
    let value = '';
    switch (match[1]) {
        case 'amount':
            value = formatWithDelimiters(cents, 2);
            break;
        case 'amount_no_decimals':
            value = formatWithDelimiters(cents, 0);
            break;
        case 'amount_with_comma_separator':
            value = formatWithDelimiters(cents, 2, '.', ',');
            break;
        case 'amount_no_decimals_with_comma_separator':
            value = formatWithDelimiters(cents, 0, '.', ',');
            break;
    }
    return formatString.replace(placeholderRegex, value);
};