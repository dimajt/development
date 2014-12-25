app.data = function() {

    var language = 'ua';
    var dateObject = new Date();
    var date = dateObject.reformat();
    var section = 'births';

    var localization = {

        home: {
            en: 'Home',
            ru: 'Главная',
            ua: 'Головна'
        },

        weather: {
            en: 'Weather',
            ru: 'Погода',
            ua: 'Погода'
        },

        holidays: {
            en: 'Holidays',
            ru: 'Праздники',
            ua: 'Свята'
        },

        events: {
            en: 'Events',
            ru: 'События',
            ua: 'Події'
        },

        births: {
            en: 'Births',
            ru: 'Дни рождения',
            ua: 'Дні народження'
        },

        horoscope: {
            en: 'Horoscope',
            ru: 'Гороскоп',
            ua: 'Гороскоп'
        }

    };

    return {

        getKey: function(key) {
            return localization[key][language];
        },

        getDate: function() {
            return date;
        },

        getSection: function() {
            return section;
        }

    }

}();