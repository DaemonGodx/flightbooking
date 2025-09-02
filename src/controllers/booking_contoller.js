const BookingService=require('../services/booking_service');

const {StatusCodes}=require('http-status-codes');
const BookingServices=new BookingService();

const create=async(req,res)=>{
    try {
        const response=await BookingServices.createBooking(req.body);
        return res.status(StatusCodes.OK).json({
            data:response,
            success:true,
            message:"Successfully created a booking",
            err:{}
        });
    } catch (error) {
        return res.status(error.statusCode|| StatusCodes.INTERNAL_SERVER_ERROR).json({
            data:{},
            success:false,
            message:error.message,
            err:error.explanation
        });
        
    }
}
module.exports={
    create};
