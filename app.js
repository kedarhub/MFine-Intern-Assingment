const express = require('express');
const mongoose = require('mongoose');
const parkingLotRoutes = require('./src/routes/parkingLotRoutes');
const parkingRoutes = require('./src/routes/parkingRoutes');
const leaveRoutes = require('./src/routes/leaveRoutes');
const registrationRoutes = require('./src/routes/registrationRoutes');
const slotRoutes = require('./src/routes/slotRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb+srv://kedarsingh:kedarsingh@cluster0.k4ajyrt.mongodb.net/';
async function checkDatabaseConnection() {
    try {
      await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  
      console.log('Connected to the database');
  
      // Access your models, perform queries, or other operations here if needed
  
      
    } catch (error) {
      console.error('Error connecting to the database:', error.message);
    }
  }
  
  checkDatabaseConnection();

// mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());

app.use('/api/ParkingLots', parkingLotRoutes);
app.use('/api/Parkings', parkingRoutes);
app.use('/api/Leaves', leaveRoutes);
app.use('/api/Registrations', registrationRoutes);
app.use('/api/Slots', slotRoutes);
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Handle the rejection, such as logging or sending to monitoring tools
    // Note: It's important to handle rejections to prevent "UnhandledPromiseRejectionWarning"
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
