---
title: 'Prompt AI for a response'
summary: 'Ask OpenAI (or any AI model you want to interact with) for information on-chain. '
date: '2023-02-12'
author:
  name: Patrick Collins
  link: https://twitter.com/PatrickAlphaC
---

const prompt = args[0]

if (
    !secrets.openaiKey
) {
    throw Error(
        "Need to set OPENAI_KEY environment variable"
    )
}

// example request: 
// curl https://api.openai.com/v1/completions -H "Content-Type: application/json" -H "Authorization: Bearer YOUR_API_KEY" -d '{"model": "text-davinci-003", "prompt": "Say this is a test", "temperature": 0, "max_tokens": 7}

// example response:
// {"id":"cmpl-6jFdLbY08kJobPRfCZL4SVzQ6eidJ","object":"text_completion","created":1676242875,"model":"text-davinci-003","choices":[{"text":"\n\nThis is indeed a test","index":0,"logprobs":null,"finish_reason":"length"}],"usage":{"prompt_tokens":5,"completion_tokens":7,"total_tokens":12}}
const openAIRequest = Functions.makeHttpRequest({
    url: "https://api.openai.com/v1/completions",
    method: "POST",
    headers: {
        'Authorization': `Bearer ${secrets.openaiKey}`
    },
    data: { "model": "text-davinci-003", "prompt": prompt, "temperature": 0, "max_tokens": 7 }
})

const [openAiResponse] = await Promise.all([
    openAIRequest
])
console.log("raw response", openAiResponse)

const result = openAiResponse.data.choices[0].text
return Functions.encodeString(result)
