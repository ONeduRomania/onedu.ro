import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import Image from "next/image";
import Link from "next/link";
import { Navbar, Footer } from "@/components";
import { notFound } from "next/navigation";

type Frontmatter = {
    title?: string;
    image?: string;
    category?: string;
    status?: string;
    date?: string;
};

const DATA_DIR = path.join(process.cwd(), "src/app/proiecte/data");

const getImageUrl = (img: string | undefined) => {
    if (!img) return null;
    if (img.startsWith("http")) return img;
    return img.startsWith("/") ? img : `/${img}`;
};

export default async function ProjectPage({
    params,
}: {
    params: { slug: string };
}) {
    const { slug } = params;
    const filePath = path.join(DATA_DIR, `${slug}.md`);

    if (!fs.existsSync(filePath)) {
        notFound();
    }

    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent) as {
        data: Frontmatter;
        content: string;
    };

    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();
    const imageUrl = getImageUrl(data.image);

    return (
        <>
            <Navbar />
            <article className="min-h-screen bg-gray-50">
                {/* Hero image */}
                {imageUrl && (
                    <div className="relative w-full aspect-[3/1] max-h-[280px] overflow-hidden">
                        <Image
                            src={imageUrl}
                            alt={data.title ?? "Proiect"}
                            fill
                            className="object-cover"
                            priority
                            sizes="100vw"
                        />
                        </div>
                )}

                {/* Content card */}
                <div className={`max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 ${imageUrl ? "-mt-6 sm:-mt-10" : "pt-12"} relative z-10 pb-16`}>
                    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 lg:p-14">
                        <Link
                            href="/proiecte"
                            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-custom-blue mb-6 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Înapoi la Proiecte
                        </Link>

                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            {data.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6 pb-6 border-b border-gray-100">
                            {data.category && <span>{data.category}</span>}
                            {data.status && (
                                <>
                                    <span className="text-gray-300">•</span>
                                    <span className="bg-custom-blue/10 text-custom-blue px-3 py-1 rounded-lg font-medium">
                                        {data.status}
                                    </span>
                                </>
                            )}
                            {data.date && (
                                <>
                                    <span className="text-gray-300">•</span>
                                    <time>{data.date}</time>
                                </>
                            )}
                        </div>

                        <div
                            className="prose prose-lg prose-gray max-w-none prose-headings:font-bold prose-headings:mt-10 prose-headings:mb-4 prose-p:leading-relaxed prose-p:mb-6 prose-a:text-custom-blue prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:my-8 prose-ul:my-6 prose-li:my-1"
                            dangerouslySetInnerHTML={{ __html: contentHtml }}
                        />
                    </div>
                </div>
            </article>
            <Footer />
        </>
    );
}

export async function generateStaticParams() {
    const files = fs.readdirSync(DATA_DIR);

    return files
        .filter((file) => file.endsWith(".md"))
        .map((file) => ({
            slug: path.basename(file, ".md"),
        }));
}
