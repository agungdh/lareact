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
import {
    Avatar,
    AvatarImage,
    AvatarFallback,
} from "@/components/ui/avatar";
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
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Menu, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

// ---------------------------------------------------------------------------
// Dummy data – replace with fetch() / CMS integration
const posts = [
    {
        id: 1,
        title: "Memulai dengan shadcn/ui",
        excerpt:
            "Pelajari bagaimana memanfaatkan komponen shadcn/ui untuk membangun antarmuka modern dengan cepat.",
        author: "Agung Dharma",
        date: "2025‑05‑01",
        image: "https://source.unsplash.com/random/1600x900?ui",
        category: "Frontend",
    },
    {
        id: 2,
        title: "Mengenal Tailwind CSS v4",
        excerpt:
            "Tailwind CSS v4 hadir dengan fitur baru yang membuat proses styling semakin menyenangkan.",
        author: "Rahmat Hidayat",
        date: "2025‑05‑10",
        image: "https://source.unsplash.com/random/1600x900?tailwind",
        category: "CSS",
    },
    {
        id: 3,
        title: "Tips Optimasi React untuk Performa",
        excerpt:
            "Kiat‑kiat praktis untuk meningkatkan performa aplikasi React Anda.",
        author: "Dewi Saraswati",
        date: "2025‑05‑15",
        image: "https://source.unsplash.com/random/1600x900?react",
        category: "React",
    },
    {
        id: 4,
        title: "Membangun Blog dengan Next.js 15",
        excerpt:
            "Panduan lengkap membuat blog powerful menggunakan Next.js versi terbaru.",
        author: "Andi Wijaya",
        date: "2025‑05‑22",
        image: "https://source.unsplash.com/random/1600x900?nextjs",
        category: "Full‑Stack",
    },
    {
        id: 5,
        title: "State Management Modern: Jotai vs Zustand",
        excerpt:
            "Mana yang lebih cocok untuk proyek Anda? Mari kita bandingkan dua library populer ini.",
        author: "Sinta Lestari",
        date: "2025‑05‑28",
        image: "https://source.unsplash.com/random/1600x900?state",
        category: "React",
    },
    {
        id: 6,
        title: "Deploy Cepat ke Vercel dengan GitHub Actions",
        excerpt:
            "Automasi CI/CD ke Vercel tanpa repot menggunakan GitHub Actions.",
        author: "Budi Santoso",
        date: "2025‑06‑05",
        image: "https://source.unsplash.com/random/1600x900?vercel",
        category: "DevOps",
    },
];

const categories = ["Frontend", "CSS", "React", "Full‑Stack", "DevOps"];
// ---------------------------------------------------------------------------
function FeaturedPost({ post }) {
    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
            className="relative isolate mb-16"
        >
            <AspectRatio ratio={16 / 7} className="overflow-hidden rounded-3xl">
                <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover object-center scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/60 to-background/30" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                    <Badge className="mb-4" variant="secondary">
                        {post.category}
                    </Badge>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight max-w-2xl drop-shadow-lg">
                        {post.title}
                    </h1>
                    <p className="mt-4 text-lg md:text-xl max-w-3xl text-muted-foreground">
                        {post.excerpt}
                    </p>
                    <Button size="lg" className="mt-8">
                        Baca Selengkapnya
                    </Button>
                </div>
            </AspectRatio>
        </motion.section>
    );
}

function PostCard({ post, large = false }) {
    return (
        <Card
            key={post.id}
            className={`overflow-hidden group rounded-2xl shadow-md transition hover:shadow-xl bg-background/90 backdrop-blur-sm ${large ? "lg:col-span-2" : ""}`}
        >
            <motion.div
                initial={{ scale: 1, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                className="overflow-hidden"
            >
                <AspectRatio ratio={16 / 9}>
                    <img
                        src={post.image}
                        alt={post.title}
                        className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                    />
                </AspectRatio>
            </motion.div>

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
    );
}

export default function BlogPage() {
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);
    const pageSize = 5; // sedikit lebih kecil agar grid tampak rapi

    const filtered = posts.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase())
    );
    const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);
    const pageCount = Math.ceil(filtered.length / pageSize);

    const featured = filtered[0];
    const restPosts = paginated.filter((p) => p.id !== featured.id);

    return (
        <div className="min-h-screen flex flex-col bg-muted/40 font-sans">
            {/* —————————————————— Header / Navbar —————————————————— */}
            <header className="sticky top-0 z-50 w-full border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 items-center justify-between">
                    {/* Mobile menu */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="lg:hidden">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="pr-0">
                            <nav className="p-6 space-y-4">
                                {[
                                    { href: "#", label: "Home" },
                                    { href: "#", label: "About" },
                                    { href: "#", label: "Contact" },
                                ].map((link) => (
                                    <SheetClose asChild key={link.label}>
                                        <a
                                            href={link.href}
                                            className="block text-lg font-medium hover:text-primary"
                                        >
                                            {link.label}
                                        </a>
                                    </SheetClose>
                                ))}
                            </nav>
                        </SheetContent>
                    </Sheet>

                    {/* Logo */}
                    <a href="#" className="font-bold text-2xl tracking-tight">
                        My‑Blog
                    </a>

                    {/* Desktop nav */}
                    <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
                        <a href="#" className="hover:text-primary transition-colors">
                            Home
                        </a>
                        <a href="#" className="hover:text-primary transition-colors">
                            About
                        </a>
                        <a href="#" className="hover:text-primary transition-colors">
                            Contact
                        </a>
                    </nav>
                </div>
            </header>

            {/* —————————————————— Featured Post / Hero —————————————————— */}
            {featured && <FeaturedPost post={featured} />}

            {/* —————————————————— Main Content —————————————————— */}
            <main className="container flex-1 grid grid-cols-1 lg:grid-cols-12 gap-10 pb-14">
                {/* ——— Posts Grid ——— */}
                <section className="lg:col-span-8 space-y-10">
                    <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-2 auto-rows-fr">
                        {restPosts.map((post, idx) => (
                            <PostCard key={post.id} post={post} large={idx === 0} />
                        ))}
                    </div>

                    {/* Pagination */}
                    {pageCount > 1 && (
                        <Pagination className="justify-center">
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                                        className={page === 1 ? "pointer-events-none opacity-40" : ""}
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
                                            page === pageCount ? "pointer-events-none opacity-40" : ""
                                        }
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    )}
                </section>

                {/* ——— Sidebar ——— */}
                <aside className="lg:col-span-4 space-y-8 order-first lg:order-none">
                    {/* Search */}
                    <Card className="rounded-2xl">
                        <CardHeader>
                            <CardTitle>Pencarian</CardTitle>
                        </CardHeader>
                        <CardContent className="relative">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Cari artikel ..."
                                className="pl-10"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </CardContent>
                    </Card>

                    {/* Categories */}
                    <Card className="rounded-2xl">
                        <CardHeader>
                            <CardTitle>Kategori</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-wrap gap-3">
                            {categories.map((cat) => (
                                <Badge key={cat} variant="outline" className="cursor-pointer hover:bg-primary/10">
                                    {cat}
                                </Badge>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Recent Posts */}
                    <Card className="rounded-2xl">
                        <CardHeader>
                            <CardTitle>Artikel Terbaru</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {posts.slice(0, 4).map((post) => (
                                <div key={post.id} className="flex gap-3 items-start">
                                    <AspectRatio ratio={4 / 3} className="w-28 overflow-hidden rounded-md">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="h-full w-full object-cover"
                                        />
                                    </AspectRatio>
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

            {/* —————————————————— Footer —————————————————— */}
            <footer className="border-t bg-background/70 backdrop-blur py-8">
                <div className="container grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm text-muted-foreground">
                    <div className="space-y-3">
                        <h3 className="font-semibold">About</h3>
                        <p>
                            My‑Blog adalah platform berbagi insight tentang teknologi web & pemrograman.
                        </p>
                    </div>
                    <div className="space-y-3">
                        <h3 className="font-semibold">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="hover:text-primary">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-primary">
                                    Terms & Conditions
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="sm:col-span-2 lg:col-span-1 lg:text-right flex lg:block justify-between items-center">
                        <span>© {new Date().getFullYear()} My‑Blog. Dibuat dengan ❤ dan shadcn/ui.</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
