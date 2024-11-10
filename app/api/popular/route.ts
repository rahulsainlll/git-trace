import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
    const url = 'https://api.github.com/search/repositories?q=stars:>10000&sort=stars';
    try {
        const response = await axios.get(url);
        const repositories = response.data.items;
        return NextResponse.json(repositories); // This contains the most popular repositories
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch repositories' }, 
            { status: 500 }
        );
    }
}

GET().then(repos => {
    console.log(repos);
});