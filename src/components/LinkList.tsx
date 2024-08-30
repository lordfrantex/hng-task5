import { ReactElement, cloneElement } from 'react'
import { linkData } from './LinkCard';
import { Link } from '@/context/LinkContext';

type LinkListType = {
    color?: string;
    name: string;
    link?: string;
};

const LinkList = ({ link, name, color }: LinkListType) => {


    const getLink = linkData.find(link => link.name.includes(name))

    const modifiedIcon = (getLink && color) ? cloneElement(getLink?.icon as ReactElement, { color }) : getLink?.icon;
    return (
        <span>{modifiedIcon}</span>
    )
}

export default LinkList