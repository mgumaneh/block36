const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const seedData = async () => {
    try {
        // Create users
        await prisma.user.createMany({
            data: [
                { name: 'Alice', email: 'alice@example.com' },
                { name: 'Bob', email: 'bob@example.com' },
                { name: 'Charlie', email: 'charlie@example.com' },
            ],
        });

        // Fetch all users
        const users = await prisma.user.findMany();

        // Create playlists for each user
        for (const user of users) {
            for (let i = 1; i <= 5; i++) {
                await prisma.playlist.create({
                    data: {
                        title: `Playlist ${i} of ${user.name}`,
                        userId: user.id,
                    },
                });
            }
        }

        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await prisma.$disconnect();
    }
};

seedData();
