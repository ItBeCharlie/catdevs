import { Wrap, WrapItem } from '@chakra-ui/layout';
import React from 'react';
import { Project, ProjectProps } from './Project';

interface ProjectsProps {
    items: ProjectProps[];
}

export const Projects: React.FC<ProjectsProps> = ({ items }) => {
    return (
        <Wrap spacing="30px" align="center">
            {items.map((item) => {
                return (
                    <WrapItem>
                        <Project
                            name={item.name}
                            img={item.img}
                            link={item.link}
                            desc={item.desc}
                            authors={item.authors}
                        />
                    </WrapItem>
                );
            })}
        </Wrap>
    );
};
