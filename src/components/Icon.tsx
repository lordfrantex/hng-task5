import Image from 'next/image'
interface IconProps {
    src: string;
    fill?: string;
    stroke?: string;
}

const Icon: React.FC<IconProps> = ({ src, fill, stroke }) => {
    return (
        <Image src={src} alt='' width={16} height={16} />
    )
}

export default Icon