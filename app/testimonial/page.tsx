"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useTheme } from "next-themes";
import profile from '@/public/profilePic.jpg'


type TestimonialItem = {
    img: string;
    stars: string;
    text: string;
    name: string;
};

const Testimonial: React.FC = () => {
    const { theme } = useTheme();
    const [active, setActive] = useState<number>(3); // Define 'active' as a number
    const items: TestimonialItem[] = [
        {
            img: "",
            stars: "★★★★★",
            text: "Git-trace has been an absolute lifesaver for managing my GitHub projects. The ability to search for repositories and view issues effortlessly has streamlined my workflow, developer or working on a team, Git-trace is an essential tool for anyone serious about project management!",
            name: "- Siddharth Verma"
        },
        {
            img: "",
            stars: "★★★★★",
            text: "Using Git-trace has made tracking my GitHub repositories so much easier. The search and bookmarking features are incredibly helpful for staying organized, and I love how quickly I can view issues related to my favorite projects. It's a must-have tool for developers who want to stay on top of their repositories!",
            name: "- Aditi Rao"
        },
        {
            img: "",
            stars: "★★★★★",
            text: "Git-trace is a fantastic tool for anyone working with GitHub. The ability to bookmark repositories and issues has saved me so much time. I can quickly access all the projects I’m following without hassle. The platform is user-friendly, and I highly recommend it to all developers looking for better project management solutions.",
            name: "- Raj Malhotra"
        },
        {
            img: "",
            stars: "★★★★",
            text: "Git-trace has significantly improved the way I manage my GitHub repositories. The bookmarking feature helps me keep track of important issues, and the search functionality is fast and reliable. It’s a handy tool for anyone who regularly works with GitHub!",
            name: "- Meera Nair"
        },
        {
            img: "",
            stars: "★★★★★",
            text: "Git-trace has completely changed how I manage my projects on GitHub. The search functionality is super fast, and being able to bookmark repositories and issues means I never lose track of anything important. It’s a must-have for any developer looking to boost productivity!",
            name: "- Ankit Joshi"
        },
        {
            img: "",
            stars: "★★★★★",
            text: "With Git-trace, I can effortlessly keep tabs on all my repositories and issues. The bookmarking feature is incredibly helpful, and the simple interface makes everything easy to navigate. Whether I’m searching for new repositories or revisiting old ones, Git-trace makes it all so smooth.",
            name: "- Shruti Kulkarni"
        },
        {
            img: "",
            stars: "★★★★★",
            text: "Managing multiple repositories has never been easier! Git-trace makes it a breeze to search for repositories and issues, and the bookmarking feature ensures I don’t lose track of anything. It’s now one of my go-to tools for organizing my GitHub work.",
            name: "- Vikram Sinha"
        },
        {
            img: "",
            stars: "★★★★",
            text: "Git-trace is a fantastic tool for anyone working with GitHub repositories. The ability to view issues and bookmark repositories has made my workflow much more efficient. The only thing I'd love to see is a dark mode option, but otherwise, it’s perfect for tracking multiple projects!",
            name: "- Preeti Menon"
        }
    ];



    useEffect(() => {
        const interval = setInterval(() => {
            setActive(prev => (prev + 1) % items.length);
        }, 2500);

        return () => clearInterval(interval);
    }, [items.length]);

    useEffect(() => {
        loadShow();
    }, [active]);

    const loadShow = (): void => {
        const itemsElement = document.querySelectorAll<HTMLElement>('.slider .item');
        if (!itemsElement || itemsElement.length === 0) return;

        itemsElement[active].style.transform = `none`;
        itemsElement[active].style.zIndex = "1";
        itemsElement[active].style.filter = 'none';
        itemsElement[active].style.opacity = "1";

        // Show after
        let stt = 0;
        for (let i = active + 1; i < itemsElement.length; i++) {
            stt++;
            itemsElement[i].style.transform = `translateX(${120 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(-1deg)`;
            itemsElement[i].style.zIndex = "0";
            itemsElement[i].style.filter = 'blur(5px)';
            itemsElement[i].style.opacity = stt > 2 ? "0" : "0.6";
        }
        stt = 0;
        for (let i = (active - 1); i >= 0; i--) {
            stt++;
            itemsElement[i].style.transform = `translateX(${-120 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(1deg)`;
            itemsElement[i].style.zIndex = "0";
            itemsElement[i].style.filter = 'blur(5px)';
            itemsElement[i].style.opacity = stt > 2 ? "0" : "0.6";
        }
    };

    return (
        <div className='mt-8'>
            <h1 className={`text-center text-3xl font-bold ${theme === 'light' ? 'text-black' : 'text-white'}`}>See what our client say&apos;s about us </h1>
            <div className="slider" style={{ position: 'relative', marginTop: '100px', width: '100%', height: '550px', overflow: 'hidden' }}>
                {items.map((item, index) => (
                    <div className={`item max-sm:!w-[300px] max-sm:!h-[430px] bg-gradient-to-br from-gray-700 to-gray-900 text-white'} `} key={index} style={{
                        position: 'absolute',
                        width: '320px',
                        height: '420px',
                        textAlign: 'justify',
                        borderRadius: '12px',
                        padding: '20px',
                        transition: '0.5s',
                        left: 'calc(50% - 150px)',
                        top: '0',
                        marginBottom: '100px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                        overflow: 'hidden',
                    }}>

                        <Image
                            src={profile}
                            alt="User Avatar"
                            width={150}
                            height={150}
                            className="rounded-lg object-cover cursor-pointer max-sm:h-[120px] mb-0"
                            style={{
                                transition: 'transform 0.3s ease, filter 0.3s ease',
                                border: '3px solid #d0e7b0'
                            }}
                            onMouseOver={(e) => {
                                (e.currentTarget as HTMLElement).style.transform = 'scale(1.1)';
                                (e.currentTarget as HTMLElement).style.filter = 'brightness(1.1)';
                            }}
                            onMouseOut={(e) => {
                                (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                                (e.currentTarget as HTMLElement).style.filter = 'brightness(1)';
                            }}
                        />
                        <div className="stars text-[#ffd700] text-2xl mt-auto max-sm:mt-2">{item.stars}</div>
                        <p className={`text-justify max-sm:text-xs max-sm:mb-0 text-[0.8rem] text-white`}>{item.text}</p>
                        <h2 className={`mb-[10px] text-xl font-semibold max-sm:mb-1 max-sm:text-lg text-white`}>{item.name}</h2>
                    </div>
                ))}
                <button id="next" className='absolute top-[40%] text-blue-900 bg-none border-none text-6xl font-mono font-bold opacity-80 transition-opacity z-10 right-[50px] max-sm:text-white max-sm:text-2xl max-sm:right-2' onClick={() => setActive(prev => (prev + 1 < items.length ? prev + 1 : prev))}>{">>"}</button>
                <button id="prev" className='absolute top-[40%] text-blue-900 bg-none border-none text-6xl font-mono font-bold opacity-80 transition-opacity z-10 left-[50px] max-sm:text-white max-sm:text-2xl max-sm:left-2' onClick={() => setActive(prev => (prev - 1 >= 0 ? prev - 1 : prev))}>{"<<"}</button>
            </div>
        </div>
    );
};

export default Testimonial