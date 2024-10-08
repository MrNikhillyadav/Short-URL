const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;

  if (!body.url) return res.status(400).json({ error: "URL is required" });
  const shortID = shortid(8);

  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
    creadteBy : req.user._id, 
  });

  return res.render('home', {
    id : shortID,
  })
  // return res.status(200).json({ id: shortID });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

async function handleGetShortURL(req, res) {
    const shortId = req.params.shortId ;
    const entry = await URL.findOneAndUpdate(
        { 
            shortId 
        },
        { $push : {
            visitHistory :{
                timestamp : Date.now(),
            },
        }});
        
        if(!entry) return res.status(404).json({ error: "Short URL not found  " });


        res.redirect(entry.redirectURL);
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  handleGetShortURL,
};
