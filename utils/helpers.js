module.exports = {
    get_year: date => {
        return date.split('/')[2];
    },
    format_id: title => {
        return title.split(" ").map(word => { return word.toLowerCase() }).join('-');
    },
    format_genres: genres => {
        return genres.join(', ');
    },
    format_date: date => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
            date
        ).getFullYear()}`;
    },
    format_plural: (word, amount) => {
        if (amount !== 1) {
            return `${word}s`;
        }
        return word;
    }
}