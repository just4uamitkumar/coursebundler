import {
    Container,
    Heading, useDisclosure,Text,
    Stack, Table, TableContainer, Tbody, Td, Th, Thead,  Tr, Button
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { server } from '../../redux/store';
import Loader from '../Layout/Loader/Loader';
import AddStudentDrawer from './AddStudentDrawer';
import DeleteStudent from './DeleteStudent';
import { RiDeleteBin7Fill, RiEdit2Fill } from 'react-icons/ri';
import EditStudentDrawer from './EditStudentDrawer';

const StudentDetail = () => {
    const [studentList, setStudentList] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState({});
    const [loading, setLoading] = useState(false);
    const [educationList, setEducationList] = useState([]);

    const { isOpen: isAddDrawerOpen, onOpen: AddDrawerOpen, onClose:AddDrawerClose  } = useDisclosure();
    const { isOpen: isDeleteModalOpen, onOpen: DeleteModalOpen, onClose: DeleteModalClose } = useDisclosure();
    const { isOpen: isEditDrawerOpen, onOpen: EditDrawerOpen, onClose: EditDrawerClose } = useDisclosure();

    const AddDrawerTitle = 'Add New Student';
    
   
    useEffect(() => {
        axios(`${server}/getEducations`).then(res => {
            setEducationList(res.data.educations)
        });
    }, []);

    const getData = async() => {
        const items = await axios.get(`${server}/students`);        
        setStudentList(items.data.students)
    }

    const deleteButtonHandler = (studentID) => {
        const student = studentList.filter(e => e._id === studentID)
        setSelectedStudent(student[0])
        DeleteModalOpen()
    }

    const EditButtonHandler = (studentID) => {
        const student = studentList.filter(e => e._id === studentID)
        setSelectedStudent(student[0])
        EditDrawerOpen();
    }

    useEffect(() => {
       setLoading(true)
        getData()
       setLoading(false) 
    }, [isAddDrawerOpen, isDeleteModalOpen, isEditDrawerOpen]);   

    return (
        <Container maxW={'container.lg'} padding="16" boxShadow={'lg'}>
            <Heading children="Student Details" textAlign={['center', 'left']} />
            <Stack m="8" direction={['column', 'row']} alignItems="center">
                <Button colorScheme='teal' onClick={AddDrawerOpen} >Add New Student</Button>
            </Stack>

            {
                loading ? <Loader/> :

                <Stack m="8" direction={['column', 'row']} alignItems="center">                
                <TableContainer w={['100vw', 'full']}>
                    <Table variant={'striped'} size="lg" colorScheme='teal'>
                            <Thead>
                                <Tr>
                                    <Th>Sr No.</Th>
                                    <Th>Name</Th>
                                    <Th isNumeric>Roll No</Th>
                                    <Th isNumeric>Age</Th>
                                    <Th>City</Th>
                                    <Th>Position</Th>
                                    <Th isNumeric>Experience</Th>
                                    <Th isNumeric>Salary</Th>
                                    <Th>Skills</Th>
                                    <Th>Favourite Skill</Th>
                                    <Th>Qualification</Th>
                                    <Th isNumeric>Percentage</Th>                                
                                    <Th>Action</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                            { studentList ? studentList.map((student, index) => (
                                <Tr key={index}>
                                    <Td>{index + 1}</Td>
                                    <Td>{student.firstName +' '+ student.lastName}</Td>
                                    <Td isNumeric>{student.rollNo}</Td>
                                    <Td isNumeric>{student.age}</Td>
                                    <Td>{'City'}</Td>
                                    <Td>{student.position}</Td>
                                    <Td isNumeric>{student.exprience}</Td>
                                    <Td isNumeric>{student.salary}</Td>
                                    <Td>{student.skills}</Td>
                                    <Td>{student.favSkill}</Td>
                                    <Td>{ educationList.find(el => el.value = student.qualification)?.name }</Td>
                                    <Td isNumeric>{student.percentage}</Td>
                                    <Td>
                                        <Button colorScheme='yellow' size={'sm'} onClick={() => EditButtonHandler(student._id)} >
                                            <RiEdit2Fill />
                                        </Button>
                                        <Button colorScheme='red' size={'sm'} 
                                            onClick={() => deleteButtonHandler(student._id)} ml={'3'} >
                                            <RiDeleteBin7Fill />
                                        </Button>
                                    </Td>
                                </Tr>
                            )) : 
                            <Tr>
                                <Td colSpan={13}><Text>No Data Found</Text></Td>
                            </Tr>
                            }
                        </Tbody>
                    </Table>
                </TableContainer>              
            </Stack>
            }

            { isAddDrawerOpen && 
                <AddStudentDrawer
                    isAddDrawerOpen={isAddDrawerOpen}
                    AddDrawerClose={AddDrawerClose}
                    title={AddDrawerTitle}
                    studentList={studentList}
                    educationList={educationList}
                />
            }            
            { isDeleteModalOpen && 
                <DeleteStudent
                    isDeleteModalOpen={isDeleteModalOpen}
                    DeleteModalClose={DeleteModalClose}
                    selectedStudent={selectedStudent}
                />
            } 

            { isEditDrawerOpen && 
                <EditStudentDrawer
                    isEditDrawerOpen={isEditDrawerOpen}
                    EditDrawerClose={EditDrawerClose}
                    selectedStudent={selectedStudent}
                    studentList={studentList}
                    educationList={educationList}
                />
            }  
        </Container>        
    );
};

export default StudentDetail;