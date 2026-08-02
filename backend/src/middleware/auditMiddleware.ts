import { Request, Response, NextFunction } from 'express';
import AuditLog from '../models/AuditLog';

export const auditLog = (action: string, module: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const originalJson = res.json;

    res.json = function (data) {
      const adminId = (req as any).user?._id;

      if (adminId && req.method !== 'GET') {
        AuditLog.create({
          adminId,
          action,
          targetModule: module,
          targetId: req.params.id || req.body.id || data._id,
          newValue: req.body,
          ipAddress: req.ip || 'unknown',
          userAgent: req.headers['user-agent'] || 'unknown',
        }).catch(err => console.error('Audit Log Error:', err));
      }

      return originalJson.call(this, data);
    };

    next();
  };
};
