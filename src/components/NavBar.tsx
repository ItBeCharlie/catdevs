import { Box, Flex } from '@chakra-ui/layout';
import { Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import { andrewImg, charlieImg, trevorImg } from 'src/utils/constants';
import { Description } from './Description';

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
    const body = (
        <>
            <NextLink href="/andrew">
                <Link px="10px">
                    <Description
                        name="Andrew McDonald"
                        img={andrewImg}
                        degree="Bachelors"
                        position="UI Engineer"
                    />
                </Link>
            </NextLink>
            <NextLink href="/charlie">
                <Link px="10px">
                    <Description
                        name="Charlie Degennaro"
                        img={charlieImg}
                        degree="Bachelors"
                        position="Developer"
                    />
                </Link>
            </NextLink>
            <NextLink href="/trevor">
                <Link px="10px">
                    <Description
                        name="Trevor Brown"
                        img={trevorImg}
                        degree="Bachelors"
                        position="UI Engineer"
                    />
                </Link>
            </NextLink>
        </>
    );
    return (
        <Flex bg="tan" p={4}>
            <Box display="flex" textAlign="center" m="0 auto">
                {body}
            </Box>
        </Flex>
    );
};
