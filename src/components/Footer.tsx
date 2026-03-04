export default function Footer() {
  return (
    <footer className="border-t border-border py-12 text-center text-sm text-muted-foreground">
      <div className="max-w-2xl mx-auto px-4">
        <p>&copy; {new Date().getFullYear()}. All rights reserved.</p>
      </div>
    </footer>
  );
}
