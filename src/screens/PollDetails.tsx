import { useRoute } from '@react-navigation/native';
import { HStack, useToast, VStack } from 'native-base';
import { Header } from '../components/Header';

import { useEffect, useState } from 'react';
import { Share } from 'react-native';
import { EmptyMyPollList } from '../components/EmptyMyPollList';
import { Loading } from '../components/Loading';
import { Option } from '../components/Option';
import { PollCardProps } from '../components/PollCard';
import { PollHeader } from '../components/PollHeader';
import { api } from '../services/api';

interface RouteParams {
  id: string;
}

export function PollDetails() {
  const [isPollLoading, setIsPollLoading] = useState(true);
  const [poll, setPoll] = useState<PollCardProps>({} as PollCardProps);
  const [optionSelected, setOptionSelected] = useState<
    'my_guesses' | 'group_ranking'
  >('my_guesses');

  const toast = useToast();
  const route = useRoute();
  const { id } = route.params as RouteParams;

  async function fetchPoll() {
    try {
      setIsPollLoading(true);

      const response = await api.get(`/polls/${id}`);

      setPoll(response.data.poll);
    } catch (error) {
      toast.show({
        title: 'It was not possible to get the poll information.',
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsPollLoading(false);
    }
  }

  async function sharePollCode() {
    await Share.share({
      message: poll.code,
    });
  }

  useEffect(() => {
    fetchPoll();
  }, [id]);

  if (isPollLoading) return <Loading />;

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header
        title={poll.title}
        showBackButton
        showShareButton
        onShare={sharePollCode}
      />

      {poll._count.participants > 0 ? (
        <VStack px={5} flex={1}>
          <PollHeader data={poll} />

          <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
            <Option
              title="Your guesses"
              isSelected={optionSelected === 'my_guesses'}
              onPress={() => setOptionSelected('my_guesses')}
            />
            <Option
              title="Group Ranking"
              isSelected={optionSelected === 'group_ranking'}
              onPress={() => setOptionSelected('group_ranking')}
            />
          </HStack>
        </VStack>
      ) : (
        <EmptyMyPollList code={poll.code} />
      )}
    </VStack>
  );
}
