const translationObject = {
    "1": "۱",
    "2": "۲",
    "3": "۳",
    "4": "۴",
    "5": "۵",
    "6": "۶",
    "7": "۷",
    "8": "۸",
    "9": "۹",
    "0": "۰",
};
export const englishToPersianNumbers = (str) => {
    if (typeof str !== 'string') {
        str = str.toString();
    }
    let translatedArray = [];
    for (const char of str) {
        translatedArray.push(translationObject[char]);
    }
    return translatedArray.join('');
}