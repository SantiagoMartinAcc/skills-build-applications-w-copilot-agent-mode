import { Router } from 'express';
import User from './models/user';
import Team from './models/team';
import Activity from './models/activity';
import LeaderboardEntry from './models/leaderboard';
import Workout from './models/workout';

const router = Router();

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
  const users = await User.find({}).lean();
  res.json({ data: users, apiBaseUrl });
});

router.post(['/api/users', '/api/users/'], async (req, res) => {
  const newUser = await User.create(req.body);
  res.status(201).json({ data: newUser, apiBaseUrl });
});

router.get(['/api/teams', '/api/teams/'], async (_req, res) => {
  const teams = await Team.find({}).lean();
  res.json({ data: teams, apiBaseUrl });
});

router.post(['/api/teams', '/api/teams/'], async (req, res) => {
  const newTeam = await Team.create(req.body);
  res.status(201).json({ data: newTeam, apiBaseUrl });
});

router.get(['/api/activities', '/api/activities/'], async (_req, res) => {
  const activities = await Activity.find({}).lean();
  res.json({ data: activities, apiBaseUrl });
});

router.post(['/api/activities', '/api/activities/'], async (req, res) => {
  const newActivity = await Activity.create(req.body);
  res.status(201).json({ data: newActivity, apiBaseUrl });
});

router.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find({}).lean();
  res.json({ data: leaderboard, apiBaseUrl });
});

router.post(['/api/leaderboard', '/api/leaderboard/'], async (req, res) => {
  const newEntry = await LeaderboardEntry.create(req.body);
  res.status(201).json({ data: newEntry, apiBaseUrl });
});

router.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
  const workouts = await Workout.find({}).lean();
  res.json({ data: workouts, apiBaseUrl });
});

router.post(['/api/workouts', '/api/workouts/'], async (req, res) => {
  const newWorkout = await Workout.create(req.body);
  res.status(201).json({ data: newWorkout, apiBaseUrl });
});

export default router;
