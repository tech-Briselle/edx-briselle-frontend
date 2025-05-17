import React from 'react';

const cardsData = [
    [
        'Champions League top scorers and match highlights',
        'How come orange juice prices have dropped?',
        'Give me ideas for what to do with my kids’ art',
        'Help me study vocabulary for a college entrance exam',
        'How are oil prices impacting global energy markets',
        'Test my knowledge on ancient civilizations',
    ],
    [
        'Write an email to request a quote from local plumbers',
        'Cycling groups open to beginners',
        'Write a Python script to automate sending daily reports',
        'Plan a trip to experience Seoul like a local',
        'Latest EU inflation data and economic forecast',
        'I want a noise-canceling headset for long flights',
    ],
    [
        'Good brunch spots near me with outdoor seating',
        'Design programming games that teach basics in a fun way',
        'NBA draft prospects and scouting report',
        'Explain nostalgia to a kindergartener',
        'Create a content calendar for a TikTok account',
    ],
];

const SoraMarquee = () => {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col gap-6 px-4 py-10 overflow-hidden">
            {cardsData.map((row, rowIndex) => {
                const isEven = rowIndex % 2 === 0;
                return (
                    <div
                        key={rowIndex}
                        className="relative w-full overflow-hidden whitespace-nowrap"
                    >
                        <div
                            className={`flex gap-4 animate-marquee ${isEven ? '' : 'animate-marquee-reverse'
                                }`}
                        >
                            {/* Repeat the row to create infinite effect */}
                            {[...row, ...row].map((item, i) => (
                                <div
                                    key={i}
                                    className="bg-zinc-900 border border-zinc-800 text-sm px-4 py-3 rounded-lg min-w-[280px] hover:bg-zinc-800 transition-colors cursor-pointer shadow"
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default SoraMarquee;
