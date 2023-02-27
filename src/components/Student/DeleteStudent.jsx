import { Button, AlertDialog, AlertDialogBody,
  AlertDialogFooter, AlertDialogHeader, AlertDialogContent,
  AlertDialogOverlay } from '@chakra-ui/react';
import React, { memo } from 'react';
import { server } from '../../redux/store';
import axios from 'axios';
import toast from 'react-hot-toast';

function DeleteStudent({isDeleteModalOpen,  DeleteModalClose, selectedStudent }) {
  
  const handleDelete = (event, id) => {
    
    event.preventDefault();
    const config = {
      withCredentials: true,
    };

    if(!id){
      return
    }
    else{
      axios.delete(`${server}/student/${id}`, config).then(res => {
        toast.success('Student Deleted Successfully');      
        DeleteModalClose();
      }).catch( err => {
        toast.error(err);
      }); 
    }
  };

  return (
    <>
      <AlertDialog
        isOpen={isDeleteModalOpen}
        onClose={DeleteModalClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Remove Student
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You are removing  <strong>{selectedStudent.firstName} {selectedStudent.lastName}</strong> from stuednt list.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={DeleteModalClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={(event) => handleDelete(event, selectedStudent?._id)} ml={3}>
                Delete Student
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default memo(DeleteStudent);
