import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export const Footer=()=>{
    return(
        <footer className="flex justify-between text-black py-4 text-center border-t p-10">
            <div className='flex flex-row items-center'>
              <Image src="/git3.png" alt="Logo" width={38} height={38} />
              <div>-trace</div>
            </div>
            <Button variant={"linkHover2"}>About</Button>
            <Button variant={"linkHover2"}>Contribute</Button>
            <Button variant={"linkHover2"}>Report an Issue</Button>
            <Button variant={"linkHover2"}>Request a Feature</Button>

      </footer>
    )
}