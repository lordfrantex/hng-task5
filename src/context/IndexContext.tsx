import { ReactNode } from 'react';
import LinkContextProvider from './LinkContext';

type IndexContextProps = {
    children: ReactNode;
};

const IndexContext = ({ children }: IndexContextProps) => {
    return (
        <LinkContextProvider>{children}</LinkContextProvider>
    );
};

export default IndexContext;
