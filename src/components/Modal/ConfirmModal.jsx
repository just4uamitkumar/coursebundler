import {
    Box,
    Button,
    Grid,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    VStack, HStack, Text, useDisclosure
  } from '@chakra-ui/react';
  import React from 'react';
  import { useState } from 'react';
  
  const ConfirmModal = ({ modalTitle, handleSubmit, modalContent }) => {

    const { isOpen, onClose, onOpen } = useDisclosure();
    
    const handleClose = () => {
      onClose()
    }
  
    return (
      <Modal
        isOpen={isOpen}
        size="lg"
        onClose={handleClose}
      >
        <ModalOverlay />
  
        <ModalContent>
          <ModalHeader>{modalTitle}</ModalHeader>
          <ModalCloseButton />
  
          <ModalBody p="16">           
              <Grid templateColumns={['1fr', '1fr']} gap={10}>
                <Box>
                  <VStack spacing={'4'}>
                    <Text>{modalContent}</Text>
                  </VStack>
                </Box>                
              </Grid>            
              
              <Grid>
                <Box align='flex-end'>
                  <HStack spacing={'4'}>
                    <Button size={'md'} colorScheme="yellow" onClick={handleSubmit}>Submit</Button>
                  </HStack>
                </Box>
              </Grid>
          </ModalBody>
  
          <ModalFooter>
            <Button onClick={handleClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };
  
  export default ConfirmModal;