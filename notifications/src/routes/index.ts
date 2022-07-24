import express from 'express';
import notify from './notify';
import template from './template';

const router = express.Router();

router.use('/notify', notify);
router.use('/template', template);

export default router;
