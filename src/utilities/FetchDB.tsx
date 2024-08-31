'use client'
import { ref, get } from 'firebase/database';
import { db } from '@/components/firebaseConfig'; // Adjust the import based on your project structure
import { useEffect, useState } from 'react';



const useFirebaseFetch = (path: string) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState('');

    // useEffect(() => {
    //     const fetchData = async () => {
    //         setLoading(true);
    //         try {
    //             const dbRef = ref(db, path);
    //             const snapshot = await get(dbRef);
    //             const fetchedData = snapshot.val();
    //             setData(fetchedData);
    //         } catch (err) {
    //             setError('Error');
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchData();
    // }, [path]);

    return { loading, data, error };
};

export default useFirebaseFetch;


