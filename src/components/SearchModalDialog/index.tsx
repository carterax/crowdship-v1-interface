import Image from 'next/image';
import { useReactiveVar } from '@apollo/client';
import { useState, useRef, useCallback, KeyboardEvent, useMemo } from 'react';
import {
  Box,
  HStack,
  Center,
  Text,
  Kbd,
  InputGroup,
  InputLeftElement,
  Input,
  useEventListener,
  useUpdateEffect,
} from '@chakra-ui/react';
import scrollIntoView from 'scroll-into-view-if-needed';
import MultiRef from 'react-multi-ref';

import { ModalDialog } from '@/components/ModalDialog';

import { globalStore } from '@/stores';

export const SearchModalDialog = () => {
  const [query, setQuery] = useState('');
  const [openSearchTray, setOpenSearchTray] = useState(false);
  const { openSearchDialog } = useReactiveVar(globalStore);
  const eventRef = useRef<'mouse' | 'keyboard' | null>(null);
  const [active, setActive] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuNodes] = useState(() => new MultiRef<number, HTMLElement>());

  const results = useMemo(() => {
    return [
      {
        image: '/demo.jpg',
        header: 'Mountain Climbers',
        subheader: '25% complete',
      },
      {
        image: '/demo.jpg',
        header: 'Mountain Climbers',
        subheader: '25% complete',
      },
      {
        image: '/demo.jpg',
        header: 'Mountain Climbers',
        subheader: '25% complete',
      },
      {
        image: '/demo.jpg',
        header: 'Mountain Climbers',
        subheader: '25% complete',
      },
      {
        image: '/demo.jpg',
        header: 'Mountain Climbers',
        subheader: '25% complete',
      },
      {
        image: '/demo.jpg',
        header: 'Mountain Climbers',
        subheader: '25% complete',
      },
      {
        image: '/demo.jpg',
        header: 'Mountain Climbers',
        subheader: '25% complete',
      },
      {
        image: '/demo.jpg',
        header: 'Mountain Climbers',
        subheader: '25% complete',
      },
      {
        image: '/demo.jpg',
        header: 'Mountain Climbers',
        subheader: '25% complete',
      },
      {
        image: '/demo.jpg',
        header: 'Mountain Climbers',
        subheader: '25% complete',
      },
      {
        image: '/demo.jpg',
        header: 'Mountain Climbers',
        subheader: '25% complete',
      },
      {
        image: '/demo.jpg',
        header: 'Mountain Climbers',
        subheader: '25% complete',
      },
      {
        image: '/demo.jpg',
        header: 'Mountain Climbers',
        subheader: '25% complete',
      },
      {
        image: '/demo.jpg',
        header: 'Mountain Climbers',
        subheader: '25% complete',
      },
      {
        image: '/demo.jpg',
        header: 'Mountain Climbers',
        subheader: '25% complete',
      },
    ];
  }, []);

  const closeModal = () =>
    globalStore({ ...globalStore(), openSearchDialog: false });

  useUpdateEffect(() => {
    setActive(0);
  }, [query]);

  useUpdateEffect(() => {
    if (!menuRef.current || eventRef.current === 'mouse') return;
    const node = menuNodes.map.get(active);
    if (!node) return;

    scrollIntoView(node, {
      behavior: 'smooth',
      scrollMode: 'if-needed',
      block: 'nearest',
      inline: 'nearest',
      boundary: menuRef.current,
    });
  }, [active]);

  useEventListener('keydown', (event) => {
    const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator?.platform);
    const hotkey = isMac ? 'metaKey' : 'ctrlKey';
    if (event?.key?.toLowerCase() === 'k' && event[hotkey]) {
      event.preventDefault();
      if (openSearchDialog) {
        globalStore({ ...globalStore(), openSearchDialog: false });
      } else {
        globalStore({ ...globalStore(), openSearchDialog: true });
      }
    }
  });

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      eventRef.current = 'keyboard';
      switch (e.key) {
        case 'ArrowDown': {
          e.preventDefault();
          if (active + 1 < results.length) {
            setActive(active + 1);
          }
          break;
        }
        case 'ArrowUp': {
          e.preventDefault();
          if (active - 1 >= 0) {
            setActive(active - 1);
          }
          break;
        }
        case 'Enter': {
          closeModal();
          break;
        }
        default:
          break;
      }
    },
    [active, results]
  );

  return (
    <>
      <ModalDialog
        isCentered={false}
        backgroundColor='transparent'
        boxShadow='none'
        closeOnEsc
        closeOnOverlayClick
        blockScrollOnMount={true}
        size='2xl'
        onClose={() => closeModal()}
        overlayBgColor='blackAlpha.6s00'
        isOpen={openSearchDialog}
      >
        <Center>
          <Box
            display='flex'
            alignItems='center'
            justifyContent='center'
            flexDirection='column'
            mt={10}
            w='full'
          >
            <Box
              w='full'
              backgroundColor='white'
              borderRadius='lg'
              overflow='hidden'
            >
              <InputGroup
                size='lg'
                borderBottom='1px rgba(0, 0, 0, 0.08)'
                borderBottomStyle='solid'
                backgroundColor='white'
                padding={2}
              >
                <InputLeftElement mt='2' ml='2'>
                  <Image
                    src='/modal-search.svg'
                    height='23'
                    width='23'
                    alt='search icon'
                  />
                </InputLeftElement>
                <Input
                  id='search'
                  _placeholder={{ color: 'blackAlpha.900' }}
                  placeholder='Search Campaigns'
                  fontSize='24px'
                  border='none'
                  _focus={{
                    boxShadow: 'none',
                  }}
                  onKeyDown={onKeyDown}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    if (e.target.value.length) {
                      setOpenSearchTray(true);
                    } else {
                      setOpenSearchTray(false);
                    }
                  }}
                />
              </InputGroup>
              {openSearchTray ? (
                <Box
                  borderBottom='1px rgba(0, 0, 0, 0.08)'
                  borderBottomStyle='solid'
                  padding='15px 24px'
                  overflow='auto'
                  maxH='66vh'
                  ref={menuRef}
                >
                  {results.map(({ image, header, subheader }, idx) => {
                    return (
                      <Box
                        key={idx}
                        display='flex'
                        alignItems='center'
                        p='10px'
                        mb={idx !== results.length - 1 ? 2 : 0}
                        backgroundColor={
                          active === idx ? 'yellow.200' : 'gray.50'
                        }
                        onMouseEnter={() => {
                          setActive(idx);
                          eventRef.current = 'mouse';
                        }}
                        ref={menuNodes.ref(idx)}
                        onClick={() => closeModal()}
                        className='campaign-search-card'
                        borderRadius='lg'
                        cursor='pointer'
                      >
                        <Box mr={4}>
                          <Image
                            src={image}
                            alt={header}
                            width='40'
                            height='40'
                            objectFit='cover'
                            className='rounded-lg'
                          />
                        </Box>
                        <Box
                          display='flex'
                          alignItems='center'
                          justifyContent='space-between'
                          w='full'
                        >
                          <Box>
                            <Text fontWeight='600'>{header}</Text>
                            <Text color='blackAlpha.700' fontSize='13px'>
                              {subheader}
                            </Text>
                          </Box>
                          {active === idx ? (
                            <Box>
                              <Text fontSize='13px' as='span'>
                                Enter
                              </Text>
                              <Kbd
                                borderColor='#E8E8E8'
                                backgroundColor='white'
                                fontWeight='700'
                                fontSize='17px'
                                color='blackAlpha.600'
                                ml={1}
                              >
                                ↵
                              </Kbd>
                            </Box>
                          ) : (
                            ''
                          )}
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              ) : null}
              <Box w='full' padding='10px 20px' backgroundColor='gray.50'>
                <HStack justifyContent='space-between'>
                  <Box
                    display='flex'
                    alignItems='center'
                    color='blackAlpha.600'
                  >
                    <Kbd
                      mr={1}
                      borderColor='#E8E8E8'
                      backgroundColor='white'
                      fontWeight='700'
                      fontSize='17px'
                    >
                      ↑
                    </Kbd>
                    <Kbd
                      mr={2}
                      borderColor='#E8E8E8'
                      backgroundColor='white'
                      fontWeight='700'
                      fontSize='17px'
                    >
                      ↓
                    </Kbd>
                    <Text color='blackAlpha.600'>Navigate</Text>
                  </Box>
                  <Box display='flex' alignItems='center'>
                    <Kbd
                      color='blackAlpha.600'
                      backgroundColor='white'
                      borderColor='#E8E8E8'
                      fontSize='17px'
                      fontWeight='400'
                      mr={2}
                    >
                      esc
                    </Kbd>
                    <Text color='blackAlpha.600'>Exit</Text>
                  </Box>
                </HStack>
              </Box>
            </Box>
          </Box>
        </Center>
      </ModalDialog>
    </>
  );
};
