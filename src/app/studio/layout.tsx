export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <style>{`
        body {
          overflow: auto !important;
          margin: 0;
          padding: 0;
        }
      `}</style>
      {children}
    </>
  )
}

