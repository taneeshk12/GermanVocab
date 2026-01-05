export function Footer() {
    return (
        <footer className="border-t py-12 bg-secondary/30 mt-auto">
            <div className="container mx-auto px-6 text-center text-muted-foreground text-sm">
                <p className="mb-4">© {new Date().getFullYear()} LinguFlow German Learning. Open Source.</p>
                <div className="flex justify-center gap-6">
                    <a href="#" className="hover:text-primary transition-colors">Privacy</a>
                    <a href="#" className="hover:text-primary transition-colors">Terms</a>
                    <a href="#" className="hover:text-primary transition-colors">Twitter</a>
                </div>
            </div>
        </footer>
    );
}
