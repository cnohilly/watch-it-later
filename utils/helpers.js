module.exports = {
    get_year: date => {
        return date.split('/')[2];
    },
    format_id: title => {
        return title.split(" ").map(word => { return word.toLowerCase() }).join('-');
    }
}