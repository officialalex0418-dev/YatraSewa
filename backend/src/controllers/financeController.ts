import { Request, Response } from 'express';
import Settlement from '../models/Settlement';
import Booking from '../models/Booking';

export const getFinancialSummary = async (req: Request, res: Response) => {
  try {
    const totalSettled = await Settlement.aggregate([
      { $match: { status: 'PAID' } },
      { $group: { _id: null, total: { $sum: '$payableAmount' } } }
    ]);

    const pendingSettlements = await Settlement.countDocuments({ status: 'PENDING' });

    res.json({
      totalSettled: totalSettled[0]?.total || 0,
      pendingSettlements,
      recentSettlements: await Settlement.find().sort({ createdAt: -1 }).limit(5).populate('companyId', 'name'),
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createSettlement = async (req: Request, res: Response) => {
  try {
    const settlement = await Settlement.create(req.body);
    res.status(201).json(settlement);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
