import Link from 'next/link';

export default function MenuWidgets() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="mb-8 text-2xl font-semibold">Welcome Back to Milio AI</h1>

      <div className="space-y-4">
        <Link
          href="/connected-platform"
          className="flex w-80 cursor-pointer items-center rounded-lg bg-white p-4 shadow-md hover:bg-gray-100"
        >
          <img
            src="/whatsapp.png"
            alt="Connect Platform Icon"
            className="mr-4 h-12 w-12"
          />
          <div>
            <h2 className="text-lg font-bold">1. Connect to Whatsapp</h2>
            <p className="text-sm text-gray-500">
              Start receiving messages from your WhatsApp!
            </p>
          </div>
        </Link>

        <Link
          href="/ai-agent"
          className="flex w-80 cursor-pointer items-center rounded-lg bg-white p-4 shadow-md hover:bg-gray-100"
        >
          <img
            src="/robot.png"
            alt="Ai Agent Icon"
            className="mr-4 h-12 w-12"
          />
          <div>
            <h2 className="text-lg font-bold">2. Create an Ai Agent</h2>
            <p className="text-sm text-gray-500">
              Answer incoming messages with custom AI Agent!
            </p>
          </div>
        </Link>
        <Link
          href="/human-agent"
          className="flex w-80 cursor-pointer items-center rounded-lg bg-white p-4 shadow-md hover:bg-gray-100"
        >
          <img
            src="/human.png"
            alt="Human Agent Icon"
            className="mr-4 h-12 w-12"
          />
          <div>
            <h2 className="text-lg font-bold">3. Invite Human Agent</h2>
            <p className="text-sm text-gray-500">
              Invite your team to help respond to chats!
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
