export default function Footer() {
  return (
    <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-dark-700">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-gray-400">
          © {new Date().getFullYear()} Senthilkannan. Built with Next.js and Tailwind CSS.
        </p>
      </div>
    </footer>
  )
}
