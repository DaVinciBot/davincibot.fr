import { unified } from 'unified';
import remarkParse from 'remark-parse';

export async function parseMarkdownToAst(markdown) {
    const processor = unified().use(remarkParse);
    const tree = processor.parse(markdown || '');

    // Transformation to split paragraphs containing images
    const newChildren = [];

    for (const node of tree.children) {
        if (node.type === 'paragraph') {
            let hasImage = false;
            // Check for direct image children
            for (const child of node.children) {
                if (child.type === 'image') {
                    hasImage = true;
                    break;
                }
            }

            if (hasImage) {
                let currentParagraphChildren = [];

                for (const child of node.children) {
                    if (child.type === 'image') {
                        // If we have accumulated text, push it as a paragraph
                        if (currentParagraphChildren.length > 0) {
                            newChildren.push({
                                type: 'paragraph',
                                children: currentParagraphChildren
                            });
                            currentParagraphChildren = [];
                        }
                        // Push the image as a top-level node
                        newChildren.push(child);
                    } else {
                        currentParagraphChildren.push(child);
                    }
                }

                // Push remaining text
                if (currentParagraphChildren.length > 0) {
                    newChildren.push({
                        type: 'paragraph',
                        children: currentParagraphChildren
                    });
                }
            } else {
                newChildren.push(node);
            }
        } else {
            newChildren.push(node);
        }
    }

    tree.children = newChildren;

    return tree;
}
