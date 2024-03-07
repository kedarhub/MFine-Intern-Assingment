const mongoose = require('mongoose');

const parkingSchema = new mongoose.Schema({
  parkingLotId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ParkingLot',
    required: true,
  },
  registrationNumber: {
    type: String,
    required: true,
    // Add regex validation for registration number
  },
  color: {
    type: String,
    enum: ['RED', 'GREEN', 'BLUE', 'BLACK', 'WHITE', 'YELLOW', 'ORANGE'],
    required: true,
  },
  slotNumber: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['PARKED', 'LEFT'],
    required: true,
  },
});

module.exports = mongoose.model('Parking', parkingSchema);
