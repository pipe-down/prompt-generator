import { DEFAULT_VIBE, DEFAULT_AGENT } from '../constants';

export function buildLocalFinalPrompt(input, vibe = DEFAULT_VIBE, agent = DEFAULT_AGENT) {
  const koreanHeader = `[AI 에이전트용 시스템 프롬프트]
당신은 다음 역할을 가진 전문 코딩 어시스턴트입니다:
- 역할: ${vibe.persona}
- 커뮤니케이션 스타일: ${vibe.mood}
- 언어: ${vibe.language}

사용자의 요청에 따라 완전한 솔루션을 생성하는 것이 당신의 임무입니다. 다음 단계를 따르세요:

1. 요청을 철저히 분석하기
2. 접근 방식 계획하기
3. 코드나 솔루션 생성하기
4. 출력 검토 및 개선하기

다음 형식으로 응답을 제공하세요:
- 요청에 대한 간단한 분석으로 시작
- 완전한 솔루션 제공
- 필요한 경우 설명 포함
- 수행된 작업 요약으로 끝맺기

[사용자 요청]
${input}`;

  const englishHeader = `[SYSTEM PROMPT FOR AI AGENT]
You are an expert coding assistant with the following persona:
- Role: ${vibe.persona}
- Communication Style: ${vibe.mood}
- Language: ${vibe.language}

Your task is to generate a complete solution based on the user's request. Follow these steps:

1. Analyze the request thoroughly
2. Plan your approach
3. Generate the code or solution
4. Review and refine your output

Please provide your response in the following format:
- Start with a brief analysis of the request
- Provide the complete solution
- Include explanations where necessary
- End with a summary of what was accomplished

[USER REQUEST]
${input}`;

  // 구분자를 사용하여 두 언어 버전을 분리
  return `${koreanHeader}

================================================================================

${englishHeader}`;
}

export async function generateWithGemini(inputText, gemini) {
  const { apiKey, model, temperature, endpoint } = gemini;
  if (!apiKey) throw new Error('NO_GEMINI_KEY');
  
  const systemSpec = `You are an expert prompt engineer. Create a prompt for an AI coding assistant that will generate a complete solution. The prompt should include:
1. A clear system prompt defining the AI's role and capabilities
2. The user's request
3. Structured steps for the AI to follow
4. Expected output format

The prompt should be optimized for AI agents like Claude, Codex, or Qwen Coder. Provide both Korean and English versions of the prompt, separated by a clear delimiter (================================================================================).`;
  
  const contents = [
    { 
      role: 'user', 
      parts: [ 
        { 
          text: [
            systemSpec, 
            '', 
            '# User Request', 
            inputText
          ].join('\n') 
        } 
      ] 
    }
  ];
  
  const url = (endpoint?.trim() || `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`);
  const body = { contents, generationConfig: { temperature } };
  const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  if (!res.ok) { const t = await res.text().catch(()=>""); throw new Error(`GEMINI_HTTP_${res.status}: ${t}`); }
  const json = await res.json().catch(()=>({}));
  const text = json?.candidates?.[0]?.content?.parts?.map((p) => p?.text).filter(Boolean).join('\n') || '';
  if (!text.trim()) throw new Error('GEMINI_EMPTY');
  return text.trim();
}