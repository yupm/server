
//choice = 'yes' || 'no;
//$ sign is an index for the recipient

Survey.updateOne({
    id: surveyId,
    recipients: {
        $elemMatch: { email: email, responded: false }
    }
}, {
    $inc: { [choice]: 1 },
    $set: { 'recipients.$.responded': true }
})