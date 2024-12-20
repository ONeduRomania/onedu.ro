// import React from "react";
// import styles from "../style/ArticlePage.module.css";
// import Image from "next/image";
// import data from "../../data/articole.json";
//
// interface ArticleContent {
//     type: string;
//     value: string;
//     alt?: string;
// }
//
// interface ArticlePageProps {
//     articleId: string;
// }
//
// const ArticlePage: React.FC<ArticlePageProps> = ({ articleId }) => {
//     const article = data.articles.find((article) => article.id === articleId);
//
//     if (!article) {
//         return <div>Articolul nu a fost găsit.</div>;
//     }
//
//     return (
//         <div className={styles.articlePage}>
//             {/* Hero Section */}
//             <section className={styles.heroSection}>
//                 <div className={styles.heroImageWrapper}>
//                     <Image
//                         src={article.image}
//                         alt={article.title}
//                         layout="fill"
//                         objectFit="cover"
//                         className={styles.heroImage}
//                     />
//                 </div>
//                 <div className={styles.heroOverlay}>
//                     <h1 className={styles.heroTitle}>{article.title}</h1>
//                 </div>
//             </section>
//
//             {/* Detalii despre articol */}
//             <div className={styles.detailsWrapper}>
//                 <div className={styles.detailsLeft}>
//                     <span className={styles.badge}>{article.category}</span>
//                     <span className={styles.views}>{article.views} views</span>
//                     <span className={styles.readTime}>{article.readTime} min read</span>
//                 </div>
//                 <div className={styles.detailsRight}>
//                     <span className={styles.author}>Scris de: {article.author}</span>
//                     <span className={styles.date}>Publicat pe: {article.date}</span>
//                 </div>
//             </div>
//
//             {/* Conținutul articolului */}
//             <section className={styles.articleContent}>
//                 {article.content.map((section: ArticleContent, index: number) => {
//                     if (section.type === "text") {
//                         return (
//                             <p key={index} className={styles.textSection}>
//                                 {section.value}
//                             </p>
//                         );
//                     } else if (section.type === "image") {
//                         return (
//                             <div key={index} className={styles.imageSection}>
//                                 <Image
//                                     src={section.value}
//                                     alt={section.alt || "Image"}
//                                     width={800}
//                                     height={400}
//                                     className={styles.image}
//                                 />
//                             </div>
//                         );
//                     } else {
//                         return null;
//                     }
//                 })}
//             </section>
//         </div>
//     );
// };
//
// export default ArticlePage;
