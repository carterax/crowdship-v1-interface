import { useRadio, Box } from '@chakra-ui/react';

export const RadioCard = (props: any) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as='label'>
      <input {...input} />
      <Box {...checkbox} {...props.style} cursor='pointer'>
        {props.children}
      </Box>
    </Box>
  );
};
