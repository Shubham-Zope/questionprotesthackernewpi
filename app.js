const express = require("express");
const axios = require("axios");
const NodeCache = require("node-cache");

const app = express();
const port = process.env.PORT || 3000;
const cache = new NodeCache({ stdTTL: 900 });

app.get("/top-stories", async (req, res) => {
  try {
    const cd = cache.get("top-stories");
    if (cd) {
      console.log("Serving from cache");
      return res.json(cd);
    }
    const response = await axios.get(
      "https://hacker-news.firebaseio.com/v0/topstories.json"
    );
    const ids = response.data.slice(0, 10);
    const top = await Promise.all(
      ids.map(async (id) => {
        const resps = await axios.get(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json`
        );
        return {
          title: resps.data.title,
          url: resps.data.url,
          score: resps.data.score,
          timeofsubmission: resps.data.time,
          submissionbyuser: resps.data.by,
        };
      })
    );

    top.sort((a, b) => b.score - a.score);
    console.log(top);
    cache.set("top-stories", top);
    console.log(top.length);
    const a = {
      length: top.length,
      Stories: top,
    };
    return res.json(a);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/past-stories", async (req, res) => {
  const cachedData = cache.get("top-stories");
  if (cachedData) {
    console.log("Serving from cache");
    return res.json(cachedData);
  } else {
    // data invalid so fetching again
    try {
      const cd = cache.get("top-stories");
      if (cd) {
        console.log("Serving from cache");
        return res.json(cd);
      }
      const response = await axios.get(
        "https://hacker-news.firebaseio.com/v0/topstories.json"
      );
      const ids = response.data.slice(0, 10);
      const top = await Promise.all(
        ids.map(async (id) => {
          const resps = await axios.get(
            `https://hacker-news.firebaseio.com/v0/item/${id}.json`
          );
          return {
            title: resps.data.title,
            url: resps.data.url,
            score: resps.data.score,
            timeofsubmission: resps.data.time,
            submissionbyuser: resps.data.by,
          };
        })
      );

      top.sort((a, b) => b.score - a.score);
      console.log(top);
      cache.set("top-stories", top);
      console.log(top.length);
      const a = {
        length: top.length,
        Stories: top,
      };
      return res.json(a);
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

app.get("/comments", async (req, res) => {
  const storyId = req.query.storyId; // taking storyid currently as 2921983. given in hacker new api

  if (!storyId) {
    return res.status(400).json({ error: "Missing storyId parameter" });
  }

  try {
    const response = await axios.get(
      `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`
    );
    const { kids } = response.data;

    if (!kids || kids.length === 0) {
      return res.json([]);
    }

    const commentIds = kids.slice(0, 10);

    const comments = await Promise.all(
      commentIds.map(async (id) => {
        const commentResponse = await axios.get(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json`
        );
        return {
          text: commentResponse.data.text,
          user: commentResponse.data.by,
          noofchildcomment: commentResponse.data.kids
            ? commentResponse.data.kids.length
            : 0,
        };
      })
    );

    comments.sort((a, b) => b.noofchildcomment - a.noofchildcomment);

    const a = {
      length: comments.length,
      commentsOnStory: comments,
    };

    return res.json(a);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
