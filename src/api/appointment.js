import moment from 'moment';
import axiosInstance from './axiosConfig';

const currentDate = moment(new Date()).format('YYYY-MM-DD');
const endDate = moment(new Date()).add(7, 'days').format('YYYY-MM-DD');

const getAppointments = async ({
  doctorId,
  start_date = currentDate,
  end_date = currentDate,
}) => {
  try {
    if (!doctorId) {
      return {
        data: {
          data: [],
        },
      };
    }
    const queryParams = new URLSearchParams({start_date, end_date});
    const response = await axiosInstance.get(
      `appointment/doctor-booked-slots/${doctorId}?${queryParams}`,
    );
    return response;
  } catch (error) {
    console.error('GET APPOINTMENTS ERROR', error);
  }
};

export {getAppointments};
