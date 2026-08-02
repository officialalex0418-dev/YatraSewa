import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ChevronLeft, Info, Armchair } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const SEATS = [
  ['A1', 'A2', '', 'B1', 'B2'],
  ['A3', 'A4', '', 'B3', 'B4'],
  ['A5', 'A6', '', 'B5', 'B6'],
  ['A7', 'A8', '', 'B7', 'B8'],
  ['A9', 'A10', '', 'B9', 'B10'],
  ['A11', 'A12', '', 'B11', 'B12'],
  ['A13', 'A14', '', 'B13', 'B14'],
  ['A15', 'A16', '', 'B15', 'B16'],
  ['A17', 'A18', 'A19', 'B17', 'B18'],
];

const OCCUPIED_SEATS = ['A1', 'A2', 'B5', 'B6'];

export default function SeatSelection() {
  const router = useRouter();
  const { tripId } = useLocalSearchParams();
  const [selectedSeats, setSelectedSeats] = React.useState<string[]>([]);

  const toggleSeat = (seat: string) => {
    if (OCCUPIED_SEATS.includes(seat)) return;
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(prev => prev.filter(s => s !== seat));
    } else {
      setSelectedSeats(prev => [...prev, seat]);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-6 py-4 flex-row items-center justify-between border-b border-slate-100">
        <TouchableOpacity onPress={() => router.back()} className="p-2 bg-slate-50 rounded-xl">
          <ChevronLeft color="#1e293b" size={24} />
        </TouchableOpacity>
        <View className="items-center">
          <Text className="text-sm font-bold text-slate-400 uppercase tracking-widest">Select Seats</Text>
          <Text className="text-lg font-black text-slate-900">Kathmandu - Pokhara</Text>
        </View>
        <TouchableOpacity className="p-2 bg-slate-50 rounded-xl">
          <Info color="#1e293b" size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-6 pt-8">
        {/* Legend */}
        <View className="flex-row justify-center space-x-6 mb-10">
          <View className="flex-row items-center space-x-2">
            <View className="w-4 h-4 rounded bg-slate-100 border border-slate-200" />
            <Text className="text-xs font-bold text-slate-500 uppercase">Available</Text>
          </View>
          <View className="flex-row items-center space-x-2">
            <View className="w-4 h-4 rounded bg-slate-300" />
            <Text className="text-xs font-bold text-slate-500 uppercase">Booked</Text>
          </View>
          <View className="flex-row items-center space-x-2">
            <View className="w-4 h-4 rounded bg-purple-600" />
            <Text className="text-xs font-bold text-slate-500 uppercase">Selected</Text>
          </View>
        </View>

        {/* Bus Layout */}
        <View className="bg-slate-50 p-8 rounded-[50px] border border-slate-100 mb-12">
          {/* Driver Section */}
          <View className="flex-row justify-end mb-10 pr-4">
             <View className="w-12 h-12 bg-slate-200 rounded-xl items-center justify-center">
                <Text className="text-[10px] font-black text-slate-400 uppercase">Driver</Text>
             </View>
          </View>

          {/* Seats Grid */}
          <View className="space-y-4">
            {SEATS.map((row, rowIndex) => (
              <View key={rowIndex} className="flex-row justify-between">
                {row.map((seat, seatIndex) => {
                  if (seat === '') return <View key={seatIndex} className="w-10" />;

                  const isOccupied = OCCUPIED_SEATS.includes(seat);
                  const isSelected = selectedSeats.includes(seat);

                  return (
                    <TouchableOpacity
                      key={seatIndex}
                      onPress={() => toggleSeat(seat)}
                      disabled={isOccupied}
                      className={`w-12 h-12 rounded-2xl items-center justify-center border-b-4 ${
                        isOccupied
                          ? 'bg-slate-300 border-slate-400'
                          : isSelected
                            ? 'bg-purple-600 border-purple-800'
                            : 'bg-white border-slate-200'
                      }`}
                    >
                      <Armchair
                        color={isOccupied ? '#94a3b8' : isSelected ? 'white' : '#cbd5e1'}
                        size={20}
                      />
                      <Text
                        className={`text-[8px] font-bold mt-1 ${
                          isSelected ? 'text-white' : 'text-slate-400'
                        }`}
                      >
                        {seat}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      {selectedSeats.length > 0 && (
        <View className="p-8 bg-white border-t border-slate-100 flex-row items-center justify-between">
          <View>
            <Text className="text-slate-400 text-xs font-bold uppercase tracking-widest">Selected ({selectedSeats.length})</Text>
            <Text className="text-slate-900 text-xl font-black mt-1">NPR {selectedSeats.length * 1200}</Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push({
               pathname: '/booking/confirm',
               params: { tripId, seats: selectedSeats.join(',') }
            })}
            className="px-8 py-4 bg-purple-600 rounded-3xl shadow-lg shadow-purple-200"
          >
            <Text className="text-white font-black">Continue</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
