import type { NextPage } from 'next';
import Image from 'next/image';
import { Box, SimpleGrid, Text, Center } from '@chakra-ui/react';

const Launch: NextPage = () => {
  return (
    <SimpleGrid columns={[3, null, 3]} spacing='0'>
      <Box bg='tomato' height='70px'>
        <Center>1</Center>
      </Box>
      <Box bg='tomato' height='70px'>
        <Center>2</Center>
      </Box>
      <Box bg='tomato' height='70px'>
        <Center>3</Center>
      </Box>
    </SimpleGrid>
  );
};

export default Launch;
