import * as React from 'react';
import { SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import ListCard from '../components/ListCard';

export default function HomeScreen(props) {
  const { listing } = useSelector(state => state.listing);

  return (
    <SafeAreaView style={{ backgroundColor: '#F1F3FA', marginTop: 24 }}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 15 }}>
        {listing.map((listing, index) => (
          <ListCard
            id={listing.id}
            key={index}
            name={listing.name}
            desc={listing.desc}
            phone={listing.phone}
            email={listing.email}
            website={listing.website}
            image={listing.image}
            category={listing.category}
            showMore={true}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
