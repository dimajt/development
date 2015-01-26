app.data = function() {

    var language = 'en';
    var dateObject = new Date();
    var dateString = dateObject.reformat();
    var section = 'births';

    dateObject = new Date(dateString);

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
        },

        day: [{
            en: 'Sunday',
            ru: 'Воскресенье',
            ua: 'Неділя'
        }, {
            en: 'Monday',
            ru: 'Понедельник',
            ua: 'Понеділок'
        }, {
            en: 'Tuesday',
            ru: 'Вторник',
            ua: 'Вівторок'
        }, {
            en: 'Wednesday',
            ru: 'Среда',
            ua: 'Середа'
        }, {
            en: 'Thursday',
            ru: 'Четверг',
            ua: 'Четверг'
        }, {
            en: 'Friday',
            ru: 'Пятница',
            ua: 'П\'ятниця'
        }, {
            en: 'Saturday',
            ru: 'Суббота',
            ua: 'Субота'
        }],

        month: [{
            en: 'January',
            ru: 'января',
            ua: 'січня'
        }, {
            en: 'February',
            ru: 'февраля',
            ua: 'лютого'
        }, {
            en: 'March',
            ru: 'Марта',
            ua: 'Березня'
        }, {
            en: 'April',
            ru: 'апреля',
            ua: 'квітня'
        }, {
            en: 'May',
            ru: 'мая',
            ua: 'травня'
        }, {
            en: 'June',
            ru: 'июля',
            ua: 'липня'
        }, {
            en: 'July',
            ru: 'июня',
            ua: 'червня'
        }, {
            en: 'August',
            ru: 'августа',
            ua: 'серпня'
        }, {
            en: 'September',
            ru: 'сентября',
            ua: 'вересня'
        }, {
            en: 'October',
            ru: 'октября',
            ua: 'жовтня'
        }, {
            en: 'November',
            ru: 'ноября',
            ua: 'листопада'
        }, {
            en: 'December',
            ru: 'декабря',
            ua: 'грудня'
        }],

        dayBeforeYesterday: {
            en: 'day before yesterday',
            ru: 'позавчера',
            ua: 'позавчора'
        },

        yesterday: {
            en: 'yesterday',
            ru: 'вчера',
            ua: 'вчора'
        },

        today: {
            en: 'today',
            ru: 'сегодня',
            ua: 'сьогодні'
        },

        tomorrow: {
            en: 'tomorrow',
            ru: 'завтра',
            ua: 'завтра'
        },

        dayAfterTomorrow: {
            en: 'day after tomorrow',
            ru: 'послезавтра',
            ua: 'післязавтра'
        }

    };

    return {

        getKey: function() {
            var value = localization[arguments[0]];
            for (var i = 1; i < arguments.length; i++) {
                value = value[arguments[i]];
            }
            return value[language];
        },

        getDateString: function() {
            return dateString;
        },

        getDateObject: function() {
            return dateObject;
        },

        getSection: function() {
            return section;
        },

        getLanguage: function() {
            return language;
        }

    }

}();