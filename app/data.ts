const generateUsers = () => {
    const now = new Date();
    return [
        {
            id: 1,
            name: 'Colleen',
            image: '/1.jpg',
            message: "Hey! Just finished that new game you recommended. It's absolutely amazing! 🎮",
            timestamp: now,
            username: '@colleen_gaming',
            bio: 'Professional Gamer & Streamer',

            messages: [
                {
                    text: "Just wrapped up an intense streaming session! The new update is incredible. Have you tried the new features yet?",
                    timestamp: new Date(now.getTime() - 30 * 60 * 1000),
                    sender: 'Colleen',
                    senderId: 1
                },

            ]
        },
        {
            id: 2,
            name: 'Max',
            image: '/2.jpg',
            message: "The project deadline is approaching. Can we schedule a quick review? 📊",
            timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000),
            username: '@max_tech',
            bio: 'Senior Software Developer',

            messages: [
                {
                    text: "I've pushed the latest changes to the repository. The new authentication system is looking solid!",
                    timestamp: new Date(now.getTime() - 3 * 60 * 60 * 1000),
                    sender: 'Max',
                    senderId: 2
                },

            ]
        },
        {
            id: 3,
            name: 'Soham',
            image: '/3.jpg',
            message: "The designs for the new campaign are ready for review! 🎨",
            timestamp: new Date(now.getTime() - 4 * 60 * 60 * 1000),
            username: '@soham_designs',
            bio: 'Creative Director & UI/UX Designer',

            messages: [
                {
                    text: "Just finished the mockups for the landing page. The new color scheme really pops!",
                    timestamp: new Date(now.getTime() - 5 * 60 * 60 * 1000),
                    sender: 'Soham',
                    senderId: 3
                },

            ]
        },
        {
            id: 4,
            name: 'Kristin',
            image: '/4.jpg',
            message: "Meeting notes from today's client presentation are ready 📝",
            timestamp: new Date(now.getTime() - 6 * 60 * 60 * 1000),
            username: '@kristin_pm',
            bio: 'Project Manager',

            messages: [
                {
                    text: "Great presentation today! The client was really impressed with our progress.",
                    timestamp: new Date(now.getTime() - 7 * 60 * 60 * 1000),
                    sender: 'Kristin',
                    senderId: 4
                },

            ]
        },
        {
            id: 5,
            name: 'Eduardo',
            image: '/5.jpg',
            message: "New marketing analytics report is ready for review 📈",
            timestamp: new Date(now.getTime() - 23 * 60 * 60 * 1000),
            username: '@eduardo_marketing',
            bio: 'Marketing Analytics Lead',

            messages: [
                {
                    text: "The latest campaign metrics are looking promising. Conversion rates are up by 25%!",
                    timestamp: new Date(now.getTime() - 24 * 60 * 60 * 1000),
                    sender: 'Eduardo',
                    senderId: 5
                },

            ]
        },
        {
            id: 6,
            name: 'Dianne',
            image: '/6.jpg',
            message: "Updated the user research findings with new insights 🔍",
            timestamp: new Date(now.getTime() - 24 * 60 * 60 * 1000),
            username: '@dianne_ux',
            bio: 'UX Research Lead',

            messages: [
                {
                    text: "The user testing sessions revealed some interesting patterns in navigation behavior.",
                    timestamp: new Date(now.getTime() - 25 * 60 * 60 * 1000),
                    sender: 'Dianne',
                    senderId: 6
                },

            ]
        }
    ];
};

export default generateUsers;