import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const Footer=()=>{
    return(
        <footer className="flex justify-between text-black py-4 text-center border-t p-10">
            <div className='flex flex-row items-center'>
              <Image src="/git3.png" alt="Logo" width={38} height={38} />
              <div>-trace</div>
            </div>
            <p className="flex items-center text-sm cursor-pointer hover:underline  text-muted-foreground" ><Link href={'https://github.com/rahulsainlll/git-trace/blob/main/README.md'}>About</Link></p>
            <p className="flex items-center text-sm cursor-pointer hover:underline  text-muted-foreground"><Link href={'https://github.com/rahulsainlll/git-trace/blob/main/CONTRIBUTING.md'}>Contribute</Link></p>
            <p className="flex items-center text-sm cursor-pointer hover:underline  text-muted-foreground"><Link href={'https://github.com/rahulsainlll/git-trace/issues/new'}>Report an Issue</Link></p>
            <p className="flex items-center text-sm cursor-pointer hover:underline  text-muted-foreground"><Link href={'https://github.com/rahulsainlll/git-trace/issues/new'}>Request a Feature</Link></p>

      </footer>
    )
}