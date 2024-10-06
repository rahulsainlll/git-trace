import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';


export const Footer=()=>{
    return(
        <footer className="flex justify-between text-black py-4 text-center border-t p-10">
            <div className='flex flex-row items-center'>
              <Image src="/git3.png" alt="Logo" width={38} height={38} />
              <div>-trace</div>
            </div>
            <Button variant={"linkHover2"} asChild><Link href={'https://github.com/rahulsainlll/git-trace/blob/main/README.md'}>About</Link></Button>
            <Button variant={"linkHover2"} asChild><Link href={'https://github.com/rahulsainlll/git-trace/blob/main/CONTRIBUTING.md'}>Contribute</Link></Button>
            <Button variant={"linkHover2"} asChild><Link href={'https://github.com/rahulsainlll/git-trace/issues/new'}>Report an Issue</Link></Button>
            <Button variant={"linkHover2"} asChild><Link href={'https://github.com/rahulsainlll/git-trace/issues/new'}>Request a Feature</Link></Button>
      </footer>
    )
}