import { ReactNode, FC } from 'react';
import {
  Box,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Text,
  Button,
} from '@chakra-ui/react';

interface IFaq {
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const Faq: FC<IFaq> = ({ faqs }) => {
  const renderFAQs = (): ReactNode[] => {
    return faqs.map(({ question, answer }, index) => {
      return (
        <AccordionItem
          key={index}
          borderWidth='1px'
          borderColor='blackAlpha.300'
          mb='5'
          borderRadius='md'
        >
          <h2>
            <AccordionButton p='5'>
              <Box flex='1' textAlign='left' color='blackAlpha.600'>
                {question}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>{answer}</AccordionPanel>
        </AccordionItem>
      );
    });
  };

  return (
    <Box
      display='flex'
      flexDirection='row'
      justifyContent='space-between'
      mb='4'
    >
      <Box w='full'>
        <Heading fontSize='3xl' fontWeight='500' mb='5'>
          Frequently Asked Questions
        </Heading>
        <Accordion allowMultiple>{renderFAQs()}</Accordion>
      </Box>
      <Box paddingLeft='20'>
        <Box
          borderWidth='1px'
          borderColor='blackAlpha.300'
          p='5'
          borderRadius='md'
        >
          <Text mb='5'>
            Don&lsquo;t see the answer to your question? Ask the project creator
            directly.
          </Text>
          <Button variant='primaryAlt'>Ask a Question</Button>
        </Box>
      </Box>
    </Box>
  );
};
