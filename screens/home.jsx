import { useState } from 'react';
import {
  FlatList,
  Image,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import * as Icons from 'react-native-heroicons/outline';
import { weatherData } from '../data/data.js';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState(null);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const filteredLocations = weatherData.filter(location =>
    location.city.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 40,
      }}
    >
      {/* Search */}
      <View style={{ marginBottom: 20 }}>
        {showSearchInput && (
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={{
              paddingLeft: 20,
              paddingVertical: 12,
              backgroundColor: '#212121',
              borderRadius: 30,
              fontSize: 18,
              color: 'white',
              marginBottom: 10,
            }}
            placeholder={'Search...'}
            placeholderTextColor={'white'}
            cursorColor={'white'}
          />
        )}
        <View
          style={{
            position: 'absolute',
            right: 10,
            top: showSearchInput ? 5 : -5,
            zIndex: 1,
            backgroundColor: showSearchInput ? '#fff' : '#212121',
            width: 40,
            height: 40,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Icons.MagnifyingGlassIcon
            color={showSearchInput ? '#212121' : '#fff'}
            size={24}
            onPress={() => setShowSearchInput(!showSearchInput)}
          />
        </View>
      </View>

      {/* Show filtered locations */}
      {showSearchInput && searchQuery !== '' && (
        <View
          style={{
            width: '100%',
            backgroundColor: 'white',
            borderRadius: 15,
            padding: 10,
            marginBottom: 20,
          }}
        >
          {filteredLocations.map((location, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setSelectedCity(location);
                setSearchQuery('');
                setShowSearchInput(false);
              }}
            >
              <Text
                style={{
                  borderBottomColor: '#ddd',
                  borderBottomWidth: 1,
                  paddingVertical: 10,
                  fontSize: 16,
                }}
              >
                {location?.city}, {location?.country}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Weather Summary */}
      {selectedCity ? (
        <>
          <View style={{ alignItems: 'center', marginBottom: 20 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 36 }}>
              {selectedCity.city}
            </Text>
            <Text style={{ fontSize: 16 }}>
              Chance of rain: {selectedCity.rainChance}
            </Text>
            <Image
              source={{
                uri: 'https://assets.api.uizard.io/api/cdn/stream/abadab8a-b78d-4343-bfb1-fe09851fb4c3.png',
              }}
              style={{ width: 200, height: 200, marginTop: 10 }}
              resizeMode="contain"
            />
          </View>

          {/* Weather Stats */}
          <View
            style={{
              backgroundColor: '#eaecef',
              borderRadius: 20,
              padding: 20,
              marginBottom: 20,
              gap: 15,
            }}
          >
            {[
              { label: 'Wind Speed', value: selectedCity?.windSpeed },
              { label: 'UV Index', value: selectedCity?.uvIndex },
              { label: 'Real Feel', value: selectedCity?.realFeel },
            ].map((item, idx) => (
              <View
                key={idx}
                style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}
              >
                <Icons.SunIcon size={30} />
                <View>
                  <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                    {item.label}
                  </Text>
                  <Text style={{ fontSize: 14 }}>{item.value}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Forecast */}
          <View style={{ marginBottom: 20 }}>
            <Text
              style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}
            >
              7-Day Forecast
            </Text>
            <FlatList
              data={selectedCity.forecast}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: '#ccc',
                  }}
                >
                  <Text style={{ fontSize: 16 }}>{item?.day}</Text>
                  <Text style={{ fontSize: 16 }}>
                    {item?.temp} - {item?.condition}
                  </Text>
                </View>
              )}
              scrollEnabled={false}
            />
          </View>
        </>
      ) : (
        <Text
          style={{
            marginTop:200,
            textAlign:"center",
            flex: 1,
            fontWeight: 'bold',
            fontSize: 30,
          }}
        >
          Please Search...
        </Text>
      )}
    </ScrollView>
  );
}
