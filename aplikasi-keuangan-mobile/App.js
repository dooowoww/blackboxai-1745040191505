import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Image, ScrollView, StyleSheet, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// For icons
import { Ionicons } from '@expo/vector-icons';
// For charts (react-native-chart-kit)
// import { LineChart } from 'react-native-chart-kit';
// import { Dimensions } from 'react-native';

const Tab = createBottomTabNavigator();

function DashboardScreen() {
  // Dummy data for financial summary
  const totalTagihan = 5000000;
  const totalPembayaran = 3200000;
  const totalPengeluaran = 1800000;
  const saldo = 2000000;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Dashboard Keuangan</Text>
      <View style={styles.summaryContainer}>
        <View style={[styles.summaryBox, { backgroundColor: '#d1fae5' }]}>
          <Text style={[styles.summaryAmount, { color: '#065f46' }]}>Rp {totalTagihan.toLocaleString()}</Text>
          <Text style={[styles.summaryLabel, { color: '#047857' }]}>Total Tagihan</Text>
        </View>
        <View style={[styles.summaryBox, { backgroundColor: '#dbeafe' }]}>
          <Text style={[styles.summaryAmount, { color: '#1e40af' }]}>Rp {totalPembayaran.toLocaleString()}</Text>
          <Text style={[styles.summaryLabel, { color: '#2563eb' }]}>Total Pembayaran</Text>
        </View>
        <View style={[styles.summaryBox, { backgroundColor: '#fee2e2' }]}>
          <Text style={[styles.summaryAmount, { color: '#b91c1c' }]}>Rp {totalPengeluaran.toLocaleString()}</Text>
          <Text style={[styles.summaryLabel, { color: '#dc2626' }]}>Total Pengeluaran</Text>
        </View>
        <View style={[styles.summaryBox, { backgroundColor: '#fef3c7' }]}>
          <Text style={[styles.summaryAmount, { color: '#a16207' }]}>Rp {saldo.toLocaleString()}</Text>
          <Text style={[styles.summaryLabel, { color: '#ca8a04' }]}>Saldo</Text>
        </View>
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={styles.title}>Grafik Keuangan Bulanan</Text>
        <View style={{ height: 200, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#6b7280' }}>(Chart placeholder - integrate react-native-chart-kit or similar)</Text>
        </View>
      </View>
    </ScrollView>
  );
}

function ResidentsScreen() {
  const [residents, setResidents] = useState([]);
  const [name, setName] = useState('');

  const addResident = () => {
    if (name.trim() === '') {
      Alert.alert('Error', 'Nama warga tidak boleh kosong');
      return;
    }
    setResidents([...residents, { id: Date.now().toString(), name, monthlyTagihan: 0, totalTagihan: 0 }]);
    setName('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daftar Warga</Text>
      <TextInput
        style={styles.input}
        placeholder="Nama Warga"
        value={name}
        onChangeText={setName}
      />
      <Button title="Tambah Warga" onPress={addResident} />
      <FlatList
        data={residents}
        keyExtractor={item => item.id}
        style={{ marginTop: 20, width: '100%' }}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>{item.name}</Text>
            <Text style={{ color: '#6b7280' }}>Tagihan Bulanan: Rp {item.monthlyTagihan.toLocaleString()}</Text>
          </View>
        )}
      />
    </View>
  );
}

function PaymentsScreen() {
  const [payments, setPayments] = useState([]);
  const [method, setMethod] = useState('');
  // For simplicity, no file upload in this prototype

  const addPayment = () => {
    if (!method) {
      Alert.alert('Error', 'Pilih metode pembayaran');
      return;
    }
    const newPayment = {
      id: Date.now().toString(),
      method,
      proofName: method === 'cash' ? 'Cash Payment' : 'Transfer Proof',
      date: new Date().toLocaleDateString(),
      status: method === 'cash' ? 'Menunggu Verifikasi' : 'Terverifikasi',
    };
    setPayments([newPayment, ...payments]);
    setMethod('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pembayaran Iuran</Text>
      <View style={{ marginBottom: 10 }}>
        <Text style={{ marginBottom: 5 }}>Pilih Metode Pembayaran:</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <TouchableOpacity
            style={[styles.methodButton, method === 'transfer' && styles.methodButtonSelected]}
            onPress={() => setMethod('transfer')}
          >
            <Text>Transfer</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.methodButton, method === 'cash' && styles.methodButtonSelected]}
            onPress={() => setMethod('cash')}
          >
            <Text>Cash</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Button title="Kirim Bukti" onPress={addPayment} />
      <FlatList
        data={payments}
        keyExtractor={item => item.id}
        style={{ marginTop: 20, width: '100%' }}
        renderItem={({ item }) => (
          <View style={styles.listItemColumn}>
            <Text><Text style={{ fontWeight: 'bold' }}>Metode:</Text> {item.method}</Text>
            <Text><Text style={{ fontWeight: 'bold' }}>Bukti:</Text> {item.proofName}</Text>
            <Text><Text style={{ fontWeight: 'bold' }}>Tanggal:</Text> {item.date}</Text>
            <Text><Text style={{ fontWeight: 'bold' }}>Status:</Text> {item.status}</Text>
          </View>
        )}
      />
    </View>
  );
}

function ExpensesScreen() {
  const [expenses, setExpenses] = useState([]);
  const [type, setType] = useState('');
  const [amount, setAmount] = useState('');

  const addExpense = () => {
    if (type.trim() === '' || isNaN(parseInt(amount)) || parseInt(amount) <= 0) {
      Alert.alert('Error', 'Masukkan jenis dan jumlah pengeluaran yang valid');
      return;
    }
    setExpenses([{ id: Date.now().toString(), type, amount: parseInt(amount), date: new Date().toLocaleDateString() }, ...expenses]);
    setType('');
    setAmount('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pengeluaran</Text>
      <TextInput
        style={styles.input}
        placeholder="Jenis Pengeluaran (Satpam, Kebersihan, Barang, dll)"
        value={type}
        onChangeText={setType}
      />
      <TextInput
        style={styles.input}
        placeholder="Jumlah (Rp)"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <Button title="Tambah Pengeluaran" onPress={addExpense} />
      <FlatList
        data={expenses}
        keyExtractor={item => item.id}
        style={{ marginTop: 20, width: '100%' }}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>{item.type}</Text>
            <Text>Rp {item.amount.toLocaleString()}</Text>
          </View>
        )}
      />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Dashboard') iconName = 'ios-home';
            else if (route.name === 'Residents') iconName = 'ios-people';
            else if (route.name === 'Payments') iconName = 'ios-cash';
            else if (route.name === 'Expenses') iconName = 'ios-list';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#2563eb',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Dashboard" component={DashboardScreen} />
        <Tab.Screen name="Residents" component={ResidentsScreen} />
        <Tab.Screen name="Payments" component={PaymentsScreen} />
        <Tab.Screen name="Expenses" component={ExpensesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9fafb',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 16,
  },
  summaryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  summaryBox: {
    width: '48%',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  summaryAmount: {
    fontSize: 20,
    fontWeight: '700',
  },
  summaryLabel: {
    fontSize: 14,
    marginTop: 4,
  },
  input: {
    width: '100%',
    borderColor: '#d1d5db',
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
    backgroundColor: 'white',
  },
  listItem: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listItemColumn: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
    width: '100%',
  },
  methodButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#9ca3af',
    borderRadius: 6,
    width: 100,
    alignItems: 'center',
  },
  methodButtonSelected: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
    color: 'white',
  },
});
