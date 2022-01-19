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
    {
        name: 'Path Visualizer',
        img: andrewImg,
        link: 'visualizer',
        desc: 'Path visualizer with maze generator.',
        authors: ['Andrew'],
    },
];
for (let i = 0; i < 3; i++) {
    projects.push({
        name: 'Charlie',
        img: charlieImg,
        link: 'peepee',
        desc: 'A direct access to the realm of sigmas',
        authors: ['Charlie'],
    });
}
for (let i = 0; i < 4; i++) {
    projects.push({
        name: 'Trevor',
        img: trevorImg,
        link: 'god',
        desc: 'Top sigma alpha gamer in the realm of sigmas',
        authors: ['Trevor'],
    });
}
const Index = () => {
    const [proj] = useState(projects);
    const [filterProjects, setFilteredProjects] = useState(projects);
    const [selectedAuthor, setSelectedAuthor] = useState('');

    // console.log(selectedAuthor);
    // useEffect(() => {

    // }, [selectedAuthor])

    const filterByAuthor = useCallback(
        (author: string) => {
            if (author === selectedAuthor) {
                setFilteredProjects(proj);
                setSelectedAuthor('');
                console.log(true);
            } else {
                setFilteredProjects(
                    proj.filter((p) => p.authors.find((a) => a === author))
                );
                setSelectedAuthor(author);
                console.log(false);
            }
            console.log(author, selectedAuthor);
        },
        [proj, selectedAuthor]
    );
    return (
        <>
            <NavBar />
            <AvatarGroup spacing='10px' ml='10px' mt='5px'>
                <Avatar
                    name='Charlie'
                    src={charlieImg}
                    className='pfp'
                    onClick={() => filterByAuthor('Charlie')}
                    style={{ cursor: 'pointer' }}
                />
                <Avatar
                    name='Andrew'
                    src={andrewImg}
                    className='pfp'
                    onClick={() => filterByAuthor('Andrew')}
                    style={{ cursor: 'pointer' }}
                />
                <Avatar
                    name='Trevor'
                    src={trevorImg}
                    className='pfp'
                    onClick={() => filterByAuthor('Trevor')}
                    style={{ cursor: 'pointer' }}
                />
            </AvatarGroup>
            <Projects items={filterProjects} />
        </>
    );
};
export default Index;
