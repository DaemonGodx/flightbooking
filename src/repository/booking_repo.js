const { booking } = require('../models/index');
const { StatusCodes } = require('http-status-codes');
const { ValidationError, AppError } = require('../utils/index');

class BookingRepo {
    async createBooking(data) {
        try {
            const bookingDetails = await booking.create(data);
            return bookingDetails;
        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                throw new ValidationError(error);
            }
            throw new AppError(
                'Booking Creation Error',
                'Cannot create a new booking',
                'There was some error while creating a new booking',
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    async update(bookingId, data) {
        try {
            const bookingRecord = await booking.findByPk(bookingId);
            if (data.status) {
                bookingRecord.status = data.status;
            }
            await bookingRecord.save();
            return bookingRecord;
        } catch (error) {
            throw new AppError(
                'RepositoryError',
                'Cannot update Booking',
                'There was some issue updating the booking, please try again later',
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }
}

module.exports = BookingRepo;
