import {Router} from 'express';
const router = Router();
const path = require('path');
let reqPath = path.join(__dirname, '..')
const thumbsupply = require('thumbsupply');
const fs = require('fs');

import * as videosCtr from '../controllers/videos.controllers';

router.get('/' , videosCtr.getVideos);
router.get('/:id/caption', function(req, res) {
    res.sendFile('assets/captions/sample.vtt', { root: reqPath });
});

router.get('/:id/poster', function(req, res) {
    console.log(`assets/${req.params.id}.mp4`);
    thumbsupply.generateThumbnail(`../assets/${req.params.id}.mp4`)
    .then(thumb => res.sendFile(thumb))
    .catch(err => console.log(err))
});

router.get('/:id', function(req, res) {
    const path = reqPath + `/assets/${req.params.id}.mp4`;
    const stat = fs.statSync(path);
    const fileSize = stat.size;
    const range = req.headers.range;
    if (range) {
      console.log('we have range', range);
      const parts = range.replace(/bytes=/, "").split("-")
      const start = parseInt(parts[0], 10)
      const end = parts[1] 
        ? parseInt(parts[1], 10)
        : fileSize-1
        console.log(parts)
      const chunksize = (end-start)+1
      const file = fs.createReadStream(path, {start, end})
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      }
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      console.log('no range', range);
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      }
      res.writeHead(200, head)
      fs.createReadStream(path).pipe(res)
    }
  });

router.get('/:id/data', videosCtr.getData);
  
/* router.post('/' , todoCtr.createTodo);
router.put('/:todoId' , todoCtr.updateTodoById);
router.delete('/:todoId' , todoCtr.deleteTodoById); */

export default router;