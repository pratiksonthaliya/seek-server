import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'https://seek-code.vercel.app',
}))

app.use((req, res, next) => {
  res.setTimeout(15000, () => { // Set timeout to 5 seconds
    console.log('Request has timed out.');
    res.send(408); // Send 408 status code
  });
  next();
});

app.get('/', (req, res) => {  
  res.status(200).send('Server is working fine.');
});

app.post('/api', async (req, res) => {
  const {prompt} = req.body;

  const response = await fetch("https://www.blackbox.ai/api/chat", {
      "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
        "priority": "u=1, i",
        "sec-ch-ua": "\"Chromium\";v=\"128\", \"Not;A=Brand\";v=\"24\", \"Google Chrome\";v=\"128\"",
        "sec-ch-ua-mobile": "?1",
        "sec-ch-ua-platform": "\"Android\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "Referer": "https://www.blackbox.ai/chat/KIE7yMb",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      referrer: "https://www.blackbox.ai/",
      body: JSON.stringify({
          messages: [
            {
              content: prompt,
              role: "user",
              id: "KIE7yMb"
            }
          ],
          chatId: "KIE7yMb",
          sessionId: "85a60e57-7b40-4f45-8eb0-3812ea7f871e",
          userId: "jlmqxicb",
          codeModelMode: true,
          agentMode: {},
          trendingAgentMode: {},
          isMicMode: false,
          isChromeExt: false,
          githubToken: null,
      }),
      method: "POST",
      mode: "cors"
    });
  let data = await response.text();
  res.status(200).send({response: data});
});

app.post('/api/continue', async (req, res) => {
  const {prompt, content} = req.body;
  const continueResponse = await fetch("https://www.blackbox.ai/api/chat", {
    "headers": {
      "accept": "*/*",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "text/plain;charset=UTF-8",
      "priority": "u=1, i",
      "sec-ch-ua": "\"Chromium\";v=\"128\", \"Not;A=Brand\";v=\"24\", \"Google Chrome\";v=\"128\"",
      "sec-ch-ua-mobile": "?1",
      "sec-ch-ua-platform": "\"Android\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "Referer": "https://www.blackbox.ai/chat/KIE7yMb",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "cookie": "sessionId=78521cac-7c29-4bf1-a153-f478b7442f59; __Host-authjs.csrf-token=4f11806c5713fdf1d3f37cdb20bbf631f367ce887e1bdd65b4bab33c3228cdc6%7C820f266cf7908fef96ca7d9f6f62069bd9395570953715652bdc459bf03e060f; __Secure-authjs.callback-url=https%3A%2F%2Fwww.blackbox.ai; intercom-id-jlmqxicb=656ba1b3-0b7c-4721-9f16-9d4796f6c808; intercom-session-jlmqxicb=; intercom-device-id-jlmqxicb=93aac5c8-a68f-4bbd-8dfb-9b39983fe45b",

    },
    referrer: "https://www.blackbox.ai/",
    body: JSON.stringify({
      messages: [
        {
          id: "KIE7yMb",
          role: "user",
          content: prompt,
        },
        {
          id: "KIE7yMb",
          content: content,
          role: "assistant",
        }
      ],
      chatId: "KIE7yMb",
      sessionId: "85a60e57-7b40-4f45-8eb0-3812ea7f871e",
      userId: "jlmqxicb",
      codeModelMode: true,
      agentMode: {},
      trendingAgentMode: {},
      isMicMode: false,
      isChromeExt: false,
      githubToken: null,
    }),
    method: "POST",
    mode: "cors"
  });
  let data = await continueResponse.text();
  res.status(200).send({response: data});
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running at  ${process.env.PORT || 3000}`);
})