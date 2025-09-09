import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export default async function ProjectPage({ params }: { params: { id: string } }) {
    console.log("Params:", params);
    const filePath = path.join(process.cwd(), "app/proiecte/data", `${params.id}.md`);
    console.log(filePath);

    if (!fs.existsSync(filePath)) {
        return <div className="p-10">Proiectul nu există.</div>;
    }

    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    return (
        <div className="max-w-3xl mx-auto py-10">
            {data.image && (
                <img
                    src={data.image}
                    alt={data.title}
                    className="w-full h-64 object-cover rounded-lg mb-6"
                />
            )}
            <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
            <p className="text-gray-600 mb-4">
                {data.category} • {data.status} • {data.date}
            </p>
            <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
        </div>
    );
}

export async function generateStaticParams() {
    const dirPath = path.join(process.cwd(), "src/app/proiecte/data");
    const files = fs.readdirSync(dirPath);

    return files
        .filter((file) => file.endsWith(".md"))
        .map((file) => ({
            slug: path.basename(file, ".md"),
        }));
}
