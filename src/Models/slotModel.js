const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  parkingLotId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ParkingLot',
    required: true,
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
});

module.exports = mongoose.model('Slot', slotSchema);
