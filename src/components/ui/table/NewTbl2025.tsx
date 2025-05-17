import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Sample JSON data
const cardsData = [
    { title: 'Champions League top scorers and match highlights' },
    { title: 'How come orange juice prices have dropped?' },
    { title: 'Give me ideas for what to do with my kids’ art' },
    { title: 'Help me study vocabulary for a college entrance exam' },
    { title: 'How are oil prices impacting global energy markets' },
    { title: 'Test my knowledge on ancient civilizations' },
    { title: 'Write an email to request a quote from local plumbers' },
    { title: 'Cycling groups open to beginners' },
    { title: 'Write a Python script to automate sending daily reports' },
    { title: 'Plan a trip to experience Seoul like a local' },
    { title: 'Latest EU inflation data and economic forecast' },
    // Add more as needed
];

const fadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.05,
            duration: 0.4,
        },
    }),
};

export default function SoraCards() {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        // Simulate JSON loading
        setTimeout(() => {
            setCards(cardsData);
        }, 300);
    }, []);

    return (
        <div className="min-h-screen bg-black text-white flex justify-center items-center px-4 py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl w-full">
                {cards.map((card, index) => (
                    <motion.div
                        key={index}
                        className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-sm hover:bg-zinc-800 transition-colors cursor-pointer shadow-md"
                        variants={fadeIn}
                        initial="hidden"
                        animate="visible"
                        custom={index}
                    >
                        {card.title}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
