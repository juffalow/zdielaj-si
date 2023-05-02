import express from 'express';
import notify from './notify';
import template from './template';
import email from './email';
import settings from './settings';

const router = express.Router();

router.use('/notifications', notify);
router.use('/notifications/template', template);
router.use('/notifications/email', email);
router.use('/notifications/settings', settings);

export default router;
