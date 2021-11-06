import { Avatar, AvatarGroup } from '@chakra-ui/avatar';
import React, { useCallback, useState } from 'react';
import { NavBar } from 'src/components/NavBar';
import { ProjectProps } from 'src/components/Project';
import { Projects } from 'src/components/Projects';
import { andrewImg, charlieImg, trevorImg } from 'src/utils/constants';

const projects: ProjectProps[] = [
    {
        name: "Conway's Game of Life",
        img: andrewImg,
        link: 'conway',
        desc: 'Classic game of life with react.',
        authors: ['Andrew'],
    },
];
for (let i = 0; i < 3; i++) {
    projects.push({
        name: 'Charlie',
        img: andrewImg,
        link: 'god',
        desc: 'A direct access to the realm of gods',
        authors: ['Charlie'],
    });
}
for (let i = 0; i < 4; i++) {
    projects.push({
        name: 'Trevor',
        img: andrewImg,
        link: 'god',
        desc: 'A direct access to the realm of gods',
        authors: ['Trevor'],
    });
}
const Index = () => {
    const [proj] = useState(projects);
    const [filterProjects, setFilteredProjects] = useState(projects);

    const filterByAuthor = useCallback(
        (author: string) => {
            setFilteredProjects(
                proj.filter((p) => p.authors.find((a) => a === author))
            );
        },
        [proj]
    );
    return (
        <>
            <NavBar />
            <AvatarGroup spacing="10px">
                <Avatar
                    name="Andrew"
                    src={andrewImg}
                    className="pfp"
                    onClick={() => filterByAuthor('Andrew')}
                />
                <Avatar
                    name="Charlie"
                    src={charlieImg}
                    className="pfp"
                    onClick={() => filterByAuthor('Charlie')}
                />
                <Avatar
                    name="Trevor"
                    src={trevorImg}
                    className="pfp"
                    onClick={() => filterByAuthor('Trevor')}
                />
            </AvatarGroup>
            <Projects items={filterProjects} />
        </>
    );
};
export default Index;
