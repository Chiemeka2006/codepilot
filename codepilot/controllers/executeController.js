import { JUDGE0_LANGUAGE_IDS } from '../shared/judge0Languages.js'

// Judge0's synchronous mode (`wait=true`) — one request, one response, no
// polling. Simpler for a scratchpad use case than the async submit-then-poll
// flow, at the cost of the request blocking until execution finishes.
function judge0Url() {
  return `https://${process.env.JUDGE0_HOST}/submissions?base64_encoded=false&wait=true`
}

export async function executeCode(req, res) {
  const { code, language } = req.body

  if (typeof code !== 'string' || !code.trim()) {
    return res.status(400).json({ error: 'code is required' })
  }

  const languageId = JUDGE0_LANGUAGE_IDS[language]
  if (!languageId) {
    return res.status(400).json({ error: `${language} can't be run here` })
  }

  let response
  try {
    response = await fetch(judge0Url(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': process.env.JUDGE0_API_KEY,
        'X-RapidAPI-Host': process.env.JUDGE0_HOST,
      },
      body: JSON.stringify({ source_code: code, language_id: languageId }),
    })
  } catch {
    return res.status(502).json({ error: 'could not reach the code execution service' })
  }

  if (!response.ok) {
    return res.status(502).json({ error: 'code execution service is unavailable right now' })
  }

  const result = await response.json()
  res.json({
    stdout: result.stdout,
    stderr: result.stderr,
    compileOutput: result.compile_output,
    status: result.status?.description,
    time: result.time,
    memory: result.memory,
  })
}
