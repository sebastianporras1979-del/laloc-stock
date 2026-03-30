exports.handler = async function(event) {
  const path = event.queryStringParameters?.path || '/products';
  const page = event.queryStringParameters?.page || '1';

  const ACCESS_TOKEN = '906c4e84628d536ba76593d24b6d14514cf33421';
  const USER_ID = '7469880';

  const url = `https://api.tiendanube.com/v1/${USER_ID}${path}?per_page=200&page=${page}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Authentication': `bearer ${ACCESS_TOKEN}`,
        'User-Agent': 'Laloc StockAlert/1.0',
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
