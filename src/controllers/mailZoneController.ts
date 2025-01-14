import { Request, Response } from 'express';
import { MailZoneService } from '../services/mailZoneService'; // Import the service
import { ApiKeyService } from '../services/apiKeyService';
import nodemailer from 'nodemailer';  // Import nodemailer

const mailZoneService = new MailZoneService();  // Create an instance of the service
const apiKeyService = new ApiKeyService();    // Create an instance of the ApiKey service

// Configure Nodemailer transport (example with Gmail SMTP)
const transporter = nodemailer.createTransport({
  host: 'mail.aisnesia.com', // Using Gmail service (can change to another provider)
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER, // Replace with your email address
    pass: process.env.EMAIL_PASS,  // Replace with your email password or app password
  }
});

// Function to handle the POST request for adding SBNP Zone
export const addSbnZone = async (req: Request, res: Response) => {
  const { sbnpName, sbnpType, selectedApiKey, mmsi, baseStationMmsi, longitude, latitude, userId } = req.body;

  try {
    // Step 1: Validate selectedApiKey
    const apiKeys = await apiKeyService.getApiKeysbyID(userId);  // Fetch API keys by user ID
    console.log(apiKeys);
    console.log(userId);

    // Step 2: Check if the selectedApiKey exists in the user's API keys
    const isValidApiKey = apiKeys.some(key => key.key === selectedApiKey);  // Compare keys

    if (!isValidApiKey) {
      return res.status(400).json({ message: 'Invalid API Key.' });
    }

    // Step 3: Proceed to add the SBNP zone if the API key is valid
    const newZone = await mailZoneService.createSbnZone({
      sbnpName,
      sbnpType,
      selectedApiKey,
      mmsi,
      baseStationMmsi,
      longitude,
      latitude
    });

    // Send success response
    res.status(201).json({ message: 'SBNP Zone added successfully!', data: newZone });

    // Step 4: Send email notification
    const mailOptions = {
      from: 'info@aisnesia.com',  // Replace with your email address
      to: 'info@aisnesia.com', // Replace with the recipient's email address
      subject: 'New SBNP Zone Added',  // Subject of the email
      text: `A new SBNP zone has been added.\n\nDetails:\nName: ${sbnpName}\nType: ${sbnpType}\nMMSI: ${mmsi}\nBase Station MMSI: ${baseStationMmsi}\nLongitude: ${longitude}\nLatitude: ${latitude}\nAPI Key: ${selectedApiKey}`, // The body of the email
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

  } catch (error: any) {
    console.error('Error adding SBNP Zone:', error.message);
    res.status(400).json({ message: error.message });
  }
};


export const deleteSbnZone = async (req: Request, res: Response) => {
  const { zoneId } = req.params;

  try {
    // Step 1: Fetch the zone details before deletion
    const zone = await mailZoneService.getMailZoneById(zoneId);

    if (!zone) {
      return res.status(404).json({ message: 'SBNP Zone not found.' });
    }

    // Step 2: Delete the zone
    await mailZoneService.deleteMailZone(zoneId);

    // Step 3: Send email notification
    const mailOptions = {
      from: 'info@aisnesia.com', // Replace with your email address
      to: 'info@aisnesia.com', // Replace with the recipient's email address
      subject: 'SBNP Zone Deleted', // Subject of the email
      text: `An SBNP zone has been deleted.

Details:
Name: ${zone.sbnpName}
Type: ${zone.sbnpType}
MMSI: ${zone.mmsi}
Base Station MMSI: ${zone.baseStationMmsi}
Longitude: ${zone.longitude}
Latitude: ${zone.latitude}
API Key: ${zone.selectedApiKey}`, // The body of the email
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    // Step 4: Send success response
    res.status(200).json({ message: 'SBNP Zone deleted successfully.' });
  } catch (error: any) {
    console.error('Error deleting SBNP Zone:', error.message);
    res.status(400).json({ message: error.message });
  }
};

export const getMailZones = async (req: Request, res: Response) => {
  try{
    const mailZones = await mailZoneService.getAllMailZones();
    if (!mailZones || mailZones.length === 0) {
      return res.status(404).json({ message: 'No mail zones found.' });
    }
    res.status(200).json(mailZones);
  } catch (error: any) {
    console.error('Error fetching mail zones:', error.message);
    res.status(400).json({ message: error.message });
  }
};
