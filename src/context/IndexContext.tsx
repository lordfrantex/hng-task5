import { ReactNode } from 'react';
import LinkContextProvider from './LinkContext';
import AuthContextProvider from './AuthContext';

type IndexContextProps = {
    children: ReactNode;
};

const IndexContext = ({ children }: IndexContextProps) => {
    return (
        <LinkContextProvider>
            <AuthContextProvider>
                {children}
            </AuthContextProvider>
        </LinkContextProvider>
    );
};

export default IndexContext;
