

const express = require('express');
const router = express.Router();

//!--- Model
const Job = require('../models/job')
const verifyToken = require('../middleware/verify-token')

//!--- Middleware



//!--- Public and Private Routes
// ========== Public Routes =========== above router.use(varifyToken)




// ========= Protected Routes =========  under router.use(varifyToken)

// router.use(verifyToken);  !!!!!!!Think 

//!---MAIN JOB SECTION

//*--- Job Create  CHECKED AND WORKING AS FAR AS POSSIBLE GOT NO USERS ETC
router.post('', verifyToken, async (req, res) => {//Setting up the post route
    try {
        req.body.user = req.user._id //asigning the user as the current user
        const job = await Job.create(req.body) // creating job variable linked to db opperation
        job._doc.user = req.user // asigning the user info to req.user
        return res.status(201).json(job) // returning the response with the new job data
    //Error handling
    } catch (error) { 
        console.log(error)
        return res.status(500).send('<h1>Something went wrong.</h1>')
    }
})

//*--- Job Index   CHECKED AND WORKING AS FAR AS POSSIBLE GOT NO USERS ETC
router.get('', async (req, res) => {
    try {
        const jobs = await Job.find()//.populate('user').populate('skill') // Populating the user and skill data into the job so all is displayed.
        .sort({ createdAt: 'desc'})  //soring the jobs by default based on most recently added.
        return res.json(jobs)
    } catch (error) {
        console.log(error)
        return res.status(500).send('<h1>Something went wrong.</h1>')
    }
})

//*---  Job Show   CHECKED AND WORKING AS FAR AS POSSIBLE GOT NO USERS ETC
router.get('/:jobId', async (req, res) => {
    try {
        const { jobId } = req.params
        //!---Find
        const job = await Job.findById(jobId)//.populate('user').populate('skill')
        //!---Handle not found
        if (!job) throw new NotFound('Job not found')
        //!---Return if found
        return res.json(job)
        
    } catch (error) {
        console.log(error)
        return res.status(500).send('<h1>Something went wrong.</h1>')
    }
})
//*--- Job Update   CHECKED AND WORKING AS FAR AS POSSIBLE GOT NO USERS ETC
router.put('/:jobId', async (req, res) => {
    try {
        const { jobId } = req.params
        
        //!---Find
        const job = await Job.findById(jobId)//.populate('user').populate('skill')
        
        //!---Handle not found
        if (!job) throw new NotFound('Job not found.')

        //!---Authorize
        // if(!job.user.equals(req.user._id)) {
        //     throw new Forbidden('Request user does not match author id.') 
        // }
        // Make the update
        Object.assign(job, req.body)

        // Save
        await job.save()

        //!---Return
        return res.json(job)

    } catch (error) {
        console.log(error)
        return res.status(500).send('<h1>Something went wrong.</h1>')
    }
})


//*--- Job Delete  CHECKED AND WORKING AS FAR AS POSSIBLE GOT NO USERS ETC
router.delete('/:jobId', async (req, res) => {
    try {
        const { jobId } = req.params
        //!---Find
        const job = await Job.findById(jobId)
        //!---Handle not found
        if (!job) throw new NotFound('Job not found')
        
            //!---Authorize
        // if (!job.user.equals(req.user._id)) {
        //     throw new Forbidden('Request user does not match author id.')
        // }
        
        //!---Delete
        const deletedJob = await Job.findByIdAndDelete(jobId)

        //!---Return
        return res.json(deletedJob)

    } catch (error) {
        console.log(error)
        return res.status(500).send('<h1>Something went wrong.</h1>')
    }
})

//!---COMMENTS SECTION

//*---Comment Create CHECKED AND WORKING AS FAR AS POSSIBLE GOT NO USERS ETC
router.post('/:jobId/comments', async (req, res) => {
    try {
    // req.body.user = req.user._id;
    const job = await Job.findById(req.params.jobId);
    //Add the new comment
    job.comments.push(req.body);
    await job.save();
    //Respond with the new comment 
    const newComment = job.comments[job.comments.length -1];
    newComment._doc.user = req.user;
    return res.status(201).json(newComment);

    } catch(error) {
        console.log(error)
        return res.status(500).send('<h1>Something went wrong.</h1>')
    }
})

//*---Comment Update CHECKED AND WORKING AS FAR AS POSSIBLE GOT NO USERS ETC
router.put('/:jobId/comments/:commentId', async (req, res) => {
    try {
        // req.body.user = req.user._id;
        const job = await Job.findById(req.params.jobId);
        const comment = job.comments.id(req.params.commentId);
        comment.text = req.body.text;
        await job.save();
        return res.status(200).json({ message: 'Ok' })
    } catch(error) {
        console.log(error)
        return res.status(500).send('<h1>Something went wrong.</h1>')
    }
});

//*---Comment Delete CHECKED AND WORKING AS FAR AS POSSIBLE GOT NO USERS ETC
router.delete('/:jobId/comments/:commentId', async (req, res) => {
    try {
        const job = await Job.findById(req.params.jobId);
        job.comments.remove({ _id: req.params.commentId });
        await job.save();
        return res.status(200).json({ message: 'Deleted'})
    } catch (error) {
        console.log(error)
        return res.status(500).send('<h1>Something went wrong.</h1>')
    }
})


//!--- Export
module.exports = router