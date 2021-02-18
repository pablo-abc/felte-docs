import fm from 'front-matter';
import path from 'path';
import fs from 'fs/promises';

function idfy(value) {
  return value.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-');
}

async function readMd(filePath) {
  const file = await fs.readFile(filePath, { encoding: 'utf8' });
  const data = fm(file);
  const id = idfy(data.attributes.section);
  data.attributes.id = id;
  data.attributes.subsections = data.attributes.subsections?.map(
    (subsection) => ({ id: idfy(subsection), name: subsection })
  );
  return data;
}

export default async function getDocs({ lang = 'en', version = 'latest' }) {
  try {
    const getFilePath = (fileName) =>
      path.resolve(`./markdown/docs/${lang}/${version}/${fileName}.md`);

    const gettingStarted = await readMd(getFilePath('getting-started'));
    const validation = await readMd(getFilePath('validation'));

    return [gettingStarted, validation];
  } catch {
    return;
  }
}
