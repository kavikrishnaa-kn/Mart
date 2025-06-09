export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-700 via-red-500 to-red-300 text-white p-10 flex flex-col max-w-3xl mx-auto rounded-lg shadow-lg mt-10">
      <h1 className="text-4xl font-extrabold mb-8 drop-shadow-md">Contact Us</h1>
      
      <div className="space-y-6 text-lg">
        <p>
          📞 Phone:{" "}
          <a
            href="tel:+1234567890"
            className="underline hover:text-yellow-300"
          >
            +1 (234) 567-890
          </a>
        </p>

        <p>
          📧 Email:{" "}
          <a
            href="mailto:support@electromart.com"
            className="underline hover:text-yellow-300"
          >
            support@electromart.com
          </a>
        </p>

        <p>
          🌐 Website:{" "}
          <a
            href="https://electromart.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-yellow-300"
          >
            www.electromart.com
          </a>
        </p>

        <p>
          🕒 Working Hours: Monday - Friday, 9am - 6pm
        </p>
      </div>
    </div>
  );
}
