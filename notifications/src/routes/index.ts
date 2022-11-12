import express from 'express';
import notify from './notify';
import template from './template';
import email from './email';

const router = express.Router();

router.use('/notifications', notify);
router.use('/template', template);
router.use('/email', email);

export default router;
