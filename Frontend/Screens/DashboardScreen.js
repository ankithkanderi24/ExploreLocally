import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import PersonCard from '../PersonCard';
import { API_URL } from '../App';

const DashboardScreen = ({ route }) => {
  const [data, setData] = useState([]);

  // Fetch data when component mounts
  useEffect(() => {
    const fetchRatingsForAdvisors = (advisors) => {
      // Map over the advisors to create a promise for each one's rating
      const ratingPromises = advisors.map((advisor) => {
        return fetch(`${API_URL}/advisors/rating/${advisor.username}`)
          .then((response) => response.json())
          .then((ratingData) => {
            return { ...advisor, rating: ratingData.average_rating };
          })
          .catch((error) => {
            console.error('Error fetching rating for', advisor.username, error);
            return { ...advisor, rating: 'None' };
          });
      });

      // Once all the ratings are fetched, update the state
      Promise.all(ratingPromises).then((updatedAdvisors) => {
        setData(updatedAdvisors);
      });
    };

    if (route.params?.advisors) {
      fetchRatingsForAdvisors(route.params.advisors);
    } else {
      // Fetch all advisors if no advisors are passed in route params
      fetch(`${API_URL}/advisors/getall`)
        .then((response) => response.json())
        .then((allAdvisors) => {
          fetchRatingsForAdvisors(allAdvisors);
        })
        .catch((error) => {
          console.error('Error fetching advisors:', error);
        });
    }
  }, [route.params?.advisors]);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.scrollContainer}>
        <ScrollView>
          {data.map((advisor, index) => (
            <PersonCard
              key={index}
              username={advisor.username}
              location={advisor.location}
              interests={advisor.interests}
              languages={advisor.languages}
              rating={advisor.rating}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flex: 3,
  },
});

export default DashboardScreen;
