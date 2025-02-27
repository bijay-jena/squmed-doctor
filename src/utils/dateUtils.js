import moment from 'moment';

export const getDateRange = activeTab => {
  const currentDate = moment(new Date()).format('YYYY-MM-DD');

  if (activeTab === 'Upcoming') {
    return {
      start_date: currentDate,
      end_date: moment(new Date()).add(70, 'days').format('YYYY-MM-DD'),
    };
  }

  return {
    start_date: moment(new Date()).subtract(70, 'days').format('YYYY-MM-DD'),
    end_date: currentDate,
  };
};
