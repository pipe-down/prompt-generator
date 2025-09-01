import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';

// 클라이언트 사이드에서만 렌더링되도록 설정
const PromptBuilderApp = dynamic(() => import('../components/PromptBuilderApp'), {
  ssr: false,
  loading: () => <div className="h-screen flex items-center justify-center">로딩 중...</div>
});

export default function Home() {
  return (
    <div>
      <Head>
        <title>바이브코딩 프롬프트</title>
        <meta name="description" content="코드 에이전트용 프롬프트 생성기" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-screen">
        <PromptBuilderApp />
      </main>
    </div>
  );
}