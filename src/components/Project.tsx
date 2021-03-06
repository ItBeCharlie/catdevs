import { Heading, Image, LinkBox, LinkOverlay, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import { coder } from 'src/utils/constants';

export interface ProjectProps {
    name: string;
    img: string;
    link: string;
    desc: string;
    authors: coder[];
}

export const Project: React.FC<ProjectProps> = ({
    name,
    img,
    link,
    desc,
    authors,
}) => {
    let authorsString: string = '';
    authors.forEach((author) => {
        authorsString += ` ${author}`;
    });
    return (
        <LinkBox
            borderWidth='1px'
            rounded='10px'
            shadow='1px 1px 3px rgba(0,0,0,0.3)'
            maxWidth='sm'
            p={6}
            m='10px'
            as='article'
            className={authorsString}
            cursor='pointer'
        >
            <Heading as='h1' size='md'>
                <NextLink href={`/${link}`}>
                    <LinkOverlay>{name}</LinkOverlay>
                </NextLink>
            </Heading>
            <Image src={img} alt={name} />
            <Text fontSize='md'>{desc}</Text>
        </LinkBox>
    );
};
