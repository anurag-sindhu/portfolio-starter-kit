import './global.css'
import './landing.css'

export const metadata = {
  title: 'Anurag Sindhu — Backend Engineer',
  description:
    '8+ years building resilient, large-scale systems. SDE-3 at Aditya Birla Fashion and Retail Ltd (Aditya Birla Group), Bangalore. Node.js, NestJS, Kafka, System Design, Agentic AI.'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <head>
        <link
          href='https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@300;400;500&display=swap'
          rel='stylesheet'
        />
      </head>
      <body className='antialiased w-full min-h-screen'>
        {children}
      </body>
    </html>
  )
}
