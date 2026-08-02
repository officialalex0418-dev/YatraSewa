import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ChevronLeft, Ticket, Gift, CreditCard, ShieldCheck } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function BookingConfirmation() {
  const router = useRouter();
  const { seats, tripId } = useLocalSearchParams();
  const selectedSeats = (seats as string)?.split(',') || [];
  const [usePoints, setUsePoints] = React.useState(false);

  const baseFare = selectedSeats.length * 1200;
  const pointsDiscount = usePoints ? 100 : 0;
  const totalAmount = baseFare - pointsDiscount;

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-6 py-4 flex-row items-center border-b border-slate-100">
        <TouchableOpacity onPress={() => router.back()} className="p-2 bg-slate-50 rounded-xl">
          <ChevronLeft color="#1e293b" size={24} />
        </TouchableOpacity>
        <Text className="ml-4 text-xl font-black text-slate-900">Confirm Booking</Text>
      </View>

      <ScrollView className="flex-1 px-6 pt-8">
        {/* Trip Summary Card */}
        <View className="bg-slate-900 p-8 rounded-[40px] mb-8 shadow-xl shadow-slate-200">
          <View className="flex-row justify-between items-start mb-6">
            <View>
              <Text className="text-slate-400 text-xs font-bold uppercase tracking-widest">Operator</Text>
              <Text className="text-white text-xl font-black mt-1">Everest Travels</Text>
            </View>
            <View className="p-3 bg-purple-600 rounded-2xl">
              <Ticket color="white" size={24} />
            </View>
          </View>

          <View className="flex-row items-center space-x-4 mb-6">
            <View>
              <Text className="text-white text-lg font-bold">Kathmandu</Text>
              <Text className="text-slate-400 text-xs">07:00 AM</Text>
            </View>
            <View className="flex-1 h-[1px] bg-slate-700" />
            <View className="items-end">
              <Text className="text-white text-lg font-bold">Pokhara</Text>
              <Text className="text-slate-400 text-xs">03:30 PM</Text>
            </View>
          </View>

          <View className="pt-6 border-t border-slate-800 flex-row justify-between">
             <View>
                <Text className="text-slate-400 text-[10px] font-bold uppercase">Seats</Text>
                <Text className="text-white font-bold mt-1">{selectedSeats.join(', ')}</Text>
             </View>
             <View className="items-end">
                <Text className="text-slate-400 text-[10px] font-bold uppercase">Bus Type</Text>
                <Text className="text-white font-bold mt-1">Super Deluxe AC</Text>
             </View>
          </View>
        </View>

        {/* Loyalty Points Section */}
        <View className="bg-purple-50 p-6 rounded-3xl border border-purple-100 flex-row items-center justify-between mb-8">
          <View className="flex-row items-center space-x-4">
             <View className="p-3 bg-white rounded-2xl shadow-sm">
                <Gift color="#7c3aed" size={24} />
             </View>
             <View className="ml-2">
                <Text className="text-purple-900 font-bold">Use Yatra Points</Text>
                <Text className="text-purple-600 text-xs">Available: 1,250 pts</Text>
             </View>
          </View>
          <Switch
            value={usePoints}
            onValueChange={setUsePoints}
            trackColor={{ false: '#e2e8f0', true: '#c4b5fd' }}
            thumbColor={usePoints ? '#7c3aed' : '#f8fafc'}
          />
        </View>

        {/* Fare Breakdown */}
        <View className="bg-slate-50 p-8 rounded-[40px] border border-slate-100 mb-12">
           <Text className="text-lg font-black text-slate-900 mb-6">Price Details</Text>
           <View className="space-y-4">
              <View className="flex-row justify-between">
                 <Text className="text-slate-500 font-bold">Ticket Fare ({selectedSeats.length})</Text>
                 <Text className="text-slate-900 font-bold">NPR {baseFare}</Text>
              </View>
              {usePoints && (
                <View className="flex-row justify-between">
                   <Text className="text-emerald-600 font-bold">Points Discount</Text>
                   <Text className="text-emerald-600 font-bold">- NPR {pointsDiscount}</Text>
                </View>
              )}
              <View className="flex-row justify-between">
                 <Text className="text-slate-500 font-bold">Service Fee</Text>
                 <Text className="text-slate-900 font-bold">NPR 50</Text>
              </View>
              <View className="pt-4 border-t border-slate-200 flex-row justify-between">
                 <Text className="text-xl font-black text-slate-900">Total Payable</Text>
                 <Text className="text-xl font-black text-purple-600">NPR {totalAmount + 50}</Text>
              </View>
           </View>
        </View>

        {/* Safety Badge */}
        <View className="flex-row items-center justify-center space-x-2 mb-12 opacity-50">
           <ShieldCheck color="#64748b" size={16} />
           <Text className="text-xs font-bold text-slate-500 uppercase tracking-widest">Secure Checkout</Text>
        </View>
      </ScrollView>

      {/* Payment Action */}
      <View className="p-8 bg-white border-t border-slate-100">
         <TouchableOpacity
           onPress={() => router.replace('/booking/success')}
           className="w-full py-5 bg-purple-600 rounded-3xl shadow-lg shadow-purple-200 flex-row justify-center items-center"
         >
            <CreditCard color="white" size={20} />
            <Text className="text-white text-lg font-bold ml-3">Pay & Book Now</Text>
         </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
