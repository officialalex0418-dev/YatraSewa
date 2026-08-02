export type UserRole = 'SUPER_ADMIN' | 'COMPANY' | 'MANAGER' | 'COUNTER_STAFF' | 'DRIVER' | 'CONDUCTOR' | 'CUSTOMER';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  walletBalance: number;
  yatraPoints: number;
  createdAt: Date;
}

export interface Booking {
  id: string;
  userId: string;
  tripId: string;
  seats: string[];
  totalAmount: number;
  paidAmount: number;
  pointsEarned: number;
  pointsRedeemed: number;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  bookingDate: Date;
}
