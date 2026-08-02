import QRCode from 'qrcode';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export const generateQRCode = async (data: string): Promise<string> => {
  try {
    return await QRCode.toDataURL(data);
  } catch (err) {
    console.error('QR Code generation error:', err);
    throw err;
  }
};

export const generateTicketPDF = async (booking: any, trip: any, user: any): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const filename = `ticket-${booking._id}.pdf`;
      const filePath = path.join(__dirname, '../../uploads', filename);

      // Ensure uploads directory exists
      const uploadDir = path.join(__dirname, '../../uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
      }

      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);

      // Header
      doc.fontSize(25).text('YatraSewa Ticket', { align: 'center' });
      doc.moveDown();

      // Trip Info
      doc.fontSize(16).text(`Booking ID: ${booking._id}`);
      doc.text(`Passenger: ${user.name}`);
      doc.text(`Route: ${trip.routeFrom} to ${trip.routeTo}`);
      doc.text(`Departure: ${new Date(trip.departureTime).toLocaleString()}`);
      doc.text(`Seats: ${booking.seats.join(', ')}`);
      doc.text(`Bus Number: ${trip.busNumber}`);
      doc.moveDown();

      // Fare Info
      doc.text(`Total Amount: NPR ${booking.totalAmount}`);
      doc.text(`Paid Amount: NPR ${booking.paidAmount}`);
      doc.moveDown();

      // QR Code
      const qrData = JSON.stringify({
        bookingId: booking._id,
        userId: user._id,
        tripId: trip._id,
      });
      const qrCodeDataUrl = await generateQRCode(qrData);

      // Convert DataURL to Buffer
      const qrBuffer = Buffer.from(qrCodeDataUrl.split(',')[1], 'base64');
      doc.image(qrBuffer, { fit: [150, 150], align: 'center' });

      doc.end();

      stream.on('finish', () => resolve(filePath));
      stream.on('error', reject);
    } catch (err) {
      reject(err);
    }
  });
};
