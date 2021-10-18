import { Box } from '@chakra-ui/react';
import React from 'react';
import { andrewImg } from 'src/utils/constants';
import { Description } from '../components/Description';

interface andrewProps {}

const andrew: React.FC<andrewProps> = ({}) => {
    return (
        <Box
            borderWidth="1px"
            rounded="10px"
            shadow="1px 1px 3px rgba(0,0,0,0.3)"
            maxWidth={800}
            p={6}
            m="10px auto"
        >
            My name is Andrew
            <Description
                name="Andrew McDonald"
                img={andrewImg}
                degree="Bachelors"
                position="UI Engineer"
            />
        </Box>
    );
};

export default andrew;
