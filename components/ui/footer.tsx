import React from 'react';
import Image from 'next/image';

export const Footer=()=>{
    return(
        <footer className="flex justify-between text-black py-4 text-center border-t p-10">
            <div className='flex flex-row items-center'>
              <Image src="/git3.png" alt="Logo" width={38} height={38} />
              <div>-trace</div>
            </div>
            <p className="flex items-center text-sm cursor-pointer hover:underline  text-muted-foreground" >About</p>
            <p className="flex items-center text-sm cursor-pointer hover:underline  text-muted-foreground">Contribute</p>
            <p className="flex items-center text-sm cursor-pointer hover:underline  text-muted-foreground">Report an Issue</p>
            <p className="flex items-center text-sm cursor-pointer hover:underline  text-muted-foreground">Request a Feature</p>

      </footer>
    )
}