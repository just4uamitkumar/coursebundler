import {
    Container,
    Heading,
    Stack,
    Text,Table, TableCaption, TableContainer, Tbody, Td, Th, Thead,  Tr,
} from '@chakra-ui/react';

import React, { useState } from 'react';
import { useEffect } from 'react';


const JsCode = () => {
    let time = new Date().toLocaleTimeString();
    const [currentTime, setCurrentTime] = useState(time);
    const [extTime, setExtTimesetL] = useState(time);
    const [data, setData] = useState([])

    const numArr = [11, 33, 66, 55, 77];

    //Get median of array
    const median = arr => {
        const mid = Math.floor(arr.length / 2);
        const nums = [...arr].sort((a, b) => a - b);
        return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
    };

    const UpdateTime = () => {
        const time = new Date().toLocaleTimeString();
        const dt = new Date();
        const ext = new Date(dt.getTime() + 30 * 60 * 1000)
        const newTime = ext.toLocaleTimeString();
        setCurrentTime(time)
        setExtTimesetL(newTime)
    }    

    setInterval(UpdateTime);

    const initArr = [
        { name: 'aa', age: 23}, { name: 'aa', location: 'HYD'},
        { name: 'bb', age: 25}, { name: 'bb', location: 'BLR'}
    ];

    const filterArr = (ab) => {
        const ageData = ab.filter(item => item.age ? item : null);
        const locationData = ab.filter(item => item.location ? item : null);

        const finalArr = [];

        ageData.filter(age => {
            locationData.filter(location => {
                if(age.name === location.name){
                    age.location = location.location;
                    finalArr.push(age);                    	
                }
            })
        });
        setData(finalArr)

    }
    useEffect(() => {
        filterArr(initArr)
    }, []);

   

    return (
        <Container maxW={'container.lg'} padding="16" boxShadow={'lg'}>
            <Heading children="Javascript Code" textAlign={['center', 'left']} />
            <Text>Current Time : {currentTime}</Text>
            <Text>Extended Time : {extTime}</Text>
            <Text>Median of the array : {median(numArr)}</Text>

            <Stack m="8" direction={['column', 'row']} alignItems="center">                
                <TableContainer w={['100vw', 'full']}>
                    <Table variant={'simple'} size="lg">
                        <TableCaption>Data Table </TableCaption>
                            <Thead>
                            <Tr>
                                <Th>Sr No.</Th>
                                <Th>Name</Th>
                                <Th>Age</Th>
                                <Th>Location</Th>
                                <Th>Action</Th>
                            </Tr>
                            </Thead>
                            <Tbody>
                            {data.map((item, index) => (
                                <Tr key={index}>
                                    <Td>{index + 1}</Td>
                                    <Td>{item.name}</Td>
                                    <Td>{item.age}</Td>
                                    <Td>{item.location}</Td>
                                    <Td>Delete</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>              
            </Stack>

        </Container>
    );
};

export default JsCode;