import { Flex, Box, Avatar, Badge, Text } from '@chakra-ui/react';
import React from 'react';

interface DescriptionProps {
    name: string;
    img: string;
    degree?: string;
    position?: string;
}

export const Description: React.FC<DescriptionProps> = ({
    name,
    img,
    degree = 'Bachelors',
    position = 'UI Engineer',
}) => {
    return (
        <Flex>
            <Box
                borderWidth="1px"
                rounded="10px"
                shadow="1px 1px 3px rgba(0,0,0,0.3)"
                maxWidth={800}
                p={6}
                m="10px auto"
                display="flex"
                boxSize="100%"
            >
                <Avatar name={name} src={img} />
                <Box ml="5px">
                    <Text fontWeight="bold">
                        {name}
                        <Badge ml="1" colorScheme="green">
                            {degree}
                        </Badge>
                    </Text>
                    <Text fontSize="sm">{position}</Text>
                </Box>
            </Box>
        </Flex>
    );
};
