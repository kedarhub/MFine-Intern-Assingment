const mongoose = require('mongoose');

const parkingLotSchema = new mongoose.Schema({
  capacity: {
    type: Number,
    required: true,
    min: 0,
    max: 2000,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model('ParkingLot', parkingLotSchema);
