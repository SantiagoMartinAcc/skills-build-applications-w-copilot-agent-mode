"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("../models/user"));
const team_1 = __importDefault(require("../models/team"));
const activity_1 = __importDefault(require("../models/activity"));
const leaderboard_1 = __importDefault(require("../models/leaderboard"));
const workout_1 = __importDefault(require("../models/workout"));
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            user_1.default.deleteMany({}),
            team_1.default.deleteMany({}),
            activity_1.default.deleteMany({}),
            leaderboard_1.default.deleteMany({}),
            workout_1.default.deleteMany({})
        ]);
        const users = await user_1.default.insertMany([
            {
                name: 'Ava Chen',
                email: 'ava.chen@example.com',
                fitnessGoal: 'Improve endurance',
                experienceLevel: 'Intermediate'
            },
            {
                name: 'Marcus Reed',
                email: 'marcus.reed@example.com',
                fitnessGoal: 'Build strength',
                experienceLevel: 'Advanced'
            },
            {
                name: 'Sofia Patel',
                email: 'sofia.patel@example.com',
                fitnessGoal: 'Lose weight',
                experienceLevel: 'Beginner'
            }
        ]);
        await team_1.default.insertMany([
            {
                name: 'Momentum Squad',
                description: 'A team focused on morning runs and consistency.',
                members: users.slice(0, 2).map((user) => user._id.toString())
            },
            {
                name: 'Power House',
                description: 'Strength-focused team for weekend lifting.',
                members: [users[2]._id.toString()]
            }
        ]);
        await activity_1.default.insertMany([
            {
                type: 'run',
                durationMinutes: 35,
                date: new Date('2026-07-20T06:30:00Z'),
                userId: users[0]._id.toString()
            },
            {
                type: 'strength',
                durationMinutes: 50,
                date: new Date('2026-07-21T18:00:00Z'),
                userId: users[1]._id.toString()
            },
            {
                type: 'yoga',
                durationMinutes: 25,
                date: new Date('2026-07-22T07:00:00Z'),
                userId: users[2]._id.toString()
            }
        ]);
        await leaderboard_1.default.insertMany([
            { userId: users[0]._id.toString(), score: 1420, rank: 1 },
            { userId: users[1]._id.toString(), score: 1360, rank: 2 },
            { userId: users[2]._id.toString(), score: 990, rank: 3 }
        ]);
        await workout_1.default.insertMany([
            {
                name: 'Tempo Run',
                focus: 'Cardio',
                durationMinutes: 40,
                difficulty: 'Intermediate'
            },
            {
                name: 'Upper Body Strength',
                focus: 'Strength',
                durationMinutes: 45,
                difficulty: 'Advanced'
            },
            {
                name: 'Mobility Flow',
                focus: 'Recovery',
                durationMinutes: 20,
                difficulty: 'Beginner'
            }
        ]);
        console.log('Database seeding complete');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
