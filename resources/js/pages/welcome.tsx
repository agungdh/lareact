import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
} from "@/components/ui/pagination";
import { Menu, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

// --- Dummy data (replace with API/CMS) --------------------------------------
const posts = [
    {
        id: 1,
        title: "Memulai dengan shadcn/ui",
        excerpt:
            "Pelajari bagaimana memanfaatkan komponen shadcn/ui untuk membangun antarmuka modern dengan cepat.",
        author: "Agung Dharma",
        date: "2025-05-01",
        image: "https://source.unsplash.com/random/800x600?ui",
        category: "Frontend",
    },
    {
        id: 2,
        title: "Mengenal Tailwind CSS v4",
        excerpt:
            "Tailwind CSS v4 hadir dengan fitur baru yang membuat proses styling semakin menyenangkan.",
        author: "Rahmat Hidayat",
        date: "2025-05-10",
        image: "https://source.unsplash.com/random/800x600?css",
        category: "CSS",
    },
    {
        id: 3,
        title: "Tips Optimasi React untuk Performa",
        excerpt:
            "Kiat‑kiat praktis untuk meningkatkan performa aplikasi React Anda.",
        author: "Dewi Saraswati",
        date: "2025-05-15",
        image: "https://source.unsplash.com/random/800x600?react",
        category: "React",
    },
    {
        id: 4,
        title: "Membangun Blog dengan Next.js 15",
        excerpt:
            "Panduan lengkap membuat blog powerful menggunakan Next.js versi terbaru.",
        author: "Andi Wijaya",
        date: "2025-05-22",
        image: "https://source.unsplash.com/random/800x600?nextjs",
        category: "Full‑Stack",
    },
    {
        id: 5,
        title: "State Management Modern: Jotai vs Zustand",
        excerpt:
            "Mana yang lebih cocok untuk proyek Anda? Mari kita bandingkan dua library populer ini.",
        author: "Sinta Lestari",
        date: "2025-05-28",
        image: "https://source.unsplash.com/random/800x600?state",
        category: "React",
    },
    {
        id: 6,
        title: "Deploy Cepat ke Vercel dengan GitHub Actions",
        excerpt:
            "Automasi CI/CD ke Vercel tanpa repot menggunakan GitHub Actions.",
        author: "Budi Santoso",
        date: "2025-06-05",
        image: "https://source.unsplash.com/random/800x600?vercel",
        category: "DevOps",
    },
];

const categories = [
    "Frontend",
    "CSS",
    "React",
    "Full‑Stack",
    "DevOps",
];

// ---------------------------------------------------------------------------
export default function BlogPage() {
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);
    const pageSize = 4;

    const filtered = posts.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase())
    );
    const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);
    const pageCount = Math.ceil(filtered.length / pageSize);

    return (
        <div className="min-h-screen flex flex-col bg-muted/40">
            {/* Header / Navbar */}
            <header className="sticky top-0 z-40 w-full backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b">
                <div className="container flex h-16 items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Menu className="lg:hidden" />
                        <span className="font-bold text-xl">My‑Blog</span>
                    </div>
                    <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
                        <a href="#" className="transition-colors hover:text-foreground/80">
                            Home
                        </a>
                        <a href="#" className="transition-colors hover:text-foreground/80">
                            About
                        </a>
                        <a href="#" className="transition-colors hover:text-foreground/80">
                            Contact
                        </a>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <motion.section
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full bg-gradient-to-r from-primary/60 to-secondary/60 py-14 text-background"
            >
                <div className="container text-center max-w-2xl space-y-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow">
                        Welcome to My‑Blog
                    </h1>
                    <p className="text-lg md:text-xl">
                        Insight seputar teknologi web, pemrograman, dan pengembangan produk
                        digital.
                    </p>
                </div>
            </motion.section>

            {/* Main Content */}
            <main className="container flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 py-12">
                {/* Posts Grid */}
                <section className="lg:col-span-8 space-y-8">
                    {/* Search Bar */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Cari artikel..."
                            className="pl-10"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>

                    {/* Posts List */}
                    <div className="grid sm:grid-cols-2 gap-6">
                        {paginated.map((post) => (
                            <Card
                                key={post.id}
                                className="overflow-hidden hover:shadow-lg transition-shadow group"
                            >
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <CardContent className="p-6 space-y-4">
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <time>{post.date}</time>
                                        <Badge variant="secondary">{post.category}</Badge>
                                    </div>
                                    <CardTitle className="line-clamp-2 hover:text-primary transition-colors">
                                        {post.title}
                                    </CardTitle>
                                    <CardDescription className="line-clamp-3">
                                        {post.excerpt}
                                    </CardDescription>
                                </CardContent>
                                <CardFooter className="p-6 pt-0 flex items-center gap-3">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={`https://i.pravatar.cc/40?u=${post.author}`} />
                                        <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm text-muted-foreground">{post.author}</span>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>

                    {/* Pagination */}
                    {pageCount > 1 && (
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                                        className={page === 1 ? "pointer-events-none opacity-50" : ""}
                                    />
                                </PaginationItem>
                                {Array.from({ length: pageCount }).map((_, i) => (
                                    <PaginationItem key={i}>
                                        <PaginationLink
                                            isActive={page === i + 1}
                                            onClick={() => setPage(i + 1)}
                                        >
                                            {i + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}
                                <PaginationItem>
                                    <PaginationNext
                                        onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                                        className={
                                            page === pageCount ? "pointer-events-none opacity-50" : ""
                                        }
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    )}
                </section>

                {/* Sidebar */}
                <aside className="lg:col-span-4 space-y-8">
                    {/* Categories */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Kategori</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-wrap gap-2">
                            {categories.map((cat) => (
                                <Badge key={cat}>{cat}</Badge>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Recent Posts */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Artikel Terbaru</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {posts.slice(0, 3).map((post) => (
                                <div key={post.id} className="flex gap-3">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="h-16 w-24 object-cover rounded-md"
                                    />
                                    <div>
                                        <h4 className="font-medium line-clamp-2 text-sm hover:text-primary transition-colors">
                                            {post.title}
                                        </h4>
                                        <time className="text-xs text-muted-foreground">{post.date}</time>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </aside>
            </main>

            {/* Footer */}
            <footer className="border-t bg-background/60 py-6 backdrop-blur">
                <div className="container flex flex-col sm:flex-row items-center justify-between text-sm text-muted-foreground gap-4">
          <span>
            © {new Date().getFullYear()} My‑Blog. Dibuat dengan ❤ dan shadcn/ui.
          </span>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-foreground/80">
                            Privacy Policy
                        </a>
                        <a href="#" className="hover:text-foreground/80">
                            Terms & Conditions
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
