import { Button as ButtonNativeBase, IButtonProps, Text } from 'native-base';

interface Props extends IButtonProps {
  title: string;
  type?: 'primary' | 'secondary';
}

export function Button({ title, type = 'primary', ...rest }: Props) {
  return (
    <ButtonNativeBase
      w="full"
      h={14}
      rounded="sm"
      fontSize="md"
      bg={type === 'primary' ? 'yellow.500' : 'red.500'}
      _pressed={{
        bg: type === 'primary' ? 'yellow.600' : 'red.600',
      }}
      _loading={{
        _spinner: { color: 'black' },
      }}
      {...rest}
    >
      <Text
        fontSize="sm"
        fontFamily="heading"
        textTransform="uppercase"
        color={type === 'primary' ? 'black' : 'white'}
      >
        {title}
      </Text>
    </ButtonNativeBase>
  );
}
