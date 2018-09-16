const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const Survey = mongoose.model('surveys');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url');

module.exports = app => {
    app.get('/api/surveys/thanks', (req,res)=>{
        console.log("Connection established");
        res.send('Thanks for voting!');
    });

    app.post('/api/surveys/webhooks', (req,res)=>
    { 
        const events = _.map(req.body, ({email, url })=> {
            const pathname = new URL(url).pathname;
            const p = new Path('/api/surveys/:surveyId/:choice');
            const match = p.test(pathname);
            if(match){
                return { email, surveyId: match.surveyId, choice: match.choice };
            }
        });
        console.log("Events is" , events);

        const compactEvents = _.compact(events);
        const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId');

        console.log("Unique", uniqueEvents);

        res.send({});

    });


    app.post('/api/surveys', requireLogin, requireCredits, async (req, res)=>{
        const { title, subject, body, recipients } = req.body;
        //trim removes whitespaces
        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email=> ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now()
        });

        console.log("In route");
        //Send Email
        const mailer = new Mailer(survey, surveyTemplate(survey));

        try{
            await mailer.send();
            await survey.save();
    
            req.user.credits -= 1;
            //after save user, can consider as stale. 
            const user = await req.user.save();
            res.send(user);
        }
        catch(err){
            res.status(422).send(err);
        }

    });
};