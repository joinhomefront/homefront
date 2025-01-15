import { useState } from "react";
import { View } from "react-native";

import { Input, Text } from "@homefront/ui";

const ViralGrowthCalculator = () => {
  const [invites, setInvites] = useState(5); // Average invites per user
  const [conversionRate, setConversionRate] = useState(0.3); // Conversion rate
  const [initialUsers, setInitialUsers] = useState(100); // Initial user count
  const [days, setDays] = useState(60); // Total days
  const [cycleLength, setCycleLength] = useState(1); // Cycle length in days
  const [dropOffRate, _setDropOffRate] = useState(0.8); // Drop-off rate

  const calculateGrowth = () => {
    if (days <= 0 || cycleLength <= 0) {
      return { totalUsers: 0, growthData: [] };
    }
    const cycles = Math.floor(days / cycleLength); // Total number of cycles
    let users = initialUsers;
    let totalUsers = initialUsers;

    const growthData = [{ cycle: 0, users: initialUsers }];

    for (let i = 1; i <= cycles; i++) {
      users *= invites * conversionRate * dropOffRate;
      totalUsers += users;
      growthData.push({ cycle: i, users: Math.floor(users) });
    }

    return { totalUsers: Math.floor(totalUsers), growthData };
  };

  const { totalUsers, growthData } = calculateGrowth();

  return (
    <View>
      <Text className="mb-4 text-xl font-bold">Viral Growth Calculator</Text>
      <View className="mb-4">
        <Text>Average Invites Per User:</Text>
        <Input
          className="border p-2"
          keyboardType="numeric"
          value={String(invites)}
          onChangeText={(text) => setInvites(Number(text))}
        />
      </View>
      <View className="mb-4">
        <Text>Conversion Rate (%):</Text>
        <Input
          className="border p-2"
          keyboardType="numeric"
          value={String(conversionRate * 100)}
          onChangeText={(text) => setConversionRate(Number(text) / 100)}
        />
      </View>
      <View className="mb-4">
        <Text>Initial Users:</Text>
        <Input
          className="border p-2"
          keyboardType="numeric"
          value={String(initialUsers)}
          onChangeText={(text) => setInitialUsers(Number(text))}
        />
      </View>
      <View className="mb-4">
        <Text>Total Days:</Text>
        <Input
          className="border p-2"
          keyboardType="numeric"
          value={String(days)}
          onChangeText={(text) => setDays(Number(text))}
        />
      </View>
      <View className="mb-4">
        <Text>Cycle Length (Days):</Text>
        <Input
          className="border p-2"
          keyboardType="numeric"
          value={String(cycleLength)}
          onChangeText={(text) => setCycleLength(Number(text))}
        />
      </View>
      <Text className="mb-4 text-lg font-bold">
        Total Users by Day {days}: {totalUsers}
      </Text>
      <Text className="mb-2 text-lg font-bold">Growth Over Time:</Text>
      {growthData.map(({ cycle, users }) => (
        <Text key={cycle}>
          Cycle {cycle}: {users} users
        </Text>
      ))}
    </View>
  );
};

export default ViralGrowthCalculator;
