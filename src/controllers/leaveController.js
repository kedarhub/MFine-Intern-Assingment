const Parking = require('../models/parkingModel');

exports.leaveCar = async (req, res) => {
  try {
    const { parkingLotId, registrationNumber, color } = req.body;

    // Validate input parameters
    if (!parkingLotId || !registrationNumber || !color) {
      return res.status(400).json({ isSuccess: false, error: { reason: 'Missing required parameters' } });
    }

    // Find the parked car
    const parkedCar = await Parking.findOne({
      parkingLotId,
      registrationNumber,
      color,
      status: 'PARKED',
    });

    if (!parkedCar) {
      return res.status(404).json({ isSuccess: false, error: { reason: 'Car not found in the specified state' } });
    }

    // Update the status to LEFT and perform any additional logic if needed
    parkedCar.status = 'LEFT';
    await parkedCar.save();

    return res.status(200).json({ isSuccess: true, response: { slotNumber: parkedCar.slotNumber, status: 'LEFT' } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ isSuccess: false, error: { reason: 'Internal Server Error' } });
  }
};
