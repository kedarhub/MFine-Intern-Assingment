const ParkingLot = require('../models/parkingLotModel');

exports.createParkingLot = async (req, res) => {
  try {
    const { capacity } = req.body;

    if (capacity < 0 || capacity > 2000) {
      return res.status(400).json({ isSuccess: false, error: { reason: 'Invalid capacity' } });
    }

    const parkingLot = new ParkingLot({ capacity });
    await parkingLot.save();

    return res.status(200).json({ isSuccess: true, response: parkingLot });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ isSuccess: false, error: { reason: 'Internal Server Error' } });
  }
};
