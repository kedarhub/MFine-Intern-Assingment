const Parking = require('../models/parkingModel');

exports.parkCar = async (req, res) => {
  try {
    const { parkingLotId, registrationNumber, color } = req.body;

    // Validate input parameters
    if (!parkingLotId || !registrationNumber || !color) {
      return res.status(400).json({ isSuccess: false, error: { reason: 'Missing required parameters' } });
    }

    // Find an available slot for parking
    const availableSlot = await Parking.findOne({
      parkingLotId,
      status: 'LEFT', // Assuming 'LEFT' indicates an available slot
    }).sort({ slotNumber: 1 });

    if (!availableSlot) {
      return res.status(400).json({ isSuccess: false, error: { reason: 'No available slots in the parking lot' } });
    }

    // Update the slot status to 'PARKED' and create a new parking entry
    availableSlot.status = 'PARKED';
    await availableSlot.save();

    const newParking = new Parking({
      parkingLotId,
      registrationNumber,
      color,
      slotNumber: availableSlot.slotNumber,
      status: 'PARKED',
    });

    await newParking.save();

    return res.status(200).json({
      isSuccess: true,
      response: { slotNumber: newParking.slotNumber, status: 'PARKED' },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ isSuccess: false, error: { reason: 'Internal Server Error' } });
  }
};
