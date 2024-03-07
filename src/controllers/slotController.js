const Slot = require('../models/slotModel');

exports.getSlotsByColor = async (req, res) => {
  try {
    const { color, parkingLotId } = req.query;

    // Validate input parameters
    if (!color || !parkingLotId) {
      return res.status(400).json({ isSuccess: false, error: { reason: 'Missing required parameters' } });
    }

    // Validate color against allowed colors
    const allowedColors = ['RED', 'GREEN', 'BLUE', 'BLACK', 'WHITE', 'YELLOW', 'ORANGE'];
    if (!allowedColors.includes(color.toUpperCase())) {
      return res.status(400).json({ isSuccess: false, error: { reason: 'Invalid Color' } });
    }

    // Find slots by color
    const slots = await Slot.find({
      parkingLotId,
      color: color.toUpperCase(),
    });

    if (slots.length === 0) {
      return res.status(404).json({ isSuccess: false, error: { reason: `No car found with color ${color}` } });
    }

    return res.status(200).json({
      isSuccess: true,
      response: { slots },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ isSuccess: false, error: { reason: 'Internal Server Error' } });
  }
};
