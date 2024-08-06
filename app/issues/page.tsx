import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react'

const IssuesPage = () => {
  return (
    <div>
      <Button size="3" variant="soft" color="red">
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </div>
  );
}

export default IssuesPage;
