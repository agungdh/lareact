import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetClose,
} from "@/components/ui/sheet";
import { Menu, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

// ---------------------------------------------------------------------------
// Dummy data – replace with fetch() / CMS integration
const posts = [
    {
        id: 1,
        title: "Memulai dengan shadcn/ui",
        excerpt:
            "Pelajari bagaimana memanfaatkan komponen shadcn/ui untuk membangun antarmuka modern dengan cepat.",
        author: "Agung Dharma",
        date: "2025‑05‑01",
        image: "https://source.unsplash.com/random/1200x800?ui",
        category: "Frontend",
    },
    {
        id: 2,
        title: "Mengenal Tailwind CSS v4",
        excerpt:
            "Tailwind CSS v4 hadir dengan fitur baru yang membuat proses styling semakin menyenangkan.",
        author: "Rahmat Hidayat",
        date: "2025‑05‑10",
        image: "https://source.unsplash.com/random/1200x800?tailwind",
        category: "CSS",
    },
    {
        id: 3,
        title: "Tips Optimasi React untuk Performa",
        excerpt:
            "Kiat‑kiat praktis untuk meningkatkan performa aplikasi React Anda.",
        author: "Dewi Saraswati",
        date: "2025‑05‑15",
        image: "https://source.unsplash.com/random/1200x800?react",
        category: "React",
    },
    {
        id: 4,
        title: "Membangun Blog dengan Next.js 15",
        excerpt:
            "Panduan lengkap membuat blog powerful menggunakan Next.js versi terbaru.",
        author: "Andi Wijaya",
        date: "2025‑05‑22",
        image: "https://source.unsplash.com/random/1200x800?nextjs",
        category: "Full‑Stack",
    },
    {
        id: 5,
        title: "State Management Modern: Jotai vs Zustand",
        excerpt:
            "Mana yang lebih cocok untuk proyek Anda? Mari kita bandingkan dua library populer ini.",
        author: "Sinta Lestari",
        date: "2025‑05‑28",
        image: "https://source.unsplash.com/random/1200x800?state",
        category: "React",
    },
    {
        id: 6,
        title: "Deploy Cepat ke Vercel dengan GitHub Actions",
        excerpt:
            "Automasi CI/CD ke Vercel tanpa repot menggunakan GitHub Actions.",
        author: "Budi Santoso",
        date: "2025‑06‑05",
        image: "https://source.unsplash.com/random/1200x800?vercel",
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
function PostCard({ post }) {
    return (
        <Card
            key={post.id}
            className="overflow-hidden group rounded‑2xl shadow‑md transition hover:shadow‑xl hover:scale‑[1.015] bg‑background/90 backdrop‑blur‑sm"
        >
            <motion.img
                src={post.image}
                alt={post.title}
                className="h‑56 w‑full object‑cover group‑hover:scale‑110 transition‑transform duration‑500"
                initial={{ scale: 1, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
            />

            <CardContent className="p‑6 space‑y‑4">
                <div className="flex items‑center gap‑2 text‑xs text‑muted‑foreground">
                    <time>{post.date}</time>
                    <Badge variant="secondary">{post.category}</Badge>
                </div>
                <CardTitle className="line‑clamp‑2 hover:text‑primary transition‑colors">
                    {post.title}
                </CardTitle>
                <CardDescription className="line‑clamp‑3">
                    {post.excerpt}
                </CardDescription>
            </CardContent>
            <CardFooter className="p‑6 pt‑0 flex items‑center gap‑3">
                <Avatar className="h‑8 w‑8">
                    <AvatarImage src={`https://i.pravatar.cc/40?u=${post.author}`} />
                    <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text‑sm text‑muted‑foreground">{post.author}</span>
            </CardFooter>
        </Card>
    );
}

export default function BlogPage() {
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);
    const pageSize = 6; // tampilkan lebih banyak per halaman agar grid terasa penuh

    const filtered = posts.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase())
    );
    const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);
    const pageCount = Math.ceil(filtered.length / pageSize);

    return (
        <div className="min‑h‑screen flex flex‑col bg‑muted/40 font‑sans">
            {/* —————————————————— Header / Navbar —————————————————— */}
            <header className="sticky top‑0 z‑50 w‑full border‑b bg‑background/70 backdrop‑blur supports‑[backdrop‑filter]:bg‑background/60">
                <div className="container flex h‑16 items‑center justify‑between">
                    {/* Mobile menu */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="lg:hidden">
                                <Menu className="h‑5 w‑5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="pr‑0">
                            <nav className="p‑6 space‑y‑4">
                                {[
                                    { href: "#", label: "Home" },
                                    { href: "#", label: "About" },
                                    { href: "#", label: "Contact" },
                                ].map((link) => (
                                    <SheetClose asChild key={link.label}>
                                        <a
                                            href={link.href}
                                            className="block text‑lg font‑medium hover:text‑primary"
                                        >
                                            {link.label}
                                        </a>
                                    </SheetClose>
                                ))}
                            </nav>
                        </SheetContent>
                    </Sheet>

                    {/* Logo */}
                    <a href="#" className="font‑bold text‑2xl tracking‑tight">
                        My‑Blog
                    </a>

                    {/* Desktop nav */}
                    <nav className="hidden lg:flex items‑center gap‑8 text‑sm font‑medium">
                        <a href="#" className="hover:text‑primary transition‑colors">
                            Home
                        </a>
                        <a href="#" className="hover:text‑primary transition‑colors">
                            About
                        </a>
                        <a href="#" className="hover:text‑primary transition‑colors">
                            Contact
                        </a>
                    </nav>
                </div>
            </header>

            {/* —————————————————— Hero Section —————————————————— */}
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative isolate"
            >
                <img
                    src="https://source.unsplash.com/random/1920x1080?blog"
                    alt="Hero"
                    className="absolute inset‑0 h‑[60vh] w‑full object‑cover object‑center"
                />
                <div className="absolute inset‑0 bg‑gradient‑to‑r from‑background/60 to‑background/30" />
                <div className="relative container flex h‑[60vh] items‑center justify‑center text‑center">
                    <div className="space‑y‑6 max‑w‑2xl">
                        <h1 className="text‑4xl md:text‑5xl font‑extrabold tracking‑tight drop‑shadow">
                            Insight & Inspirasi Teknologi
                        </h1>
                        <p className="text‑lg md:text‑xl font‑medium">
                            Artikel pilihan seputar web development, design, dan DevOps.
                        </p>
                        <div className="flex justify‑center">
                            <Search className="absolute ml‑3 mt‑2.5 h‑4 w‑4 text‑muted‑foreground" />
                            <Input
                                placeholder="Cari artikel ..."
                                className="pl‑10 w‑72 md:w‑96"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* —————————————————— Main Content —————————————————— */}
            <main className="container flex‑1 grid grid‑cols‑1 lg:grid‑cols‑12 gap‑10 py‑14">
                {/* ——— Posts Grid ——— */}
                <section className="lg:col‑span‑8 space‑y‑10">
                    <div
                        className="grid gap‑8 sm:grid‑cols‑2 lg:grid‑cols‑3 xl:grid‑cols‑3"
                    >
                        {paginated.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>

                    {/* Pagination */}
                    {pageCount > 1 && (
                        <Pagination className="justify‑center">
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                                        className={
                                            page === 1 ? "pointer‑events‑none opacity‑40" : ""
                                        }
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
                                            page === pageCount ? "pointer‑events‑none opacity‑40" : ""
                                        }
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    )}
                </section>

                {/* ——— Sidebar ——— */}
                <aside className="lg:col‑span‑4 space‑y‑8 order‑first lg:order‑none">
                    {/* Categories */}
                    <Card className="rounded‑2xl">
                        <CardHeader>
                            <CardTitle>Kategori</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex‑wrap gap‑3">
                            {categories.map((cat) => (
                                <Badge key={cat} variant="outline" className="cursor‑pointer">
                                    {cat}
                                </Badge>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Recent Posts */}
                    <Card className="rounded‑2xl">
                        <CardHeader>
                            <CardTitle>Artikel Terbaru</CardTitle>
                        </CardHeader>
                        <CardContent className="space‑y‑4">
                            {posts.slice(0, 4).map((post) => (
                                <div key={post.id} className="flex gap‑3 items‑start">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="h‑16 w‑24 object‑cover rounded‑md"
                                    />
                                    <div>
                                        <h4 className="font‑medium line‑clamp‑2 text‑sm hover:text‑primary transition‑colors">
                                            {post.title}
                                        </h4>
                                        <time className="text‑xs text‑muted‑foreground">
                                            {post.date}
                                        </time>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </aside>
            </main>

            {/* —————————————————— Footer —————————————————— */}
            <footer className="border‑t bg‑background/70 backdrop‑blur py‑8">
                <div className="container grid sm:grid‑cols‑2 lg:grid‑cols‑3 gap‑6 text‑sm text‑muted‑foreground">
                    <div>
                        <h3 className="font‑semibold mb‑3">About</h3>
                        <p>
                            My‑Blog adalah platform berbagi insight tentang teknologi web &
                            pemrograman.
                        </p>
                    </div>
                    <div>
                        <h3 className="font‑semibold mb‑3">Quick Links</h3>
                        <ul className="space‑y‑2">
                            <li>
                                <a href="#" className="hover:text‑primary">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text‑primary">
                                    Terms & Conditions
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="sm:col‑span‑2 lg:col‑span‑1 lg:text‑right flex lg:block justify‑between items‑center">
            <span>
              © {new Date().getFullYear()} My‑Blog. Dibuat dengan ❤ dan shadcn/ui.
            </span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
