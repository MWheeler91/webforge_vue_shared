// import { Delta } from "quill";
// import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
// import DOMPurify from "dompurify";

// // export function converter(raw: string | Delta): string {
// //   try {
// //     const delta = typeof raw === 'string' ? JSON.parse(raw) : raw
// //     const converter = new QuillDeltaToHtmlConverter(delta.ops, {})
// //     const html = converter.convert()
// //     return DOMPurify.sanitize(html)
// //   } catch (err) {
// //     console.warn('Failed to convert Quill content:', err)
// //     return '<p>Error rendering content.</p>'
// //   }
// // }

// export function converter(raw: string): string {
// 	try {
// 		const delta = typeof raw === "string" ? JSON.parse(raw) : raw;

// 		const converter = new QuillDeltaToHtmlConverter(delta.ops, {
// 			inlineStyles: true,
// 			multiLineParagraph: false,

// 			customTag: (op) => {
// 				if (op.attributes?.header === 1) return "h1";
// 				if (op.attributes?.header === 2) return "h2";
// 				if (op.attributes?.header === 3) return "h3";
// 				if (op.attributes?.blockquote) return "blockquote";
// 				if (op.attributes?.code) return "code";
// 				return "";
// 			},

// 			customCssClasses: (op) => {
// 				const classes: string[] = [];

// 				if (op.attributes?.align === "center") classes.push("text-center");
// 				if (op.attributes?.align === "right") classes.push("text-right");
// 				if (op.attributes?.align === "justify") classes.push("text-justify");

// 				if (op.attributes?.bold) classes.push("font-bold");
// 				if (op.attributes?.italic) classes.push("italic");
// 				if (op.attributes?.underline) classes.push("underline");
// 				if (op.attributes?.strike) classes.push("line-through");

// 				if (op.attributes?.list === "bullet") classes.push("list-disc", "pl-6",  "marker:text-text");
// 				if (op.attributes?.list === "ordered") classes.push("list-decimal", "pl-6", "marker:text-text");

// 				return classes.join(" ");
// 			},
// 		});

// 		const html = converter.convert();
// 		return DOMPurify.sanitize(html);
// 	} catch (err) {
// 		console.warn("Failed to convert Quill content:", err);
// 		return "<p>Error rendering content.</p>";
// 	}
// }

// /** Convert "YYYY-MM-DDTHH:MM" from <input type="datetime-local"> to UTC ISO string */
// export function localDTToUtcIso(localDT: string | undefined | null): string | null {
// 	if (!localDT) return null;
// 	// Construct as local time, then output UTC
// 	const d = new Date(localDT); // treated as local time by the browser
// 	return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString();
// }

// /** Optional: back to a display-friendly local string from server UTC */
// export function utcIsoToLocalDT(utcIso: string | null | undefined): string | null {
// 	if (!utcIso) return null;
// 	const d = new Date(utcIso); // this is in UTC
// 	// format back to "YYYY-MM-DDTHH:MM" for datetime-local inputs
// 	const pad = (n: number) => String(n).padStart(2, "0");
// 	const yyyy = d.getFullYear();
// 	const mm = pad(d.getMonth() + 1);
// 	const dd = pad(d.getDate());
// 	const hh = pad(d.getHours());
// 	const mi = pad(d.getMinutes());
// 	return `${yyyy}-${mm}-${dd}T${hh}:${mi}`;
// }
