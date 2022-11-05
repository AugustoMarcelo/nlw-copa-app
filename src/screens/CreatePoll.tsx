import { Heading, Text, useToast, VStack } from 'native-base';
import { Header } from '../components/Header';

import { useState } from 'react';
import Logo from '../assets/logo.svg';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { api } from '../services/api';

export function CreatePoll() {
  const [pollName, setPollName] = useState('');
  const [pollIsBeingCreated, setPollIsBeingCreated] = useState(false);

  const toast = useToast();

  async function handleCreatePoll() {
    if (!pollName.trim()) {
      return toast.show({
        title: 'You should inform a poll name',
        placement: 'top',
        bgColor: 'red.500',
      });
    }

    try {
      setPollIsBeingCreated(true);

      await api.post('/polls', {
        title: pollName,
      });

      toast.show({
        title: 'Your poll has been created!',
        placement: 'top',
        bgColor: 'green.500',
      });

      setPollName('');
    } catch (error) {
      toast.show({
        title: 'It was not possible to create the poll',
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setPollIsBeingCreated(false);
    }
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Criar novo bolão" />

      <VStack mt={8} mx={5} alignItems="center">
        <Logo />

        <Heading
          fontFamily="heading"
          color="white"
          fontSize="lg"
          my={8}
          textAlign="center"
        >
          Crie seu próprio bolão da copa{'\n'}e compartilhe entre amigos!
        </Heading>

        <Input
          mb={2}
          placeholder="Qual o nome do seu bolão"
          value={pollName}
          onChangeText={setPollName}
        />

        <Button
          title="Criar meu bolão"
          onPress={handleCreatePoll}
          isLoading={pollIsBeingCreated}
        />

        <Text color="gray.200" fontSize="sm" textAlign="center" px={10} mt={4}>
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas.
        </Text>
      </VStack>
    </VStack>
  );
}
