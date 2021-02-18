import getDocs from './_docs.js';

export async function get(req, res) {
  const docs = await getDocs({
    lang: req.query.lang,
    version: req.query.version,
  });

  if (docs) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(docs));
  } else {
    res.writeHead(404, {
      'Content-Type': 'application/json',
    });

    res.end(
      JSON.stringify({
        message: 'Not found',
      })
    );
  }
}
