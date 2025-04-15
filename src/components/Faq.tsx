import { Accordion,AccordionContent,AccordionItem,AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "./ui/badge";

export default function Faq(){
const faqItems = [
    {
        question: "What does ForgeImage do?",
        answer:
            "ForgeImage is an advanced image authentication tool that analyzes uploaded images to determine if they have been tampered with or manipulated. Using state-of-the-art machine learning models trained in Python, we provide detailed analysis and authenticity scores for your images.",
    },
    {
        question: "How accurate is the image forgery detection?",
        answer:
            "Our system employs multiple advanced ML algorithms to achieve high accuracy rates. However, as with any detection system, accuracy can vary depending on the sophistication of the manipulation. Our tool typically provides 90%+ accuracy for common image manipulations.",
    },
    {
        question: "What types of image manipulations can be detected?",
        answer:
            "Our system can detect various forms of manipulation including: splicing (inserting foreign elements), copy-move forgery, retouching, AI-generated content, filter applications, and various digital alterations. The detection capabilities are continuously improving through model updates.",
    },
    {
        question: "How does the authenticity score work?",
        answer:
            "The authenticity score is a value between 0-100, where higher scores indicate a higher probability that the image is authentic. Scores below 50 suggest potential manipulation, with lower scores indicating stronger evidence of tampering.",
    },
    {
        question: "What is Error Level Analysis (ELA) and how do you use it?",
        answer:
            "Error Level Analysis examines the compression levels across an image. When an image is saved, compression artifacts are uniformly distributed. However, manipulated areas often show different error levels. Our system visualizes these variations to help identify potentially modified regions.",
    },
    {
        question: "What metadata information do you extract and display?",
        answer:
            "We extract comprehensive EXIF data including: camera make and model, date and time taken, GPS location (if available), software used for editing, exposure settings, resolution, and modification history. This metadata can provide crucial clues about an image's authenticity.",
    },
    {
        question: "Is my data safe when I upload images for analysis?",
        answer:
            "Yes, we prioritize your privacy and data security. Images uploaded to our service are processed for analysis only, not stored permanently on our servers, and are not shared with third parties. Analysis results are provided only to you.",
    },
    {
        question: "What image formats are supported?",
        answer:
            "Our system supports common image formats including JPEG, PNG, GIF, BMP, TIFF, and WebP. For best results and most complete metadata analysis, we recommend using original JPEG files directly from cameras.",
    },
    {
        question: "Can the system detect AI-generated images?",
        answer:
            "Yes, our advanced ML models are trained to recognize patterns common in AI-generated images from tools like DALL-E, Midjourney, and Stable Diffusion. However, as AI technology evolves, detection capabilities are also continuously improved through model updates.",
    },
    {
        question: "What if the system can't determine if an image is forged?",
        answer:
            "In some cases, if manipulations are extremely subtle or if the image quality is too low, our system might produce inconclusive results. We always provide confidence metrics with our analysis, so you'll know if the results should be interpreted with caution.",
    },
    {
        question: "Can I use this tool for forensic or legal purposes?",
        answer:
            "While our tool provides valuable insights, it should be considered as supporting evidence rather than definitive proof in legal contexts. For forensic purposes, we recommend consulting with certified digital forensic experts who can perform additional specialized analyses.",
    },
    {
        question: "How does the machine learning model work behind the scenes?",
        answer:
            "Our system employs a multi-layered approach using convolutional neural networks (CNNs), noise analysis algorithms, and feature extraction techniques. The models are trained on vast datasets containing both authentic and manipulated images, enabling them to recognize subtle patterns invisible to the human eye.",
    },
];

return (
    <section id="faqs" className="mx-3 bg-background py-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <Badge variant="outline" className="mb-4">Support</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Frequently Asked Questions
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Find answers to common questions about our image forgery detection service
                </p>
            </div>
            <div className="mx-auto grid max-w-5xl pt-12">
                <Accordion type="single" collapsible className="w-full">
                    {faqItems.map((item, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-left">
                                {item.question}
                            </AccordionTrigger>
                            <AccordionContent>{item.answer}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
    </section>
);
};