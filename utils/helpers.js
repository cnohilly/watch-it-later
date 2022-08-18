module.exports = {
    // gets the year from the passed in date
    get_year: date => {
        return date.split('/')[2];
    },
    // makes the passed title lowercase and replaces spaces with hyphens 
    format_id: title => {
        return title.split(" ").map(word => { return word.toLowerCase() }).join('-');
    },
    // formats genres to display
    format_genres: genres => {
        return genres.join(', ');
    },
    // formats dates to the 0/0/0000 style
    format_date: date => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
            date
        ).getFullYear()}`;
    },
    // determines whether a word should be plural
    format_plural: (word, amount) => {
        if (amount !== 1) {
            return `${word}s`;
        }
        return word;
    }
}