import express, { Router } from 'express';

const router = Router;
const jsonParser = express.json();

router.post('/register');

export default router;
