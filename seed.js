const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Place = require('./models/Place');
const Guide = require('./models/Guide');

dotenv.config();

const places = [
    {
        name: 'Taj Mahal',
        description: 'An ivory-white marble mausoleum on the south bank of the Yamuna river.',
        history: 'The Taj Mahal was commissioned by Shah Jahan in 1631, to be built in the memory of his wife Mumtaz Mahal.',
        importance: 'The Taj Mahal is considered to be the greatest architectural achievement in the whole range of Indo-Islamic architecture.',
        imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        location: 'Agra, Uttar Pradesh',
        tags: ['Heritage', 'Mughal', 'Wonder of World']
    },
    {
        name: 'Qutub Minar',
        description: 'A 73-meter tall tapering tower of five storeys, with a 14.3 metres base diameter.',
        history: 'Qutub-ud-din Aibak, the first Muslim ruler of Delhi, commenced construction of the Qutub Minar in 1200 AD.',
        importance: 'It is a UNESCO World Heritage Site and one of the finest examples of Indo-Islamic architecture.',
        imageUrl: 'https://images.unsplash.com/photo-1708658009292-8105b666d531?q=80&w=1200&auto=format&fit=crop',
        location: 'Delhi',
        tags: ['Heritage', 'UNESCO', 'Delhi']
    },
    {
        name: 'Red Fort',
        description: 'The main residence of the emperors of the Mughal dynasty for nearly 200 years.',
        history: 'Constructed by Shah Jahan in 1639, the Red Fort was the palace for his new capital, Shahjahanabad.',
        importance: 'It represents the pinnacle of Mughal architectural creativity under Shah Jahan.',
        imageUrl: 'https://images.unsplash.com/photo-1713729991304-d0b6c328560e?q=80&w=1200&auto=format&fit=crop',
        location: 'Delhi',
        tags: ['History', 'Mughal', 'Architecture']
    }
];

const guides = [
    {
        name: 'Arjun Sharma',
        experience: 5,
        languages: ['English', 'Hindi'],
        imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=60'
    },
    {
        name: 'Priya Verma',
        experience: 2,
        languages: ['English', 'Hindi', 'Gujarati'],
        imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=60'
    },
    {
        name: 'Vikram Singh',
        experience: 10,
        languages: ['English', 'Hindi', 'Punjabi'],
        imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=60'
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/itihasyatra');

        await Place.deleteMany({});
        await Guide.deleteMany({});

        await Place.insertMany(places);
        await Guide.insertMany(guides);

        console.log('Database Seeded Successfully!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();
