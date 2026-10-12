export interface TextRun {
  text: string;
  strong?: boolean;
  tone?: 'accent' | 'ink' | 'body';
  href?: string;
  variant?: 'subtitle';
}
export interface TextBlock {
  type: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'ul' | 'ol';
  runs?: TextRun[];
  items?: TextRun[][];
}
export interface Image {
  src: string;
  alt: string;
  variants: Record<string, string>;
}
export interface Video {
  src: string;
  title: string;
}
export interface Feature {
  heading: TextBlock[];
  image: Image;
  body: TextBlock[];
}
export interface Section {
  image?: Image;
  video?: Video;
  body: TextBlock[];
}
export interface ContactForm {
  heading: string;
  labels: string[];
  options: string[];
  placeholder: string;
  submitLabel: string;
  endpoint: string;
  fallbackEmail: string;
}
interface BasePage {
  slug: string;
  path: string;
  seo: { title: string; description: string | null; canonical: string };
  heading: string;
}
export type Page = BasePage &
  (
    | {
        type: 'home';
        intro: TextBlock[];
        video: Video;
        tagline: TextBlock[];
        consultation: { label: string; href: string };
        contactPrompt: TextBlock[];
        background: Image;
        features: Feature[];
      }
    | { type: 'benefits'; features: Feature[] }
    | { type: 'service' | 'software' | 'streamlining'; sections: Section[] }
    | { type: 'about'; intro: TextBlock[]; biography: TextBlock[]; image: Image }
    | {
        type: 'contact';
        socialImages: Image[];
        form: ContactForm;
        phone: string;
        postalAddress: string;
        callLabel: string;
        callUrl: string;
      }
  );
