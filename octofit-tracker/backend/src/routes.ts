import { Router } from 'express';
import User from './models/user';
import Team from './models/team';
import Activity from './models/activity';
import LeaderboardEntry from './models/leaderboard';
import Workout from './models/workout';
import { getApiBaseUrl } from './server';

const router = Router();

router.get('/api/health', (_req, res) => {
  const apiBaseUrl = getApiBaseUrl();
  res.json({ status: 'ok', service: 'octofit-backend', apiBaseUrl });
});

router.get('/api/config', (_req, res) => {
  const apiBaseUrl = getApiBaseUrl();
  res.json({ apiBaseUrl, codespaceName: process.env.CODESPACE_NAME || null });
});

router.get(['/api/users', '/api/users/'], async (_req, res) => {
  const users = await User.find({}).lean();
  res.json({ data: users, apiBaseUrl: getApiBaseUrl() });
});

router.post(['/api/users', '/api/users/'], async (req, res) => {
  const newUser = await User.create(req.body);
  res.status(201).json({ data: newUser, apiBaseUrl: getApiBaseUrl() });
});

router.get(['/api/teams', '/api/teams/'], async (_req, res) => {
  const teams = await Team.find({}).lean();
  res.json({ data: teams, apiBaseUrl: getApiBaseUrl() });
});

router.post(['/api/teams', '/api/teams/'], async (req, res) => {
  const newTeam = await Team.create(req.body);
  res.status(201).json({ data: newTeam, apiBaseUrl: getApiBaseUrl() });
});

router.get(['/api/activities', '/api/activities/'], async (_req, res) => {
  const activities = await Activity.find({}).lean();
  res.json({ data: activities, apiBaseUrl: getApiBaseUrl() });
});

router.post(['/api/activities', '/api/activities/'], async (req, res) => {
  const newActivity = await Activity.create(req.body);
  res.status(201).json({ data: newActivity, apiBaseUrl: getApiBaseUrl() });
});

router.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find({}).lean();
  res.json({ data: leaderboard, apiBaseUrl: getApiBaseUrl() });
});

router.post(['/api/leaderboard', '/api/leaderboard/'], async (req, res) => {
  const newEntry = await LeaderboardEntry.create(req.body);
  res.status(201).json({ data: newEntry, apiBaseUrl: getApiBaseUrl() });
});

router.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
  const workouts = await Workout.find({}).lean();
  res.json({ data: workouts, apiBaseUrl: getApiBaseUrl() });
});

router.post(['/api/workouts', '/api/workouts/'], async (req, res) => {
  const newWorkout = await Workout.create(req.body);
  res.status(201).json({ data: newWorkout, apiBaseUrl: getApiBaseUrl() });
});

export default router;
