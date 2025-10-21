import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import Image from "next/image";

type Frontmatter = {
    title?: string;
    image?: string;      // poate fi /public/... sau URL extern
    category?: string;
    status?: string;
    date?: string;
};

const DATA_DIR = path.join(process.cwd(), "src/app/proiecte/data");

export default async function ProjectPage({
                                              params,
                                          }: {
    params: { slug: string };
}) {
    const filePath = path.join(DATA_DIR, `${params.slug}.md`);

    if (!fs.existsSync(filePath)) {
        return <div className="p-10">Proiectul nu există.</div>;
        // alternativ, poți `notFound()` din next/navigation pentru 404 real
    }

    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent) as {
        data: Frontmatter;
        content: string;
    };

    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    return (
        <div className="max-w-3xl mx-auto py-10">
            {data.image && (
                <div className="relative w-full h-64 mb-6">
                    {/* next/image rezolvă warningul no-img-element */}
                    <Image
                        src={data.image}
                        alt={data.title ?? "Proiect"}
                        fill
                        className="object-cover rounded-lg"
                        priority
                        sizes="(max-width: 768px) 100vw, 768px"
                    />
                </div>
            )}

            <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
            <p className="text-gray-600 mb-4">
                {[data.category, data.status, data.date].filter(Boolean).join(" • ")}
            </p>

            <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
        </div>
    );
}

export async function generateStaticParams() {
    const files = fs.readdirSync(DATA_DIR);

    return files
        .filter((file) => file.endsWith(".md"))
        .map((file) => ({
            slug: path.basename(file, ".md"), // <- se potrivește cu [slug]
        }));
}
