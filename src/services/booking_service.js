const BookingRepo = require('../repository/booking_repo');
const axios = require('axios');
const { FLIGHT_SERVICE_PATH } = require('../config/envi');
const { ServiceError } = require('../utils/index');

class BookingService {
    constructor() {
        this.BookingRepo = new BookingRepo();
    }

    async createBooking(data) {
        try {
            const flightId = data.flightid;
            const getFlightUrl = `${FLIGHT_SERVICE_PATH}/api/v1/flight/${flightId}`;

            const response = await axios.get(getFlightUrl);
            const flightData = response.data.data;

            if (!flightData) {
                throw new ServiceError("Flight not found", "Invalid flightId");
            }

            if (data.noOfSeats > flightData.totalseats) {
                throw new ServiceError("Insufficient seats", "Not enough seats available");
            }
            const totalCost = flightData.price * data.noOfSeats;
            const bookingPayload = { ...data, totalCost };
            console.log("Booking Payload:", bookingPayload);

            const booking = await this.BookingRepo.createBooking(bookingPayload);

            const updateFlightUrl = `${FLIGHT_SERVICE_PATH}/api/v1/flight/${booking.flightid}`;
            await axios.patch(updateFlightUrl, {
                totalseats: flightData.totalseats - data.noOfSeats
            });
             const finalBooking = await this.BookingRepo.update(booking.id, {status: "Booked"});
            return finalBooking;
        } catch (error) {
            console.log("Booking Service Error:", error.response?.data || error.message);

            if (error.name === "RepositoryError" || error.name === "ValidationError") {
                throw error;
            }
            throw new ServiceError("Something went wrong in booking service");
        }
    }
}

module.exports = BookingService;
