const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const upload = require('../middleware/image-upload.js')

//!--- Model
const Job = require('../models/job')

//!--- Utilities
const { sendError, NotFound, Forbidden, Unauthorized } = require('../utils/errors')

//!--- Middleware
const verifyToken = require('../middleware/verify-token')


//!--- Public and Private Routes
// ========== Public Routes =========== 




// ========= Protected Routes ========= 

router.use(verifyToken);

//!---MAIN JOB SECTION

//*--- Job Create
router.post('/', async (req, res) => {//Setting up the post route
    try {
        req.body.user = req.user._id //asigning the user as the current user
        const job = await Job.create(req.body) // creating job variable linked to db opperation
        job._doc.user = req.user // asigning the user info to req.user
        return res.status(201).json(job) // returning the response with the new job data
        //Error handling
    } catch (error) {
        sendError(error, res)
    }
})

//*--- Job Index
router.get('/', async (req, res) => {
    try {
        const jobs = await Job.find().populate('user')
        .sort({ createdAt: 'desc'})  //sorting the jobs by default based on most recently added.
        return res.json(jobs)
    } catch (error) {
        sendError(error, res)
    }
})

//*---  Job Show
router.get('/:jobId', async (req, res) => {
    try {
        const { jobId } = req.params
        //!---Find
        const job = await Job.findById(jobId).populate('user').populate('comments.user')
        
        //!---Handle not found
        if (!job) throw new NotFound('Job not found')
        //!---Return if found
        return res.json(job)
        
    } catch (error) {
        sendError(error, res)
    }
})
//*--- Job Update
router.put('/:jobId', async (req, res) => {
    try {
        const { jobId } = req.params
        
        //!---Find
        const job = await Job.findById(jobId).populate('user')
        
        //!---Handle not found
        if (!job) throw new NotFound('Job not found.')

        // !---Authorize
        if(!job.user.equals(req.user._id)) {
            throw new Forbidden('Request user does not match author id.') 
        }
        // Make the update
        Object.assign(job, req.body)

        // Save
        await job.save()

        //!---Return
        return res.json(job)

    } catch (error) {
        sendError(error, res)
    }
})


//*--- Job Delete
router.delete('/:jobId', async (req, res) => {
    try {
        const { jobId } = req.params
        //!---Find
        const job = await Job.findById(jobId)
        
        //!---Handle not found
        if (!job) throw new NotFound('Job not found')
        
            //!---Authorize
        if (!job.user.equals(req.user._id)) {
            throw new Forbidden('Request user does not match author id.')
        }
        
        //!---Delete
        const deletedJob = await Job.findByIdAndDelete(jobId)

        //!---Return
        return res.json(deletedJob)

    } catch (error) {
        sendError(error, res)
    }
})

//!---COMMENTS SECTION

//*---Comment Create
router.post('/:jobId/comments', async (req, res) => {
    try {
    req.body.user = req.user._id;
    const job = await Job.findById(req.params.jobId);
    //Add the new comment
    job.comments.push(req.body);
    await job.save();
    //Respond with the new comment 
    const newComment = job.comments[job.comments.length -1];
    newComment._doc.user = req.user;
    return res.status(201).json(newComment);

    } catch(error) {
        sendError(error, res)
    }
})

//*---Comment Update - not currently being used, for future development
router.put('/:jobId/comments/:commentId', async (req, res) => {
    try {
        req.body.user = req.user._id;
        const job = await Job.findById(req.params.jobId);
        const comment = job.comments.id(req.params.commentId);
        comment.text = req.body.text;
        await job.save();
        return res.status(200).json({ message: 'Ok' })
    } catch(error) {
        sendError(error, res)
    }
});

//*---Comment Delete
router.delete('/:jobId/comments/:commentId', async (req, res) => {
    try {
        const job = await Job.findById(req.params.jobId);
        job.comments.remove({ _id: req.params.commentId });
        await job.save();
        return res.status(200).json({ message: 'Deleted'})
    } catch (error) {
        sendError(error, res)
    }
})


//!--- Export
module.exports = router