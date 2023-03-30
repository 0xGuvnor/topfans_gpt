import Chat from "@/components/Chat";
import Header from "@/components/Header";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>TopFans-GPT</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col w-full h-screen max-w-6xl mx-auto">
        <Header />
        <Chat />
      </main>
    </>
  );
}
