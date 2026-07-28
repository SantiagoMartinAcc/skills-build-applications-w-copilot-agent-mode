"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("./models/user"));
const team_1 = __importDefault(require("./models/team"));
const activity_1 = __importDefault(require("./models/activity"));
const leaderboard_1 = __importDefault(require("./models/leaderboard"));
const workout_1 = __importDefault(require("./models/workout"));
const router = (0, express_1.Router)();
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
router.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-backend', apiBaseUrl });
});
router.get('/api/config', (_req, res) => {
    res.json({ apiBaseUrl, codespaceName: codespaceName || null });
});
router.get(['/api/users', '/api/users/'], async (_req, res) => {
    const users = await user_1.default.find({}).lean();
    res.json({ data: users, apiBaseUrl });
});
router.post(['/api/users', '/api/users/'], async (req, res) => {
    const newUser = await user_1.default.create(req.body);
    res.status(201).json({ data: newUser, apiBaseUrl });
});
router.get(['/api/teams', '/api/teams/'], async (_req, res) => {
    const teams = await team_1.default.find({}).lean();
    res.json({ data: teams, apiBaseUrl });
});
router.post(['/api/teams', '/api/teams/'], async (req, res) => {
    const newTeam = await team_1.default.create(req.body);
    res.status(201).json({ data: newTeam, apiBaseUrl });
});
router.get(['/api/activities', '/api/activities/'], async (_req, res) => {
    const activities = await activity_1.default.find({}).lean();
    res.json({ data: activities, apiBaseUrl });
});
router.post(['/api/activities', '/api/activities/'], async (req, res) => {
    const newActivity = await activity_1.default.create(req.body);
    res.status(201).json({ data: newActivity, apiBaseUrl });
});
router.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
    const leaderboard = await leaderboard_1.default.find({}).lean();
    res.json({ data: leaderboard, apiBaseUrl });
});
router.post(['/api/leaderboard', '/api/leaderboard/'], async (req, res) => {
    const newEntry = await leaderboard_1.default.create(req.body);
    res.status(201).json({ data: newEntry, apiBaseUrl });
});
router.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
    const workouts = await workout_1.default.find({}).lean();
    res.json({ data: workouts, apiBaseUrl });
});
router.post(['/api/workouts', '/api/workouts/'], async (req, res) => {
    const newWorkout = await workout_1.default.create(req.body);
    res.status(201).json({ data: newWorkout, apiBaseUrl });
});
exports.default = router;
