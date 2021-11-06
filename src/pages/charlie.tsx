import { Box } from '@chakra-ui/react';
import React from 'react';
import { charlieImg } from 'src/utils/constants';
import { Description } from '../components/Description';

interface charlieProps {}

const charlie: React.FC<charlieProps> = ({}) => {
    return (
        <Box
            borderWidth="1px"
            rounded="10px"
            shadow="1px 1px 3px rgba(0,0,0,0.3)"
            maxWidth={800}
            p={6}
            m="10px auto"
        >
            My name is Charlie
            <Description
                name="Charlie DeGennaro"
                img={charlieImg}
                degree="Bachelors"
                position="Developer"
            />
        </Box>
    );
};

export default charlie;
