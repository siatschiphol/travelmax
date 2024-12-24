import MainLayout from '@/components/layouts/MainLayout'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <MainLayout>{children}</MainLayout>
}
