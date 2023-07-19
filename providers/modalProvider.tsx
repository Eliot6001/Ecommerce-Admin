"use client"


import { StoreModal } from '@/components/modals/storeModal';
import {useEffect, useState} from 'react'
/* Precaution to avoid hydration error in nextJS */
function modalProvider() {
    const [isMounted, setisMounted] = useState(false);
    useEffect(() => {setisMounted(true)}, [])
    if(!isMounted) return null;
   
    return (
        <>
            <StoreModal/>
        </>
    )
}

export default modalProvider;


/* Basically, */