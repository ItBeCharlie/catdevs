import { Avatar, AvatarGroup } from '@chakra-ui/avatar';
import { NavBar } from 'src/components/NavBar';
import React from 'react';
import { ProjectProps } from 'src/components/Project';
import { andrewImg, charlieImg, trevorImg } from 'src/utils/constants';
import { Projects } from 'src/components/Projects';

const Index = () => {
    const projects: ProjectProps[] = [
        {
            name: 'Andrew',
            img: andrewImg,
            link: 'god',
            desc: 'A direct access to the realm of gods',
            authors: ['Andrew'],
        },
    ];
    for (let i = 0; i < 10; i++) {
        projects.push({
            name: 'Andrew',
            img: andrewImg,
            link: 'god',
            desc: 'A direct access to the realm of gods',
            authors: ['Charlie', 'Trevor'],
        });
    }
    return (
        <>
            <NavBar />
            <AvatarGroup spacing="10px">
                <Avatar
                    name="Andrew"
                    src={andrewImg}
                    className="pfp"
                    onClick={() => {}}
                />
                <Avatar
                    name="Charlie"
                    src={charlieImg}
                    className="pfp"
                    onClick={() => {}}
                />
                <Avatar
                    name="Trevor"
                    src={trevorImg}
                    className="pfp"
                    onClick={() => {}}
                />
            </AvatarGroup>
            <Projects items={projects} />
        </>
    );
};
export default Index;
