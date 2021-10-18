import { Box } from '@chakra-ui/react';
import React from 'react';
import { Description } from 'src/components/Description';
import { trevorImg } from 'src/utils/constants';

interface trevorProps {}

const trevor: React.FC<trevorProps> = ({}) => {
    return (
        <Box
            borderWidth="1px"
            rounded="10px"
            shadow="1px 1px 3px rgba(0,0,0,0.3)"
            maxWidth={800}
            p={6}
            m="10px auto"
        >
            My name is Trevor
            <Description
                name="Trevor Brown"
                img={trevorImg}
                degree="Bachelors"
                position="UI Engineer"
            />
        </Box>
    );
};

export default trevor;
