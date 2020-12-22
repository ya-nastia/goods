import { createWorker } from 'tesseract.js';
export async function phoToDig(file) {
    // console.log(new Date())
    try {
        const worker = createWorker({});
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        const { data: { text } } = await worker.recognize(file);
        // console.log(text);
        await worker.terminate();
        // console.log(new Date())
        return text

    } catch (error) {
        throw error
    }
}