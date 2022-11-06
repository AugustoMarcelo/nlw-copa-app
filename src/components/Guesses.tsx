import { FlatList, useToast } from 'native-base';
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { EmptyMyPollList } from './EmptyMyPollList';
import { Game, GameProps } from './Game';
import { Loading } from './Loading';

interface Props {
  pollId: string;
  code?: string;
}

export function Guesses({ pollId, code }: Props) {
  const [isLoadingGames, setIsLoadingGames] = useState(false);
  const [games, setGames] = useState<GameProps[]>([]);
  const [firstTeamPoints, setFirstTeamPoints] = useState('');
  const [secondTeamPoints, setSecondTeamPoints] = useState('');

  const toast = useToast();

  async function fetchGames() {
    try {
      setIsLoadingGames(true);

      const response = await api.get(`/polls/${pollId}/games`);
      setGames(response.data.games);
    } catch (error) {
      toast.show({
        title: 'It was not possible to show the games',
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsLoadingGames(false);
    }
  }

  async function handleGuessConfirm(gameId: string) {
    try {
      if (!firstTeamPoints.trim() || !secondTeamPoints.trim()) {
        toast.show({
          title: 'You need to inform both team points',
          placement: 'top',
          bgColor: 'red.500',
        });
      }

      await api.post(`/polls/${pollId}/games/${gameId}/guesses`, {
        firstTeamPoints: Number(firstTeamPoints),
        secondTeamPoints: Number(secondTeamPoints),
      });

      toast.show({
        title: 'Guess saved successfully',
        placement: 'top',
        bgColor: 'green.500',
      });

      fetchGames();
    } catch (error) {
      toast.show({
        title: 'It was not possible to sent the guess',
        placement: 'top',
        bgColor: 'red.500',
      });
    }
  }

  useEffect(() => {
    fetchGames();
  }, [pollId]);

  if (isLoadingGames) return <Loading />;

  return (
    <FlatList
      data={games}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Game
          data={item}
          setFirstTeamPoints={setFirstTeamPoints}
          setSecondTeamPoints={setSecondTeamPoints}
          onGuessConfirm={() => handleGuessConfirm(item.id)}
        />
      )}
      _contentContainerStyle={{ pb: 10 }}
      ListEmptyComponent={() => <EmptyMyPollList code={code} />}
    />
  );
}
