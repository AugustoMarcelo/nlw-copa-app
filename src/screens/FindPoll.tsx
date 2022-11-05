import { Heading, useToast, VStack } from 'native-base';
import { Header } from '../components/Header';

import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { api } from '../services/api';

export function FindPoll() {
  const [isPollLoading, setIsPollLoading] = useState(false);
  const [pollCode, setPollCode] = useState('');

  const toast = useToast();
  const navigation = useNavigation();

  async function handlePollJoin() {
    if (!pollCode.trim()) {
      return toast.show({
        title: 'You should inform a poll code',
        placement: 'top',
        bgColor: 'red.500',
      });
    }

    try {
      setIsPollLoading(true);

      await api.post('/polls/join', { code: pollCode });

      toast.show({
        title: 'You has joined in the poll successfully',
        placement: 'top',
        bgColor: 'green.500',
      });

      navigation.navigate('Polls');
    } catch (error) {
      let message = 'It was not possible to find the poll';

      if (error.response?.data?.message) message = error.response.data.message;

      toast.show({
        title: message,
        placement: 'top',
        bgColor: 'red.500',
      });

      setIsPollLoading(false);
    }
  }
  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Buscar por código" showBackButton />

      <VStack mt={8} mx={5} alignItems="center">
        <Heading
          fontFamily="heading"
          color="white"
          fontSize="lg"
          mb={8}
          textAlign="center"
        >
          Encontre um bolão através de{'\n'}seu código único
        </Heading>

        <Input
          mb={2}
          placeholder="Qual o código do bolão?"
          value={pollCode}
          onChangeText={setPollCode}
          autoCapitalize="characters"
        />

        <Button
          title="Buscar bolão"
          isLoading={isPollLoading}
          onPress={handlePollJoin}
        />
      </VStack>
    </VStack>
  );
}
