import { Octicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { FlatList, Icon, useToast, VStack } from 'native-base';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { api } from '../services/api';

import { useCallback, useState } from 'react';
import { EmptyPollList } from '../components/EmptyPollList';
import { Loading } from '../components/Loading';
import { PollCard, PollCardProps } from '../components/PollCard';

export function Polls() {
  const [isPollsLoading, setIsPollsLoading] = useState(false);
  const [polls, setPolls] = useState<PollCardProps[]>([]);

  const navigation = useNavigation();
  const toast = useToast();

  async function fetchPolls() {
    try {
      setIsPollsLoading(true);

      const pollsResponse = await api.get('/polls');

      setPolls(pollsResponse.data.polls);
    } catch (error) {
      toast.show({
        title: 'It was not possible to show the polls.',
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsPollsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchPolls();
    }, [])
  );

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="My Polls" />
      <VStack
        mt={6}
        mx={5}
        borderBottomWidth={1}
        borderBottomColor="gray.600"
        pb={4}
        mb={4}
      >
        <Button
          title="Search pool by code"
          leftIcon={
            <Icon as={Octicons} name="search" color="black" size="md" />
          }
          onPress={() => navigation.navigate('FindPoll')}
        />
      </VStack>

      {isPollsLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={polls}
          keyExtractor={(item) => item.id}
          px={5}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ pb: 10 }}
          ListEmptyComponent={() => <EmptyPollList />}
          renderItem={({ item }) => <PollCard data={item} />}
        />
      )}
    </VStack>
  );
}
